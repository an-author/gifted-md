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
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
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
      console.log(selectedListId);
    }
  }
  const selectedId = selectedListId || selectedButtonId;
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
        const mode = process.env.MODE;

  if (cmd === "menu") {
    let msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `╭─────────────━┈⊷
│🤖 ʙᴏᴛ ɴᴀᴍᴇ: *ᴇᴛʜɪx-ᴍᴅ*
│📍 ᴠᴇʀꜱɪᴏɴ: 1.0
│👨‍💻 ᴏᴡɴᴇʀ : *ᴇᴛʜɪx xsɪᴅ*      
│👤 ɴᴜᴍʙᴇʀ: 919142294671
│📡 ʜᴏsᴛ: *${os.hostname()}*
│📡 ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
│🛡 ᴍᴏᴅᴇ: *${mode}*
│💫 ᴘʀᴇғɪx: *[Multi-Prefix]*
╰─────────────━┈⊷ `
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "© Powered By Ethix-MD"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./src/ethix.jpg')}, { upload: Matrix.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false  
                }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  "name": "single_select",
                  "buttonParamsJson": `{"title":"🔖𝚻𝚫𝚸 𝐅𝚯𝚪 𝚯𝚸𝚵𝚴 𝚳𝚵𝚴𝐔",
                 "sections":
                   [{
                    "title":"😎 𝛯𝑇𝛨𝛪𝛸-𝛭𝐷 𝛥𝐿𝐿𝛭𝛯𝛮𝑈",
                    "highlight_label":"🤩 𝛥𝐿𝐿𝛭𝛯𝛮𝑈",
                    "rows":[
                      {
                       "header":"",
                       "title":"🔰 ᴀʟʟ ᴍᴇɴᴜ",
                       "description":"🎨𝛯𝑇𝛨𝛪𝛸-𝛭𝐷 𝛥𝐿𝐿𝛭𝛯𝛮𝑈🎨",
                       "id":"View All Menu"
                      },
                      {
                        "header":"",
                        "title":"⬇️ ᴅᴏᴡɴʟᴀᴏᴅᴇʀ ᴍᴇɴᴜ",
                        "description":"📂𝐒𝚮𝚯𝐖 𝚫𝐋𝐋 𝐃𝚯𝐖𝚴𝐋𝚯𝚫𝐃 𝐅𝚵𝚫𝚻𝐔𝚪𝚵𝐒🗂",
                        "id":"Downloader Menu"
                      },
                      {
                        "header":"",
                        "title":"👨‍👨‍👧‍👧ɢʀᴏᴜᴘ ᴍᴇɴᴜ",
                        "description":"🥵𝐅𝚵𝚫𝚻𝐔𝚪𝚵 𝚻𝚮𝚫𝚻 𝚫𝚪𝚵 𝚯𝚴𝐋𝐘 𝚫𝛁𝚰𝐋𝚫𝚩𝐋𝚵 𝐅𝚯𝚪 𝐆𝚪𝚯𝐔𝚸🥵",
                        "id":"Group Menu"
                      },
                      {
                        "header":"",
                        "title":"👨‍🔧 ᴛᴏᴏʟ ᴍᴇɴᴜ",
                        "description":"🛠 𝐒𝚮𝚯𝐖 𝚳𝚵 𝚻𝚯𝚯𝐋 𝚳𝚵𝚴𝐔",
                        "id":"Tool Menu"
                      },
                      {
                        "header":"",
                        "title":"🗿 ᴍᴀɪɴ ᴍᴇɴᴜ",
                        "description":"📪 𝚩𝚯𝚻 𝚳𝚫𝚰𝚴 𝐂𝚯𝚳𝚳𝚫𝚴𝐃𝐒🗳",
                        "id":"Main Menu"
                      },
                     {
                        "header":"",
                        "title":"👨‍💻 ᴏᴡɴᴇʀ ᴍᴇɴᴜ",
                        "description":"😎𝐅𝚵𝚫𝚻𝐔𝚪𝚵 𝚻𝚮𝚫𝚻 𝚫𝚪𝚵 𝚯𝚴𝐋𝐘 𝐅𝚯𝚪 𝚳𝐘 𝚮𝚫𝚴𝐃𝐒𝚯𝚳𝚵 𝚯𝐖𝚴𝚵𝚪👨‍💼",
                        "id":"Owner Menu"
                      },
                      {
                        "header":"",
                        "title":"👾 ғᴜɴ ᴍᴇɴᴜ",
                        "description":"👻 𝐋𝚵𝚻𝐒 𝚳𝚫𝐊𝚵 𝚫 𝐒𝚯𝚳𝚵 𝐅𝐔𝚴",
                        "id":"Fun Menu"
                      },
                      {
                        "header":"",
                        "title":"✨ ᴀɪ ᴍᴇɴᴜ",
                        "description":"💫 𝐒𝚮𝚯𝐖 𝚳𝚵 𝚫𝚰 𝚳𝚵𝚴𝐔 🎇",
                        "id":"Ai Menu"
                      },
                      {
                        "header":"",
                        "title":"🔍sᴇᴀʀᴄʜ ᴍᴇɴᴜ🔎",
                        "description":"♂️ 𝐒𝚮𝚯𝐖 𝚳𝚵 𝐒𝚵𝚫𝚪𝐂𝚮 𝚳𝚵𝚴𝐔",
                        "id":"Search Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚‍♂️ sᴛᴀʟᴋ ᴍᴇɴᴜ",
                        "description":"👨‍💼 𝐒𝚮𝚯𝐖 𝚳𝚵 𝐒𝚻𝚫𝐋𝐊 𝚳𝚵𝚴𝐔🪆",
                        "id":"Stalk Menu"
                      },
                      {
                        "header":"",
                        "title":"🥏 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚎𝚛 𝚖𝚎𝚗𝚞",
                        "description":"🛷 𝐒𝚮𝚯𝐖 𝚳𝚵 𝐂𝚯𝚴𝛁𝚵𝚪𝚻𝚵𝚪 𝚳𝚵𝚴𝐔",
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

    await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
  }
      if (selectedId == "View All Menu") {
        const mode = process.env.MODE;
        const str = `hey ${m.pushName} ${pushwish}
╭─────────────━┈⊷
│🤖 ʙᴏᴛ ɴᴀᴍᴇ: *ᴇᴛʜɪx-ᴍᴅ*
│📍 ᴠᴇʀꜱɪᴏɴ: 1.0
│👨‍💻 ᴏᴡɴᴇʀ : *ᴇᴛʜɪx xsɪᴅ*      
│👤 ɴᴜᴍʙᴇʀ: 919142294671
│🌐 ʜᴏsᴛ: *${os.hostname()}*
│💻 ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
│🛡 ᴍᴏᴅᴇ: *${mode}*
│💫 ᴘʀᴇғɪx: *[Multi-Prefix]*
│🕐 ʀᴜɴ ᴛɪᴍᴇ: *${hours}h ${minutes}m ${seconds}s*
╰─────────────━┈⊷ 
╭━❮ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ❯━╮
┃❐ .𝙰𝚃𝚃𝙿
┃❐ .𝙰𝚃𝚃𝙿2
┃❐ .𝙰𝚃𝚃𝙿3
┃❐ .𝙴𝙱𝙸𝙽𝙰𝚁𝚈
┃❐ .𝙳𝙱𝙸𝙽𝙰𝚁𝚈
┃❐ .𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙰𝙸 ❯━╮
┃❐ 𝙰𝚒
┃❐ 𝚅𝚘𝚒𝚌𝚎𝚊𝚒
┃❐ 𝙱𝚞𝚐
┃❐ 𝚁𝚎𝚙𝚘𝚛𝚝
┃❐ 𝙶𝚙𝚝
┃❐ 𝙳𝚊𝚕𝚕𝚎
┃❐ 𝚁𝚎𝚖𝚒𝚗𝚒
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝚃𝙾𝙾𝙻 ❯━╮
┃❐ 𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
┃❐ 𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
┃❐ 𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
┃❐ 𝙸𝚗𝚏𝚘
┃❐ 𝚃𝚛𝚝
┃❐ 𝚃𝚝𝚜
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙶𝚁𝙾𝚄𝙿 ❯━╮
┃❐ 𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
┃❐ 𝚂𝚎𝚝𝚙𝚙𝚐𝚌
┃❐ 𝚂𝚎𝚝𝚗𝚊𝚖𝚎
┃❐ 𝚂𝚎𝚝𝚍𝚎𝚜𝚌
┃❐ 𝙶𝚛𝚘𝚞𝚙
┃❐ 𝙶𝚌𝚜𝚎𝚝𝚝𝚒𝚗𝚐
┃❐ 𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃❐ 𝙻𝚎𝚏𝚝
┃❐ 𝚂𝚎𝚝𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃❐ 𝚂𝚎𝚝𝙻𝚎𝚏𝚝
┃❐ 𝙴𝚍𝚒𝚝𝚒𝚗𝚏𝚘
┃❐ 𝙰𝚍𝚍
┃❐ 𝙺𝚒𝚌𝚔
┃❐ 𝙷𝚒𝚍𝚎𝚃𝚊𝚐
┃❐ 𝚃𝚊𝚐𝚊𝚕𝚕
┃❐ 𝚃𝚘𝚝𝚊𝚐
┃❐ 𝚃𝚊𝚐𝚊𝚍𝚖𝚒𝚗
┃❐ 𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
┃❐ 𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
┃❐ 𝙼𝚞𝚝𝚎
┃❐ 𝙿𝚛𝚘𝚖𝚘𝚝𝚎
┃❐ 𝙳𝚎𝚖𝚘𝚝𝚎
┃❐ 𝚁𝚎𝚟𝚘𝚔𝚎
┃❐ 𝙿𝚘𝚕𝚕
┃❐ 𝙶𝚎𝚝𝚋𝚒𝚘
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯━╮
┃❐ 𝙰𝚙𝚔
┃❐ 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃❐ 𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
┃❐ 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
┃❐ 𝚇𝚗𝚡𝚡𝚂𝚎𝚊𝚛𝚌𝚑
┃❐ 𝚇𝚗𝚡𝚡𝚍𝚕
┃❐ 𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
┃❐ 𝙶𝚍𝚛𝚒𝚟𝚎
┃❐ 𝙸𝚗𝚜𝚝𝚊
┃❐ 𝚈𝚝𝚖𝚙3
┃❐ 𝚈𝚝𝚖𝚙4
┃❐ 𝙿𝚕𝚊𝚢
┃❐ 𝚂𝚘𝚗𝚐
┃❐ 𝚅𝚒𝚍𝚎𝚘
┃❐ 𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
┃❐ 𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
┃❐ 𝚃𝚒𝚔𝚝𝚘𝚔
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝚂𝙴𝙰𝚁𝙲𝙷 ❯━╮
┃❐ 𝙿𝚕𝚊𝚢
┃❐ 𝚈𝚝𝚜
┃❐ 𝙸𝚖𝚍𝚋
┃❐ 𝙶𝚘𝚘𝚐𝚕𝚎
┃❐ 𝙶𝚒𝚖𝚊𝚐𝚎
┃❐ 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
┃❐ 𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
┃❐ 𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
┃❐ 𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
┃❐ 𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
┃❐ 𝙻𝚢𝚛𝚒𝚌𝚜
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙵𝚄𝙽 ❯━╮
┃❐ 𝙳𝚎𝚕𝚝𝚝𝚝
┃❐ 𝚃𝚒𝚌𝚝𝚊𝚌𝚝𝚘𝚎
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙼𝙰𝙸𝙽 ❯━╮
┃❐ 𝙿𝚒𝚗𝚐
┃❐ 𝙰𝚕𝚒𝚟𝚎
┃❐ 𝙾𝚠𝚗𝚎𝚛
┃❐ 𝙼𝚎𝚗𝚞
┃❐ 𝙸𝚗𝚏𝚘𝚌𝚑𝚊𝚝
┃❐ 𝚀𝚞𝚘𝚝𝚎𝚍
┃❐ 𝙻𝚒𝚜𝚝𝚙𝚌
┃❐ 𝙻𝚒𝚜𝚝𝚐𝚌
┃❐ 𝙻𝚒𝚜𝚝𝚘𝚗𝚕𝚒𝚗𝚎
┃❐ 𝙸𝚗𝚏𝚘𝚋𝚘𝚝
┃❐ 𝙱𝚞𝚢𝚙𝚛𝚎𝚖𝚒𝚞𝚖
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙾𝚆𝙽𝙴𝚁 ❯━╮
┃❐ 𝚁𝚎𝚊𝚌𝚝
┃❐ 𝙲𝚑𝚊𝚝
┃❐ 𝙹𝚘𝚒𝚗
┃❐ 𝙻𝚎𝚊𝚟𝚎
┃❐ 𝙱𝚕𝚘𝚌𝚔
┃❐ 𝚄𝚗𝚋𝚕𝚘𝚌𝚔
┃❐ 𝙱𝚌𝚐𝚛𝚘𝚞𝚙
┃❐ 𝙱𝚌𝚊𝚕𝚕
┃❐ 𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
┃❐ 𝚂𝚎𝚝𝚎𝚡𝚒𝚏
┃❐ 𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
┃❐ 𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
┃❐ 𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
┃❐ 𝚂𝚕𝚎𝚎𝚙
┃❐ 𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
┃❐ 𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
┃❐ 𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
┃❐ 𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠
┃❐ 𝚋𝚊𝚗
┃❐ 𝚞𝚗𝚋𝚊𝚗
┃❐ 𝚠𝚊𝚛𝚗
┃❐ 𝚞𝚗𝚠𝚊𝚛𝚗
┃❐ 𝚋𝚊𝚗𝚌𝚑𝚊𝚝
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝚂𝚃𝙰𝙻𝙺 ❯━╮
┃❐ 𝙽𝚘𝚠𝚊
┃❐ 𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
┃❐ 𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
┃❐ 𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔
┃❐ 𝙿𝚛𝚘𝚏𝚒𝚕𝚎𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙽𝚞𝚖𝚋𝚎𝚛𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙴𝚖𝚊𝚒𝚕𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙿𝚑𝚘𝚗𝚎𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙻𝚘𝚌𝚊𝚝𝚒𝚘𝚗𝚜𝚝𝚊𝚕𝚔
╰━━━━━━━━━━━━━━━⪼
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
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: fgg
});
}
   if ( selectedId == "Downloader Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯━╮
┃❐ 𝙰𝚙𝚔
┃❐ 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃❐ 𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
┃❐ 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
┃❐ 𝚇𝚗𝚡𝚡𝚂𝚎𝚊𝚛𝚌𝚑
┃❐ 𝚇𝚗𝚡𝚡𝚍𝚕
┃❐ 𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
┃❐ 𝙶𝚍𝚛𝚒𝚟𝚎
┃❐ 𝙸𝚗𝚜𝚝𝚊
┃❐ 𝚈𝚝𝚖𝚙3
┃❐ 𝚈𝚝𝚖𝚙4
┃❐ 𝙿𝚕𝚊𝚢
┃❐ 𝚂𝚘𝚗𝚐
┃❐ 𝚅𝚒𝚍𝚎𝚘
┃❐ 𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
┃❐ 𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
┃❐ 𝚃𝚒𝚔𝚝𝚘𝚔
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if ( selectedId == "Group Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙶𝚁𝙾𝚄𝙿 ❯━╮
┃❐ 𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
┃❐ 𝚂𝚎𝚝𝚙𝚙𝚐𝚌
┃❐ 𝚂𝚎𝚝𝚗𝚊𝚖𝚎
┃❐ 𝚂𝚎𝚝𝚍𝚎𝚜𝚌
┃❐ 𝙶𝚛𝚘𝚞𝚙
┃❐ 𝙶𝚌𝚜𝚎𝚝𝚝𝚒𝚗𝚐
┃❐ 𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃❐ 𝙻𝚎𝚏𝚝
┃❐ 𝚂𝚎𝚝𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃❐ 𝚂𝚎𝚝𝙻𝚎𝚏𝚝
┃❐ 𝙴𝚍𝚒𝚝𝚒𝚗𝚏𝚘
┃❐ 𝙰𝚍𝚍
┃❐ 𝙺𝚒𝚌𝚔
┃❐ 𝙷𝚒𝚍𝚎𝚃𝚊𝚐
┃❐ 𝚃𝚊𝚐𝚊𝚕𝚕
┃❐ 𝚃𝚘𝚝𝚊𝚐
┃❐ 𝚃𝚊𝚐𝚊𝚍𝚖𝚒𝚗
┃❐ 𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
┃❐ 𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
┃❐ 𝙼𝚞𝚝𝚎
┃❐ 𝙿𝚛𝚘𝚖𝚘𝚝𝚎
┃❐ 𝙳𝚎𝚖𝚘𝚝𝚎
┃❐ 𝚁𝚎𝚟𝚘𝚔𝚎
┃❐ 𝙿𝚘𝚕𝚕
┃❐ 𝙶𝚎𝚝𝚋𝚒𝚘
╰━━━━━━━━━━━━━━━⪼
     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if (selectedId == "Main Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙼𝙰𝙸𝙽 ❯━╮
┃❐ 𝙿𝚒𝚗𝚐
┃❐ 𝙰𝚕𝚒𝚟𝚎
┃❐ 𝙾𝚠𝚗𝚎𝚛
┃❐ 𝙼𝚎𝚗𝚞
┃❐ 𝙸𝚗𝚏𝚘𝚌𝚑𝚊𝚝
┃❐ 𝚀𝚞𝚘𝚝𝚎𝚍
┃❐ 𝙻𝚒𝚜𝚝𝚙𝚌
┃❐ 𝙻𝚒𝚜𝚝𝚐𝚌
┃❐ 𝙻𝚒𝚜𝚝𝚘𝚗𝚕𝚒𝚗𝚎
┃❐ 𝙸𝚗𝚏𝚘𝚋𝚘𝚝
┃❐ 𝙱𝚞𝚢𝚙𝚛𝚎𝚖𝚒𝚞𝚖
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if (selectedId == "Owner Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙾𝚆𝙽𝙴𝚁 ❯━╮
┃❐ 𝚁𝚎𝚊𝚌𝚝
┃❐ 𝙲𝚑𝚊𝚝
┃❐ 𝙹𝚘𝚒𝚗
┃❐ 𝙻𝚎𝚊𝚟𝚎
┃❐ 𝙱𝚕𝚘𝚌𝚔
┃❐ 𝚄𝚗𝚋𝚕𝚘𝚌𝚔
┃❐ 𝙱𝚌𝚐𝚛𝚘𝚞𝚙
┃❐ 𝙱𝚌𝚊𝚕𝚕
┃❐ 𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
┃❐ 𝚂𝚎𝚝𝚎𝚡𝚒𝚏
┃❐ 𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
┃❐ 𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
┃❐ 𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
┃❐ 𝚂𝚕𝚎𝚎𝚙
┃❐ 𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
┃❐ 𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
┃❐ 𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
┃❐ 𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠
┃❐ 𝚋𝚊𝚗
┃❐ 𝚞𝚗𝚋𝚊𝚗
┃❐ 𝚠𝚊𝚛𝚗
┃❐ 𝚞𝚗𝚠𝚊𝚛𝚗
┃❐ 𝚋𝚊𝚗𝚌𝚑𝚊𝚝
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if (selectedId == "Search Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝚂𝙴𝙰𝚁𝙲𝙷 ❯━╮
┃❐ 𝙿𝚕𝚊𝚢
┃❐ 𝚈𝚝𝚜
┃❐ 𝙸𝚖𝚍𝚋
┃❐ 𝙶𝚘𝚘𝚐𝚕𝚎
┃❐ 𝙶𝚒𝚖𝚊𝚐𝚎
┃❐ 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
┃❐ 𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
┃❐ 𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
┃❐ 𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
┃❐ 𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
┃❐ 𝙻𝚢𝚛𝚒𝚌𝚜
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   if (selectedId == "Stalk Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝚂𝚃𝙰𝙻𝙺 ❯━╮
┃❐ 𝙽𝚘𝚠𝚊
┃❐ 𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
┃❐ 𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
┃❐ 𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔
┃❐ 𝙿𝚛𝚘𝚏𝚒𝚕𝚎𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙽𝚞𝚖𝚋𝚎𝚛𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙴𝚖𝚊𝚒𝚕𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙿𝚑𝚘𝚗𝚎𝚜𝚝𝚊𝚕𝚔
┃❐ 𝙻𝚘𝚌𝚊𝚝𝚒𝚘𝚗𝚜𝚝𝚊𝚕𝚔
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if (selectedId == "Fun Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙵𝚄𝙽 ❯━╮
┃❐ 𝙳𝚎𝚕𝚝𝚝𝚝
┃❐ 𝚃𝚒𝚌𝚝𝚊𝚌𝚝𝚘𝚎
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if (selectedId == "Tool Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝚃𝙾𝙾𝙻 ❯━╮
┃❐ 𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
┃❐ 𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
┃❐ 𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
┃❐ 𝙸𝚗𝚏𝚘
┃❐ 𝚃𝚛𝚝
┃❐ 𝚃𝚝𝚜
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if (selectedId == "Ai Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙰𝙸 ❯━╮
┃❐ 𝙰𝚒
┃❐ 𝚅𝚘𝚒𝚌𝚎𝚊𝚒
┃❐ 𝙱𝚞𝚐
┃❐ 𝚁𝚎𝚙𝚘𝚛𝚝
┃❐ 𝙶𝚙𝚝
┃❐ 𝙳𝚊𝚕𝚕𝚎
┃❐ 𝚁𝚎𝚖𝚒𝚗𝚒
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
   
   if (selectedId == "Converter Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ❯━╮
┃❐ .𝙰𝚃𝚃𝙿
┃❐ .𝙰𝚃𝚃𝙿2
┃❐ .𝙰𝚃𝚃𝙿3
┃❐ .𝙴𝙱𝙸𝙽𝙰𝚁𝚈
┃❐ .𝙳𝙱𝙸𝙽𝙰𝚁𝚈
┃❐ .𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
╰━━━━━━━━━━━━━━━⪼
     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
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
}, {
  quoted: m
});
}
};

export default test;
