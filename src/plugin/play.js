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

  if (cmd === 'ytv') {
    if (!text) return m.reply('Please provide a YouTube link');

    try {
      await Matrix.sendMessage(m.from, { text: "🕘 Searching for video..." }, { quoted: m });

      const videoUrl = text;
      if (!ytdl.validateURL(videoUrl)) {
        m.reply('Invalid YouTube URL');
        return;
      }

      const videoInfo = await ytdl.getInfo(videoUrl);
      const videoFormats = ytdl.filterFormats(videoInfo.formats, 'videoandaudio').filter(format => format.container === 'mp4');

      if (videoFormats.length === 0) {
        return;
      }

      const qualityButtons = videoFormats.map((format, index) => {
        const uniqueId = `video_${videoIndex + index}`;
        videoMap.set(uniqueId, {
          url: videoUrl,
          format: format
        });
        return {
          title: `${format.qualityLabel} (${format.container})`,
          description: `Size: ${(format.contentLength / (1024 * 1024)).toFixed(2)} MB`,
          id: uniqueId
        };
      });

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Ethix-MD YouTube Downloader\n\n🎥 Select the quality of the video you want to download.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> © Powered By Ethix-MD"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: videoInfo.videoDetails.thumbnails[0].url } }, { upload: Matrix.waUploadToServer })),
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
    }
  } else if (selectedId) { // Handle selected video quality
    const selectedVideo = videoMap.get(selectedId);

    if (selectedVideo) {
      try {
        const videoStream = ytdl(selectedVideo.url, { format: selectedVideo.format });
        const videoInfo = await ytdl.getInfo(selectedVideo.url);
        const videoDetails = videoInfo.videoDetails;
        const format = selectedVideo.format;
        
        const videoMessage = {
          document: { stream: videoStream, filename: `${videoDetails.title}.mp4` },
          mimetype: 'video/mp4',
          fileName: `${videoDetails.title}.mp4`
        };

        const caption = `Title: ${videoDetails.title}\nAuthor: ${videoDetails.author.name}\nQuality: ${format.qualityLabel}\nViews: ${videoDetails.viewCount}\nSize: ${(format.contentLength / (1024 * 1024)).toFixed(2)} MB`;

        await Matrix.sendMessage(m.from,  videoMessage, caption: caption, { quoted: m });
      } catch (error) {
        console.error("Error sending video:", error);
      }
    }
  }
};

export default play;
