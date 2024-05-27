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
      await Matrix.sendMessage(m.from, { text: "🕘 Searching for video..." }, { quoted: m });

      const videoUrl = text;
      if (!ytdl.validateURL(videoUrl)) {
        m.reply('Invalid YouTube URL');
        await Matrix.sendMessage(m.from, { text: "❌ Invalid YouTube URL" }, { quoted: m });
        return;
      }

      const videoInfo = await ytdl.getInfo(videoUrl);
      const videoFormats = ytdl.filterFormats(videoInfo.formats, 'videoandaudio');

      if (videoFormats.length === 0) {
        m.reply('No video formats found.');
        await Matrix.sendMessage(m.from, { text: "❌ No video formats found" }, { quoted: m });
        return;
      }


      const uniqueFormats = {};
      videoFormats.forEach(format => {
        if (!uniqueFormats[format.qualityLabel] || (uniqueFormats[format.qualityLabel].container !== 'mp4' && format.container === 'mp4')) {
          uniqueFormats[format.qualityLabel] = format;
        }
      });

      const qualityButtons = Object.values(uniqueFormats).map((format, index) => {
        const uniqueId = `dlvideo_${videoIndex + index}`;
        videoMap.set(uniqueId, {
          url: videoUrl,
          format: format
        });
        return {
          title: `${format.qualityLabel} (${format.container})`,
          description: `Size: ${format.size}`,
          id: uniqueId
        };
      });

      const videoDetails = videoInfo.videoDetails;
      const title = videoDetails.title;
      const author = videoDetails.author.name;
      const publishDate = new Date(videoDetails.publishDate).toLocaleDateString();
      const viewCount = videoDetails.viewCount;
      const lengthSeconds = videoDetails.lengthSeconds;
      const thumbnailUrl = thumbnails[thumbnails.length - 1].url;

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Ethix-MD YouTube Downloader\n\n🔍 *${title}*\n👤 Author: ${author}\n📅 Upload Date: ${publishDate}\n👁️ Views: ${viewCount}\n⏳ Duration: ${Math.floor(lengthSeconds / 60)}:${lengthSeconds % 60}\n\n🎵 Select the quality of the video you want to download.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> © Powered By Ethix-MD"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
                title: videoInfo.videoDetails.title,
                gifPlayback: true
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
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363222395675670@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
      
      videoIndex += videoFormats.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await Matrix.sendMessage(m.from, { text: "❌ Error processing your request" }, { quoted: m });
    }
  } else if (selectedId) { 
    const selectedVideo = videoMap.get(selectedId);

    if (selectedVideo) {
      try {
        const videoStream = ytdl(selectedVideo.url, { format: selectedVideo.format });
        const videoBuffer = await streamToBuffer(videoStream);

        const videoInfo = await ytdl.getInfo(selectedVideo.url);
        const videoDetails = videoInfo.videoDetails;
        const format = selectedVideo.format;

        const title = videoDetails.title;
        const author = videoDetails.author.name;
        const duration = new Date(videoDetails.lengthSeconds * 1000).toISOString().substr(11, 8);

        const caption = `Title: ${title}\nAuthor: ${author}\nDuration: ${duration}\nQuality: ${format.qualityLabel}\nViews: ${videoDetails.viewCount}\nSize: ${(format.contentLength / (1024 * 1024)).toFixed(2)} MB\n\n> Powered by Ethix-MD`;

        const maxSizeMB = 300;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (videoBuffer.length <= maxSizeBytes) {

          await Matrix.sendMessage(m.from, { video: videoBuffer, mimetype: 'video/mp4', caption: caption }, { quoted: m });
        } else {
          await Matrix.sendMessage(m.from, { document: videoBuffer, mimetype: 'video/mp4', fileName: `${title}.mp4`, caption: caption }, { quoted: m });
        }
      } catch (error) {
        console.error("Error sending video:", error);
      }
    }
  }
};

const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};

export default play;
