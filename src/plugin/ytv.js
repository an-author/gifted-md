import ytdl from 'ytdl-core';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const videoMap = new Map();
let videoIndex = 1; 

const song = async (m, Matrix) => {
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
  
  const validCommands = ['ytv'];

  if (validCommands.includes(cmd)) {
    if (!text || !ytdl.validateURL(text)) {
      return m.reply('Please provide a valid YouTube URL.');
    }

    try {
      await m.React("🕘");


      const info = await ytdl.getInfo(text);
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

      if (formats.length === 0) {
        m.reply('No downloadable formats found.');
        await m.React("❌");
        return;
      }

      const videoDetails = {
        title: info.videoDetails.title,
        author: info.videoDetails.author.name,
        views: info.videoDetails.viewCount,
        likes: info.videoDetails.likes,
        uploadDate: formatDate(info.videoDetails.uploadDate),
        duration: formatDuration(info.videoDetails.lengthSeconds)
      };

      const qualityButtons = await Promise.all(formats.map(async (format, index) => {
        const uniqueId = videoIndex + index;
        const size = format.contentLength ? formatSize(format.contentLength) : 'Unknown size';
        videoMap.set(uniqueId, { ...format, videoId: info.videoDetails.videoId, ...videoDetails, size });
        return {
          "header": "",
          "title": `${format.qualityLabel} (${format.container}) - ${size}`,
          "description": `Bitrate: ${format.bitrate}`,
          "id": `quality_${uniqueId}` 
        };
      }));

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑\n\n*ᴛɪᴛᴛʟᴇ:* ${videoDetails.title}\n*✍ᴀʀᴛɪsᴛ:* ${videoDetails.author}\n*ᴠɪᴇᴡs:* ${videoDetails.views}\n*ʟɪᴋᴇᴅ:* ${videoDetails.likes}\n*ᴜᴘʟᴏᴀᴅᴇᴅ ᴏɴ:* ${videoDetails.uploadDate}\n*ᴅᴜʀᴀᴛɪᴏᴍ:* ${videoDetails.duration}\n`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: `https://telegra.ph/file/bf3a4cac5fc11b3199b56.jpg` } }, { upload: Matrix.waUploadToServer })),
                title: "",
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🎬 sᴇʟᴇᴄᴛ ᴠɪᴅᴇᴏ ǫᴜᴀʟɪᴛʏ",
                      sections: [
                        {
                          title: "♂️ ᴀᴠᴀɪʟᴀʙʟᴇ ǫᴜᴀʟɪᴛɪᴇs",
                          highlight_label: "💡 Choose Quality",
                          rows: qualityButtons
                        },
                      ]
                    })
                  },
                ],
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: false,
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });
      await m.React("✅");

      videoIndex += formats.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) {
    const key = parseInt(selectedId.replace('quality_', ''));
    const selectedFormat = videoMap.get(key);

    if (selectedFormat) {
      try {
        const videoUrl = `https://www.youtube.com/watch?v=${selectedFormat.videoId}`;
        const videoStream = ytdl(videoUrl, { format: selectedFormat });
        const finalVideoBuffer = await streamToBuffer(videoStream);

        const duration = selectedFormat.duration;
        const size = selectedFormat.size;

        await Matrix.sendMessage(m.from, {
          video: finalVideoBuffer,
          mimetype: 'video/mp4',
          caption: `ᴛɪᴛᴛʟᴇ: ${selectedFormat.title}\nᴀʀᴛɪsᴛ: ${selectedFormat.author}\nᴠɪᴇᴡs: ${selectedFormat.views}\nʟɪᴋᴇs: ${selectedFormat.likes}\nᴜᴘʟᴏᴀᴅᴇᴅ ᴏɴ: ${selectedFormat.uploadDate}\nᴅᴜʀᴀᴛɪᴏɴ: ${duration}\nSize: ${size}\n\n> ©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓`
        }, { quoted: m });
      } catch (error) {
        console.error("Error fetching video details:", error);
        m.reply('Error fetching video details.');
      }
    } else {
    }
  }
};

const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

const formatSize = (size) => {
  if (size < 1024) return `${size.toFixed(2)} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`;
  return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
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
