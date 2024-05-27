import yts from 'yt-search';
import ytdl from 'ytdl-core';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const song = async (m, Matrix) => {
  const text = m.body.trim();
  
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const query = m.body.slice(prefix.length + cmd.length).trim();

  const selectedId = cmd === 'quality' ? query : null;

  try {
    if (cmd === 'play' && !selectedId) {
      const searchResult = await yts(query);
      const video = searchResult.videos[0];

      if (!video) {
        await m.reply('No video found.');
        return;
      }

      const videoFormats = await ytdl.getInfo(video.videoId);
      const availableQualities = videoFormats.formats.map(format => format.qualityLabel);
      
      const qualityButtons = availableQualities.map((quality, index) => {
        return {
          "header": "",
          "title": quality,
          "description": ``,
          "id": `quality_${index}` // Unique key format for quality buttons
        };
      });

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Select video quality:\n\n`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "*© Powered By Ethix-MD©"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: ``,
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "Quality Selection",
                      sections: [
                        {
                          title: "Available Qualities",
                          highlight_label: "Select",
                          rows: qualityButtons
                        },
                      ]
                    })
                  }
                ],
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });

    } else if (cmd === 'quality' && selectedId) {
      const videoFormats = await ytdl.getInfo(query);
      const selectedFormat = videoFormats.formats.find(format => format.qualityLabel === selectedId);

      if (!selectedFormat) {
        await m.reply('Selected quality not available.');
        return;
      }

      const videoStream = ytdl(query, { quality: selectedFormat.itag });
      const finalVideoBuffer = await streamToBuffer(videoStream);

      // Send the video
      await Matrix.sendMessage(m.from, { video: finalVideoBuffer, mimetype: 'video/mp4', caption: `Downloaded video with quality: ${selectedId}` }, { quoted: m });
    }

  } catch (error) {
    console.error("Error processing your request:", error);
  }
};

const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};

export default song;
