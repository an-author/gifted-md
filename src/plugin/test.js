import ytdl from 'ytdl-core';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Use a global variable to store the download URLs and index
const downloadMap = new Map();
let downloadIndex = 1; // Global index for download URLs

const searchVideo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'ytdl' && text) {
    try {
      await m.React("🕘");

      // Fetch video info from YouTube
      const info = await ytdl.getInfo(text);

      if (!info) {
        m.reply('Video not found.');
        await m.React("❌");
        return;
      }

      const qualities = ['144p', '240p', '360p', '480p', '720p', '1080p'];

      const videoButtons = qualities.map((quality, index) => {
        const uniqueId = `download_${downloadIndex + index}`;
        const downloadUrl = ytdl.chooseFormat(info.formats, { quality: quality }).url;
        downloadMap.set(uniqueId, downloadUrl);
        return {
          "header": "",
          "title": `${quality} - ${info.videoDetails.title}`,
          "description": `Size: ${info.videoDetails.lengthSeconds}`,
          "id": uniqueId
        };
      });

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.create({
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🔖 Select video quality",
                      sections: [
                        {
                          title: "😎 Video Qualities",
                          highlight_label: "🤩 Choose one",
                          rows: videoButtons
                        },
                      ]
                    })
                  }
                ],
              }),
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });
      await m.React("✅");

      // Increment the global download index for the next set of downloads
      downloadIndex += qualities.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else {
    // Handle other commands or messages
  }
};

const handleUserSelection = async (m, Matrix, selectedId) => {
  const downloadUrl = downloadMap.get(selectedId);

  if (downloadUrl) {
    try {
      await Matrix.sendMessage(m.from, { video: { url: downloadUrl }, mimetype: 'video/mp4' }, { quoted: m });
    } catch (error) {
      console.error("Error sending video:", error);
      m.reply('Error sending video.');
    }
  } else {
    // Handle if selectedId doesn't exist
  }
};

const processSelection = async (m, Matrix) => {
  const selectedId = m.message?.selectedButtonId;

  if (selectedId) {
    await handleUserSelection(m, Matrix, selectedId);
  }
};

export default searchVideo;
