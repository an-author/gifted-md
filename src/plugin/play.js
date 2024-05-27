import ytdl from 'ytdl-core';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Global variable to store video quality options and index
const videoMap = new Map();
let videoIndex = 1;

const play = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
    }
  }

  const selectedId = selectedListId || selectedButtonId;
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'yt') {
    if (!text) return m.reply('Please provide a YouTube link');

    try {
      await m.React("🕘");

      const videoUrl = text;
      if (!ytdl.validateURL(videoUrl)) {
        m.reply('Invalid YouTube URL');
        await m.React("❌");
        return;
      }

      const videoInfo = await ytdl.getInfo(videoUrl);
      const videoDetails = videoInfo.videoDetails;
      const videoFormats = ytdl.filterFormats(videoInfo.formats, 'videoandaudio');

      // Remove duplicate quality options
      const uniqueFormats = Array.from(new Map(videoFormats.map(format => [format.qualityLabel, format])).values());

      const qualityButtons = uniqueFormats.map((format, index) => {
        const uniqueId = `qvideo_${videoIndex + index}`;
        videoMap.set(uniqueId, {
          url: videoUrl,
          format: format
        });
        return {
          title: `${format.qualityLabel} (${format.container})`,
          description: `size: ${format.size}`,
          id: uniqueId
        };
      });

      const title = videoDetails.title;
      const author = videoDetails.author.name;
      const publishDate = new Date(videoDetails.uploadDate).toDateString();
      const viewCount = videoDetails.viewCount;
      const lengthSeconds = videoDetails.lengthSeconds;

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Ethix-MD Video Downloader\n\n🔍 *${title}*\n👤 Author: ${author}\n📅 Upload Date: ${publishDate}\n👁️ Views: ${viewCount}\n⏳ Duration: ${Math.floor(lengthSeconds / 60)}:${lengthSeconds % 60}\n\n🎵 Download audio or video with a single click.\n📌 Simply select a video from the list below to get started.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> © Powered By Ethix-MD"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: videoDetails.thumbnails[0].url } }, { upload: Matrix.waUploadToServer })),
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
                      title: "🔖 Select Video Quality",
                      sections: [
                        {
                          title: "📽️ Available Qualities",
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

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
      await m.React("✅");

      // Increment the global video index for the next set of video formats
      videoIndex += uniqueFormats.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { // Handle selected video quality
    const selectedVideo = videoMap.get(selectedId);

    if (selectedVideo) {
      try {
        const videoStream = ytdl(selectedVideo.url, { format: selectedVideo.format });
        const videoBuffer = await new Promise((resolve, reject) => {
          const chunks = [];
          videoStream.on('data', chunk => chunks.push(chunk));
          videoStream.on('end', () => resolve(Buffer.concat(chunks)));
          videoStream.on('error', reject);
        });

        const caption = `Title: ${videoDetails.title}\nAuthor: ${videoDetails.author.name}\nDuration: ${Math.floor(videoDetails.lengthSeconds / 60)}:${videoDetails.lengthSeconds % 60}\nQuality: ${selectedVideo.format.qualityLabel}\nViews: ${videoDetails.viewCount}\nSize: ${(selectedVideo.format.contentLength / (1024 * 1024)).toFixed(2)} MB\n\n> Powered by Ethix-MD`;

        const maxSizeMB = 300;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (videoBuffer.length <= maxSizeBytes) {
          // Send as video if size is within limit
          await Matrix.sendMessage(m.from, { video: videoBuffer, mimetype: 'video/mp4', caption: caption }, { quoted: m });
        } else {
          await Matrix.sendMessage(m.from, { document: videoBuffer, mimetype: 'video/mp4', fileName: `${videoDetails.title}.mp4`, caption: caption }, { quoted: m });
        }
      } catch (error) {
        console.error("Error sending video:", error);
        m.reply('Error sending video.');
      }
    }
  }
};

export default play;
