import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';

import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}
// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Africa/Nairobi").format("HH:mm:ss");
const xdate = moment.tz("Africa/Nairobi").format("DD/MM/YYYY");
const time2 = moment().tz("Africa/Nairobi").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const test = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;
  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
     // console.log(selectedListId);
    }
  }
  const selectedId = selectedListId || selectedButtonId;
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '.';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
        const mode = process.env.MODE;
        const validCommands = ['menu', 'listmenu', 'help', 'list'];

  if (validCommands.includes(cmd)) {
    let msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./src/gifted.jpg')}, { upload: Matrix.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false  
                }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  "name": "single_select",
                  "buttonParamsJson": `{"title":"🕳 𝐓𝐀𝐏 𝐓𝐎 𝐎𝐏𝐄𝐍 𝐌𝐄𝐍𝐔 🕳",
                 "sections":
                   [{
                    "title":"🛸 𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔𝐒 𝐋𝐈𝐒𝐓",
                    "highlight_label":"💿 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
                    "rows":[
                      {
                       "header":"",
                       "title":"🔰 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
                       "description":"ɢɪғᴛᴇᴅ-ᴍᴅ ᴀʟʟ ᴍᴇɴᴜ",
                       "id":"View All Menu"
                      },
                      {
                        "header":"",
                        "title":"⬇️ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴍᴇɴᴜ ᴄᴍᴅs",
                        "id":"Downloader Menu"
                      },
                      {
                        "header":"",
                        "title":"👨‍👨‍👧‍👧𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs ɢʀᴏᴜᴘ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Group Menu"
                      },
                      {
                        "header":"",
                        "title":"👨‍🔧 𝐓𝐎𝐎𝐋 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs ᴛᴏᴏʟ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Tool Menu"
                      },
                      {
                        "header":"",
                        "title":"🗿 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs ʙᴏᴛ ᴍᴀɪɴ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Main Menu"
                      },
                     {
                        "header":"",
                        "title":"👨‍💻 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs ᴀᴡᴇsᴏᴍᴇ ᴏᴡɴᴇʀ ᴍᴇɴᴜ ᴄᴍᴅs",
                        "id":"Owner Menu"
                      },
                      {
                        "header":"",
                        "title":"✨ 𝐀𝐈 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs ᴀɪ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Ai Menu"
                      },
                      {
                        "header":"",
                        "title":"🔍𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔🔎",
                        "description":"sʜᴏᴡs sᴇᴀʀᴄʜ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Search Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚‍♂️ 𝐒𝐓𝐀𝐋𝐊𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs sᴛᴀʟᴋ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Stalk Menu"
                      },
                      {
                        "header":"",
                        "title":"🥏 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡs ᴄᴏɴᴠᴇʀᴛᴇʀ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Converter Menu"
                      }
                    ]}
                  ]}`
                },
              ],
            }),
            contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 9999,
                  isForwarded: false,
                }
          }),
          {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ",
                    url: `https://whatsapp.com/channel/0029VaYauR9ISTkHTj4xvi1l`
                  }),
        },
      },
    }, {});

    await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
  }
      if (selectedId == "View All Menu") {
        const mode = process.env.MODE;
        const str = `hey ${m.pushName} ${pushwish}
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

╭━❮ *ᴄᴏɴᴠᴇʀᴛᴇʀ* ❯━╮
┃◇ ${prefix}𝙰𝚃𝚃𝙿
┃◇ ${prefix}𝙰𝚃𝚃𝙿2
┃◇ ${prefix}𝙰𝚃𝚃𝙿3
┃◇ ${prefix}𝙴𝙱𝙸𝙽𝙰𝚁𝚈
┃◇ ${prefix}𝙳𝙱𝙸𝙽𝙰𝚁𝚈
┃◇ ${prefix}𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
┃◇ ${prefix}𝙼𝙿3
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴀɪ* ❯━╮
┃◇ ${prefix}𝙰𝚒
┃◇ ${prefix}𝙱𝚞𝚐
┃◇ ${prefix}𝚁𝚎𝚙𝚘𝚛𝚝
┃◇ ${prefix}𝙶𝚙𝚝
┃◇ ${prefix}𝙳𝚊𝚕𝚕𝚎
┃◇ ${prefix}𝚁𝚎𝚖𝚒𝚗𝚒
┃◇ ${prefix}𝙶𝚎𝚖𝚒𝚗𝚒 
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴛᴏᴏʟs* ❯━╮
┃◇ ${prefix}𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
┃◇ ${prefix}𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
┃◇ ${prefix}𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
┃◇ ${prefix}𝚃𝚛𝚝
┃◇ ${prefix}𝚃𝚝𝚜
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ɢʀᴏᴜᴘ* ❯━╮
┃◇ ${prefix}𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
┃◇ ${prefix}𝚂𝚎𝚝𝚙𝚙𝚐𝚌
┃◇ ${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎
┃◇ ${prefix}𝚂𝚎𝚝𝚍𝚎𝚜𝚌
┃◇ ${prefix}𝙶𝚛𝚘𝚞𝚙
┃◇ ${prefix}𝙶𝚌𝚜𝚎𝚝𝚝𝚒𝚗𝚐
┃◇ ${prefix}𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃◇ ${prefix}𝙰𝚍𝚍
┃◇ ${prefix}𝙺𝚒𝚌𝚔
┃◇ ${prefix}𝙷𝚒𝚍𝚎𝚃𝚊𝚐
┃◇ ${prefix}𝚃𝚊𝚐𝚊𝚕𝚕
┃◇ ${prefix}𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
┃◇ ${prefix}𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
┃◇ ${prefix}𝙿𝚛𝚘𝚖𝚘𝚝𝚎
┃◇ ${prefix}𝙳𝚎𝚖𝚘𝚝𝚎
┃◇ ${prefix}𝙶𝚎𝚝𝚋𝚒𝚘
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* ❯━╮
┃◇ ${prefix}𝙰𝚙𝚔 
┃◇ ${prefix}𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃◇ ${prefix}𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
┃◇ ${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
┃◇ ${prefix}𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
┃◇ ${prefix}𝙶𝚍𝚛𝚒𝚟𝚎
┃◇ ${prefix}𝙸𝚗𝚜𝚝𝚊
┃◇ ${prefix}𝚈𝚝𝚖𝚙3
┃◇ ${prefix}𝚈𝚝𝚖𝚙4
┃◇ ${prefix}𝙿𝚕𝚊𝚢
┃◇ ${prefix}𝚂𝚘𝚗𝚐
┃◇ ${prefix}𝚅𝚒𝚍𝚎𝚘
┃◇ ${prefix}𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
┃◇ ${prefix}𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
┃◇ ${prefix}𝚃𝚒𝚔𝚝𝚘𝚔
╰━━━━━━━━━━━━━━━⊷

╭━❮ *sᴇᴀʀᴄʜ* ❯━╮
┃◇ ${prefix}𝙿𝚕𝚊𝚢
┃◇ ${prefix}𝚈𝚝𝚜
┃◇ ${prefix}𝙸𝚖𝚍𝚋
┃◇ ${prefix}𝙶𝚘𝚘𝚐𝚕𝚎
┃◇ ${prefix}𝙶𝚒𝚖𝚊𝚐𝚎
┃◇ ${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
┃◇ ${prefix}𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
┃◇ ${prefix}𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
┃◇ ${prefix}𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
┃◇ ${prefix}𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
┃◇ ${prefix}𝙻𝚢𝚛𝚒𝚌𝚜
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴍᴀɪɴ* ❯━╮
┃◇ ${prefix}𝙿𝚒𝚗𝚐
┃◇ ${prefix}𝙰𝚕𝚒𝚟𝚎
┃◇ ${prefix}𝙾𝚠𝚗𝚎𝚛
┃◇ ${prefix}𝙼𝚎𝚗𝚞
┃◇ ${prefix}𝙸𝚗𝚏𝚘𝚋𝚘𝚝
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴏᴡɴᴇʀ* ❯━╮
┃◇ ${prefix}𝙹𝚘𝚒𝚗
┃◇ ${prefix}𝙻𝚎𝚊𝚟𝚎
┃◇ ${prefix}𝙱𝚕𝚘𝚌𝚔
┃◇ ${prefix}𝚄𝚗𝚋𝚕𝚘𝚌𝚔
┃◇ ${prefix}𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
┃◇ ${prefix}𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
┃◇ ${prefix}𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
┃◇ ${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
┃◇ ${prefix}𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
┃◇ ${prefix}𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
┃◇ ${prefix}𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
┃◇ ${prefix}𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠
╰━━━━━━━━━━━━━━━⊷

╭━❮ *sᴛᴀʟᴋᴇʀ* ❯━╮
┃◇ ${prefix}𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
┃◇ ${prefix}𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
┃◇ ${prefix}𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔
╰━━━━━━━━━━━━━━━⊷
   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `MATRIX-MD`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
}
   if ( selectedId == "Downloader Menu") {
     const str = `
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴅᴏᴡɴʟᴏᴀᴅᴇʀs* ❯━╮
┃◇ ${prefix}𝙰𝚙𝚔
┃◇ ${prefix}𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃◇ ${prefix}𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
┃◇ ${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
┃◇ ${prefix}𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
┃◇ ${prefix}𝙶𝚍𝚛𝚒𝚟𝚎
┃◇ ${prefix}𝙸𝚗𝚜𝚝𝚊
┃◇ ${prefix}𝚈𝚝𝚖𝚙3
┃◇ ${prefix}𝚈𝚝𝚖𝚙4
┃◇ ${prefix}𝙿𝚕𝚊𝚢
┃◇ ${prefix}𝚂𝚘𝚗𝚐
┃◇ ${prefix}𝚅𝚒𝚍𝚎𝚘
┃◇ ${prefix}𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
┃◇ ${prefix}𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
┃◇ ${prefix}𝚃𝚒𝚔𝚝𝚘𝚔
╰━━━━━━━━━━━━━━━⊷`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: m
});
}
   
   if ( selectedId == "Group Menu") {
     const str = `
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ɢʀᴏᴜᴘ* ❯━╮
┃◇ ${prefix}𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
┃◇ ${prefix}𝚂𝚎𝚝𝚙𝚙𝚐𝚌
┃◇ ${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎
┃◇ ${prefix}𝚂𝚎𝚝𝚍𝚎𝚜𝚌
┃◇ ${prefix}𝙶𝚛𝚘𝚞𝚙
┃◇ ${prefix}𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃◇ ${prefix}𝙰𝚍𝚍
┃◇ ${prefix}𝙺𝚒𝚌𝚔
┃◇ ${prefix}𝙷𝚒𝚍𝚎𝚃𝚊𝚐
┃◇ ${prefix}𝚃𝚊𝚐𝚊𝚕𝚕
┃◇ ${prefix}𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
┃◇ ${prefix}𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
┃◇ ${prefix}𝙿𝚛𝚘𝚖𝚘𝚝𝚎
┃◇ ${prefix}𝙳𝚎𝚖𝚘𝚝𝚎
┃◇ ${prefix}𝙶𝚎𝚝𝚋𝚒𝚘
╰━━━━━━━━━━━━━━━⊷
     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Main Menu") {
     const str =`
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴍᴀɪɴ* ❯━╮
┃◇ ${prefix}𝙿𝚒𝚗𝚐
┃◇ ${prefix}𝙰𝚕𝚒𝚟𝚎
┃◇ ${prefix}𝙾𝚠𝚗𝚎𝚛
┃◇ ${prefix}𝙼𝚎𝚗𝚞
┃◇ ${prefix}𝙸𝚗𝚏𝚘𝚋𝚘𝚝
╰━━━━━━━━━━━━━━━⊷`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Owner Menu") {
     const str = `
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴏᴡɴᴇʀ* ❯━╮
┃◇ ${prefix}𝙹𝚘𝚒𝚗
┃◇ ${prefix}𝙻𝚎𝚊𝚟𝚎
┃◇ ${prefix}𝙱𝚕𝚘𝚌𝚔
┃◇ ${prefix}𝚄𝚗𝚋𝚕𝚘𝚌𝚔
┃◇ ${prefix}𝙱𝚌𝚐𝚛𝚘𝚞𝚙
┃◇ ${prefix}𝙱𝚌𝚊𝚕𝚕
┃◇ ${prefix}𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
┃◇ ${prefix}𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
┃◇ ${prefix}𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
┃◇ ${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
┃◇ ${prefix}𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
┃◇ ${prefix}𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
┃◇ ${prefix}𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
┃◇ ${prefix}𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠
╰━━━━━━━━━━━━━━━⊷`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Search Menu") {
     const str =`
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *sᴇᴀʀᴄʜ* ❯━╮
┃◇ ${prefix}𝙿𝚕𝚊𝚢
┃◇ ${prefix}𝚈𝚝𝚜
┃◇ ${prefix}𝙸𝚖𝚍𝚋
┃◇ ${prefix}𝙶𝚘𝚘𝚐𝚕𝚎
┃◇ ${prefix}𝙶𝚒𝚖𝚊𝚐𝚎
┃◇ ${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
┃◇ ${prefix}𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
┃◇ ${prefix}𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
┃◇ ${prefix}𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
┃◇ ${prefix}𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
┃◇ ${prefix}𝙻𝚢𝚛𝚒𝚌𝚜
╰━━━━━━━━━━━━━━━⊷`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded:false,
  }
}, {
  quoted: m
});
}
   if (selectedId == "Stalk Menu") {
     const str =`
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *sᴛᴀʟᴋᴇʀ* ❯━╮
┃◇ ${prefix}𝙽𝚘𝚠𝚊
┃◇ ${prefix}𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
┃◇ ${prefix}𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
┃◇ ${prefix}𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔
╰━━━━━━━━━━━━━━━⊷`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Tool Menu") {
     const str =`
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴛᴏᴏʟs* ❯━╮
┃◇ ${prefix}𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
┃◇ ${prefix}𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
┃◇ ${prefix}𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
┃◇ ${prefix}𝙸𝚗𝚏𝚘
┃◇ ${prefix}𝚃𝚛𝚝
┃◇ ${prefix}𝚃𝚝𝚜
╰━━━━━━━━━━━━━━━⊷`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Ai Menu") {
     const str =`
╭━❮ *sᴇʀᴠᴇʀ ɪɴғᴏ*❯━╮
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴀɪ* ❯━╮
┃◇ ${prefix}𝙰𝚒
┃◇ ${prefix}𝙱𝚞𝚐
┃◇ ${prefix}𝚁𝚎𝚙𝚘𝚛𝚝
┃◇ ${prefix}𝙶𝚙𝚝
┃◇ ${prefix}𝙳𝚊𝚕𝚕𝚎
┃◇ ${prefix}𝚁𝚎𝚖𝚒𝚗𝚒
┃◇ ${prefix}𝙶𝚎𝚖𝚒𝚗𝚒
╰━━━━━━━━━━━━━━━⊷`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Converter Menu") {
     const str =`
╭───❮ *sᴇʀᴠᴇʀ ɪɴғᴏ* ❯
│♧ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│♧ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━⊷

╭━❮ *ᴄᴏɴᴠᴇʀᴛᴇʀ* ❯━╮
┃◇ ${prefix}𝙰𝚃𝚃𝙿
┃◇ ${prefix}𝙰𝚃𝚃𝙿2
┃◇ ${prefix}𝙰𝚃𝚃𝙿3
┃◇ ${prefix}𝙴𝙱𝙸𝙽𝙰𝚁𝚈
┃◇ ${prefix}𝙳𝙱𝙸𝙽𝙰𝚁𝚈
┃◇ ${prefix}𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
┃◇ ${prefix}𝙼𝙿3
╰━━━━━━━━━━━━━━━⊷
     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: m
});
}
};

export default test;
