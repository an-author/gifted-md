import ytdl from 'ytdl-core';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const videoInfo = async (m, Matrix) => {
  try {
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
      if (!text) return m.reply('Please provide a YouTube URL.');

      try {
        await m.React("🕘");

        const isUrl = ytdl.validateURL(text);
        if (!isUrl) {
          await m.React("❌");
          return m.reply('Please provide a valid YouTube URL.');
        }

        const info = await ytdl.getInfo(text, {
          quality: 'highestvideo', // Fetch highest available quality
          lang: 'en', // Language preference
          requestOptions: {
            headers: {
              referer: 'https://www.youtube.com/', // Referer header for YouTube
              'accept-language': 'en-US,en;q=0.9', // Accept-Language header
            },
          },
        });
        const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

        const { videoDetails } = info;
        const { title, author, lengthSeconds, publishDate, viewCount, thumbnails, size } = videoDetails;
        const thumbnailUrl = thumbnails[thumbnails.length - 1].url;

        const media = await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer });

        const qualityOptions = ['144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p'];
        const buttons = qualityOptions.map(quality => ({
          header: "",
          title: `Quality: ${quality}`,
          description: `${size}`,
          id: `ydownload_${quality}` // Command to trigger download
        }));

        const messageContent = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `Ethix-MD Video Downloader\n\n🔍 *${title}*\n👤 Author: ${author.name}\n📅 Upload Date: ${publishDate}\n👁️ Views: ${viewCount}\n⏳ Duration: ${Math.floor(lengthSeconds / 60)}:${lengthSeconds % 60}\n\n🎵 Download audio or video with a single click.\n📌 Simply select a video from the list below to get started.`
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: "© Powered By Ethix-MD"
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
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
                        title: "🔖 Select Your Video Quality",
                        sections: [
                          {
                            title: "😎 All Available Video Quality",
                            highlight_label: "🤩 Ethix-MD",
                            rows: buttons
                          }
                        ]
                      })
                    },
                  ],
                }),
              }),
            },
          },
        };

        const msg = generateWAMessageFromContent(m.from, messageContent, {});

        await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
          messageId: msg.key.id
        });
        await m.React("✅");
      } catch (error) {
        console.error("Error fetching video info:", error);
        await m.React("❌");
        m.reply('An error occurred while fetching video info.');
      }
    }

    if (selectedId && selectedId.startsWith('download')) {
      const selectedQuality = selectedId.split(' ')[1];
      if (!selectedQuality || !qualityOptions.includes(selectedQuality)) {
        await m.React("❌");
        return m.reply('Invalid quality selection.');
      }

      const selectedFormat = formats.find(format => format.qualityLabel.toLowerCase() === selectedQuality);
      if (!selectedFormat) {
        await m.React("❌");
        return m.reply(`Quality ${selectedQuality} not found.`);
      }

      try {
        await m.React("🕘");

        const videoStream = ytdl(selectedId, { format: selectedFormat });
        const videoBuffer = await streamToBuffer(videoStream);

        const caption = `Quality: ${selectedFormat.qualityLabel}\nType: ${selectedFormat.container}\n\n> © Powered by Ethix-MD`;

        const maxSizeMB = 300;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (videoBuffer.length <= maxSizeBytes) {
          // Send as video if size is within limit
          await Matrix.sendMessage(m.from, { video: videoBuffer, mimetype: 'video/mp4', caption: caption });
        } else {
          // Send as document if size exceeds the limit
          await Matrix.sendMessage(m.from, { document: videoBuffer, mimetype: 'video/mp4', fileName: `${title}.mp4`, caption: caption });
        }

        await m.React("✅");
      } catch (error) {
        console.error("Error processing download command:", error);
        await m.React("❌");
      }
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    await m.React("❌");
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

export default videoInfo;
