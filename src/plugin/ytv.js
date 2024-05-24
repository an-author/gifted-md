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

        const info = await ytdl.getInfo(text);
        const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

        const { videoDetails } = info;
        const { tittle, author, lengthSeconds, publishDate, viewCount, thumbnails } = videoDetails;
        const thumbnailUrl = thumbnails[thumbnails.length - 1].url;

        const media = await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer });

        const buttons = formats.map((format, index) => ({
          "header": "",
          "title": `Quality: ${format.qualityLabel}, Type: ${format.container}`,
          "description": "",
          "id": `download ${format.url}` // Command to trigger download
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
                  text: `Ethix-MD Video Downloader\n\n🔍 **${tittle}**\n👤 Author: ${author.name}\n📅 Upload Date: ${publishDate}\n👁️ Views: ${viewCount}\n⏳ Duration: ${Math.floor(lengthSeconds / 60)}:${lengthSeconds % 60}\n\n🎵 Download audio or video with a single click.\n📌 Simply select a video from the list below to get started.`
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
      const url = selectedId.split(' ')[1];
      if (!url) {
        await m.React("❌");
        return m.reply('Invalid download URL.');
      }

      try {
        await m.React("🕘");

        const res = await fetch(url);
        if (!res.ok) {
          await m.React("❌");
          throw `Failed to fetch video. Status: ${res.status} ${res.statusText}`;
        }

        const contentLength = parseInt(res.headers.get('content-length'), 10);
        if (contentLength > 100 * 1024 * 1024) {
          await m.React("❌");
          throw `Content-Length exceeds the limit: ${contentLength}`;
        }

        if (!/video\//.test(res.headers.get('content-type'))) {
          await m.React("❌");
          throw 'The URL does not point to a video.';
        }

        const videoBuffer = Buffer.from(await res.arrayBuffer());

        await Matrix.sendMessage(m.from, { video: videoBuffer, mimetype: 'video/mp4', caption: '> © Powered by Ethix-MD' });
        await m.React("✅");
      } catch (error) {
        console.error("Error processing download command:", error);
        await m.React("❌");
        m.reply('An error occurred while processing your request.');
      }
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    await m.React("❌");
    m.reply('An unexpected error occurred.');
  }
};

export default videoInfo;
