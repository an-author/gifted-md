import fetch from 'node-fetch';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const API_URL = 'https://teraboxvideodownloader.nepcoderdevs.workers.dev/?url=';

const searchResultsMap = new Map();
let searchIndex = 1; 

const playcommand = async (m, Matrix) => {
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

  const validCommands = ['terabox', 'tbox', 'tboxdown'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply('Please provide a terabox link.');
    }

    try {
      await m.React("🕘");
      
      const response = await fetch(API_URL + encodeURIComponent(text));
      const data = await response.json();
      const resolutions = data?.response[0]?.resolutions;

      if (!resolutions) {
        m.reply('No video resolutions found.');
        await m.React("❌");
        return;
      }
      const buttons = [
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "Fast Download",
            id: `media_fastdownload_${searchIndex}`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "HD Video",
            id: `media_hdvideo_${searchIndex}`
          })
        }
      ];

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Select the desired media type to download.\n\nTitle: ${text}\n\n`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "© Powered By Ethix-MD"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: text,
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons
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
      await m.React("✅");

      searchIndex += 1; 
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { 
    const parts = selectedId.split('_');
    const type = parts[1];
    const key = parseInt(parts[2]);

    if (type === 'fastdownload' || type === 'hdvideo') {
      const resolution = type === 'fastdownload' ? 'Fast Download' : 'HD Video';
      const selectedResolution = resolution.toLowerCase().replace(' ', '_');

      const currentResult = searchResultsMap.get(key);
      const selectedLink = currentResult?.resolutions[selectedResolution];

      try {
        const response = await fetch(selectedLink);
        const buffer = await response.buffer();
        const sizeInMB = buffer.length / (1024 * 1024);

        if (sizeInMB > 200) {
          const content = { document: buffer, mimetype: 'video/mp4', fileName: `${currentResult.title}.mp4` };
          await Matrix.sendMessage(m.from, content, { quoted: m });
        } else {
          const content = { video: buffer, mimetype: 'video/mp4', caption: 'Downloaded by Ethix-MD' };
          await Matrix.sendMessage(m.from, content, { quoted: m });
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }
  }
};

export default playcommand;
