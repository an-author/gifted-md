import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

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

if (time2 < "04:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠 🌃`;
} else {
  pushwish = `𝐆𝐨𝐨𝐝 𝐍𝐢𝐠𝐡𝐭 🌌`;
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
        const validCommands = ['menu', 'menus', 'listmenu', 'allmenu', 'botmenu', 'help', 'list'];

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
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓* \n> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./gifted/img/gifted.jpg')}, { upload: Matrix.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false  
                }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                 {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐎𝐖𝐍𝐄𝐑",
                    id: ".owner"
                  })
                },
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𝐕𝐈𝐒𝐈𝐓 & 𝐅𝐎𝐑𝐊 𝐑𝐄𝐏𝐎",
                    url: `https://github.com/mouricedevs/gifted-md/fork`
                  })
                },
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𝐉𝐎𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋",
                    url: `https://whatsapp.com/channel/0029VaYauR9ISTkHTj4xvi1l`
                  })
                },
                {
                  "name": "single_select",
                  "buttonParamsJson": `{"title":"🕳 𝐓𝐀𝐏 𝐓𝐎 𝐎𝐏𝐄𝐍 𝐌𝐄𝐍𝐔 🕳",
                 "sections":
                   [{
                    "title":"🛸 𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔𝐒 𝐋𝐈𝐒𝐓 🛸",
                    "highlight_label":"💿 𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇",
                    "rows":[
                      {
                       "header":"",
                       "title":"𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
                       "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ᴀʟʟ ᴍᴇɴᴜ",
                       "id":"All Menu"
                      },
                      {
                        "header":"",
                        "title":"⬇𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴍᴇɴᴜ ᴄᴍᴅs",
                        "id":"Downloader Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ɢʀᴏᴜᴘ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Group Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐓𝐎𝐎𝐋 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ᴛᴏᴏʟ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Tools Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐆𝐄𝐍𝐄𝐑𝐀𝐋 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ɢᴇɴᴇʀᴀʟ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"General Menu"
                      },
                     {
                        "header":"",
                        "title":"𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ᴀᴡᴇsᴏᴍᴇ ᴏᴡɴᴇʀ ᴍᴇɴᴜ ᴄᴍᴅs",
                        "id":"Owner Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐀𝐈 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ᴀɪ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Ai Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ sᴇᴀʀᴄʜ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Search Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐒𝐓𝐀𝐋𝐊𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ sᴛᴀʟᴋᴇʀ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Stalker Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ʀᴇᴀᴄᴛɪᴏɴs ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Reactions Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ ɢɪғᴛᴇᴅ-ᴍᴅ ᴄᴏɴᴠᴇʀᴛᴇʀ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
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
        },
      },
    }, {});

    await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
  }
      if (selectedId == "All Menu") {
        const mode = process.env.MODE;
        const str = `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔*
${readmore}
╭━❍ *ᴄᴏɴᴠᴇʀᴛᴇʀ* ❍⊷
┃◇ ${prefix}𝙰𝚃𝚃𝙿
┃◇ ${prefix}𝙰𝚃𝚃𝙿2
┃◇ ${prefix}𝙰𝚃𝚃𝙿3
┃◇ ${prefix}𝙴𝙱𝙸𝙽𝙰𝚁𝚈
┃◇ ${prefix}𝙳𝙱𝙸𝙽𝙰𝚁𝚈
┃◇ ${prefix}𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
┃◇ ${prefix}𝙼𝙿3
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ᴀɪ* ❍⊷
┃◇ ${prefix}𝙰𝚒
┃◇ ${prefix}𝙱𝚞𝚐
┃◇ ${prefix}𝚁𝚎𝚙𝚘𝚛𝚝
┃◇ ${prefix}𝙶𝚙𝚝
┃◇ ${prefix}𝙳𝚊𝚕𝚕𝚎
┃◇ ${prefix}𝚁𝚎𝚖𝚒𝚗𝚒
┃◇ ${prefix}𝙶𝚎𝚖𝚒𝚗𝚒 
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ᴛᴏᴏʟs* ❍⊷
┃◇ ${prefix}𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
┃◇ ${prefix}𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
┃◇ ${prefix}𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
┃◇ ${prefix}𝚃𝚛𝚝
┃◇ ${prefix}𝚃𝚝𝚜
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ɢʀᴏᴜᴘ* ❍⊷
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
${readmore}
╭━❍ *ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* ❍⊷
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

╭━❍ *sᴇᴀʀᴄʜ* ❍⊷
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

╭━❍ *ɢᴇɴᴇʀᴀʟ* ❍⊷
┃◇ ${prefix}𝙿𝚒𝚗𝚐
┃◇ ${prefix}𝙰𝚕𝚒𝚟𝚎
┃◇ ${prefix}𝙾𝚠𝚗𝚎𝚛
┃◇ ${prefix}𝙼𝚎𝚗𝚞
┃◇ ${prefix}𝙸𝚗𝚏𝚘𝚋𝚘𝚝
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ᴏᴡɴᴇʀ* ❍⊷
┃◇ ${prefix}ᴊᴏɪɴ
┃◇ ${prefix}ʟᴇᴀᴠᴇ
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

╭━❍ *ʀᴇᴀᴄᴛɪᴏɴs* ❍⊷
┃◇ .ᴄʀʏ
┃◇ .ᴡɪɴᴋ
┃◇ .ᴋɪss
┃◇ .ᴘᴏᴋᴇ
┃◇ .ᴋɪᴄᴋ
┃◇ .sʟᴀᴘ
┃◇ .ʜᴜɢ
┃◇ .sᴍɪʟᴇ
┃◇ .ᴘᴀᴛ
┃◇ .ᴡᴀᴠᴇ
┃◇ .ʟɪᴄᴋ
┃◇ .ᴀᴡᴏᴏ
┃◇ .ʙɪᴛᴇ
┃◇ .ʏᴇᴇᴛ
┃◇ .ʙʟᴜsʜ
┃◇ .ʙᴜʟʟʏ
┃◇ .sᴍᴜɢ
┃◇ .ʙᴏɴᴋ
┃◇ .ᴅᴀɴᴄᴇ
┃◇ .ʜᴀᴘᴘʏ
┃◇ .sᴀᴅ
┃◇ .ᴄʀʏɴɢᴇ
┃◇ .ᴄᴜᴅᴅʟᴇ
┃◇ .sʜɪɴᴏʙᴜ
┃◇ .ʜᴀɴᴅʜᴏʟᴅ
┃◇ .ɢʟᴏᴍᴘ
┃◇ .ʜɪɢʜғɪᴠᴇ
╰━━━━━━━━━━━━━━━⊷

╭━❍ *sᴛᴀʟᴋᴇʀ* ❍⊷
┃◇ ${prefix}ᴛʀᴜᴇᴄᴀʟʟᴇʀ
┃◇ ${prefix}ɪɢsᴛᴀʟᴋ
┃◇ ${prefix}ɪɴsᴛᴀsᴛᴀʟᴋ
┃◇ ${prefix}ɢɪᴛsᴛᴀʟᴋ
┃◇ ${prefix}ɢɪᴛʜᴜʙ
┃◇ ${prefix}ɢɪᴛʜᴜʙsᴛᴀʟᴋ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴀᴘᴋ
┃◇ ${prefix}ᴀᴘᴘ
┃◇ ${prefix}ғʙ
┃◇ ${prefix}ᴀᴜᴛᴏᴅʟ
┃◇ ${prefix}ғʙᴅʟ
┃◇ ${prefix}ғᴀᴄᴇʙᴏᴏᴋ
┃◇ ${prefix}ᴍᴇᴅɪᴀғɪʀᴇ
┃◇ ${prefix}ᴍғɪʀᴇᴅʟ
┃◇ ${prefix}ᴍғɪʀᴇ
┃◇ ${prefix}ᴘɪɴᴛ
┃◇ ${prefix}ᴘɪɴᴛᴅʟ
┃◇ ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ
┃◇ ${prefix}ɢɪᴛᴄʟᴏɴᴇ
┃◇ ${prefix}ɢᴅʀɪᴠᴇ
┃◇ ${prefix}ɪɴsᴛᴀ
┃◇ ${prefix}ɪɢᴅʟ
┃◇ ${prefix}ɪɴsᴛᴀᴅʟ
┃◇ ${prefix}ɪɢ
┃◇ ${prefix}ʏᴛᴍᴘ3
┃◇ ${prefix}ʏᴛᴍᴘ4
┃◇ ${prefix}ᴘʟᴀʏ
┃◇ ${prefix}sᴏɴɢ
┃◇ ${prefix}ᴠɪᴅᴇᴏ
┃◇ ${prefix}ʏᴛᴍᴘ3ᴅᴏᴄ
┃◇ ${prefix}ʏᴛᴍᴘ4ᴅᴏᴄ
┃◇ ${prefix}ᴛɪᴋᴛᴏᴋ
┃◇ ${prefix}ᴛɪᴋᴛᴏᴋᴅʟ
┃◇ ${prefix}ᴛɪᴋᴅʟ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   
   if ( selectedId == "Group Menu") {
     const str = `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ɪɴᴠɪᴛᴇ
┃◇ ${prefix}ʟɪɴᴋɢᴄ
┃◇ ${prefix}sᴇᴛᴘᴘɢᴄ
┃◇ ${prefix}sᴇᴛɴᴀᴍᴇ
┃◇ ${prefix}sᴇᴛᴅᴇsᴄ
┃◇ ${prefix}ɢʀᴏᴜᴘ
┃◇ ${prefix}ᴡᴇʟᴄᴏᴍᴇ
┃◇ ${prefix}ᴀᴅᴅ
┃◇ ${prefix}ᴋɪᴄᴋ
┃◇ ${prefix}ʜɪᴅᴇᴛᴀɢ
┃◇ ${prefix}ᴛᴀɢᴀʟʟ
┃◇ ${prefix}ᴀɴᴛɪʟɪɴᴋ
┃◇ ${prefix}ᴀɴᴛɪᴛᴏxɪᴄ
┃◇ ${prefix}ᴘʀᴏᴍᴋᴛᴇ
┃◇ ${prefix}ᴅᴇᴍᴏᴛᴇ
┃◇ ${prefix}ɢᴇᴛʙɪᴏ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   
   if (selectedId == "General Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐆𝐄𝐍𝐄𝐑𝐀𝐋 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴘɪɴɢ
┃◇ ${prefix}ᴛᴇsᴛ
┃◇ ${prefix}ᴀʟɪᴠᴇ
┃◇ ${prefix}ᴏᴡɴᴇʀ
┃◇ ${prefix}ʀᴇᴘᴏ
┃◇ ${prefix}ᴍᴇɴʜ
┃◇ ${prefix}ɪɴғᴏʙᴏᴛ
┃◇ ${prefix}ᴀᴜᴛᴏᴅʟ
┃◇ ${prefix}ɢᴇᴛᴘᴘ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   
   if (selectedId == "Owner Menu") {
     const str = `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴊᴏɪɴ
┃◇ ${prefix}sᴇᴛᴘᴘʙᴏᴛ
┃◇ ${prefix}ғᴜʟʟᴘᴘ
┃◇ ${prefix}ʟᴇᴀᴠᴇ
┃◇ ${prefix}ʙʟᴏᴄᴋ
┃◇ ${prefix}ᴜɴʙʟᴏᴄᴋ
┃◇ ${prefix}ʙᴄɢʀᴏᴜᴘ
┃◇ ${prefix}ʙᴄᴀʟʟ
┃◇ ${prefix}sᴇᴛᴘᴘ
┃◇ ${prefix}ᴀɴᴛɪᴄᴀʟʟ
┃◇ ${prefix}sᴇᴛsᴛᴀᴛᴜs
┃◇ ${prefix}sᴇᴛɴᴀᴍᴇʙᴏᴛ
┃◇ ${prefix}ᴀᴜᴛᴏᴛʏᴘɪɴɢ
┃◇ ${prefix}ᴏɴʟɪɴᴇ
┃◇ ${prefix}ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
┃◇ ${prefix}ᴀᴜᴛᴏʀᴇᴀᴅ
┃◇ ${prefix}ᴀᴜᴛᴏsᴠɪᴇᴡ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   
   if (selectedId == "Search Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴘʟᴀʏ
┃◇ ${prefix}sᴏɴɢ
┃◇ ${prefix}ʏᴛs
┃◇ ${prefix}ɪᴍᴅʙ
┃◇ ${prefix}ᴍᴏᴠɪᴇ
┃◇ ${prefix}ɪᴍᴀɢᴇ
┃◇ ${prefix}ɢᴏᴏɢʟᴇ
┃◇ ${prefix}ɪᴍɢ
┃◇ ${prefix}ᴘɪɴᴛ
┃◇ ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ
┃◇ ${prefix}ᴡᴀʟʟᴘᴀᴘᴇʀ
┃◇ ${prefix}ᴡɪᴋɪᴍᴇᴅɪᴀ
┃◇ ${prefix}ʏᴛs
┃◇ ${prefix}ʀɪɴɢᴛᴏɴᴇ
┃◇ ${prefix}ʟʏʀɪᴄs
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   if (selectedId == "Stalker Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐒𝐓𝐀𝐋𝐊𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴛʀᴜᴇᴄᴀʟʟᴇʀ
┃◇ ${prefix}ɪɴsᴛᴀsᴛᴀʟᴋ
┃◇ ${prefix}ɴᴏᴡᴀ
┃◇ ${prefix}ɢɪᴛsᴛᴀʟᴋ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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

     if (selectedId == "Reactions Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔*
${readmore}
╭━❍ *ʀᴇᴀᴄᴛɪᴏɴs* ❍⊷
┃◇ .ᴄʀʏ
┃◇ .ᴡɪɴᴋ
┃◇ .ᴋɪss
┃◇ .ᴘᴏᴋᴇ
┃◇ .ᴋɪᴄᴋ
┃◇ .sʟᴀᴘ
┃◇ .ʜᴜɢ
┃◇ .sᴍɪʟᴇ
┃◇ .ᴘᴀᴛ
┃◇ .ᴡᴀᴠᴇ
┃◇ .ʟɪᴄᴋ
┃◇ .ᴀᴡᴏᴏ
┃◇ .ʙɪᴛᴇ
┃◇ .ʏᴇᴇᴛ
┃◇ .ʙʟᴜsʜ
┃◇ .ʙᴜʟʟʏ
┃◇ .sᴍᴜɢ
┃◇ .ʙᴏɴᴋ
┃◇ .ᴅᴀɴᴄᴇ
┃◇ .ʜᴀᴘᴘʏ
┃◇ .sᴀᴅ
┃◇ .ᴄʀʏɴɢᴇ
┃◇ .ᴄᴜᴅᴅʟᴇ
┃◇ .sʜɪɴᴏʙᴜ
┃◇ .ʜᴀɴᴅʜᴏʟᴅ
┃◇ .ɢʟᴏᴍᴘ
┃◇ .ʜɪɢʜғɪᴠᴇ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   
   if (selectedId == "Tools Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐓𝐎𝐎𝐋 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴄᴀʟᴄ
┃◇ ${prefix}ᴛᴇᴍᴘᴍᴀɪʟ
┃◇ ${prefix}ᴄʜᴇᴄᴋᴍᴀɪʟ
┃◇ ${prefix}ɪɴғᴏ
┃◇ ${prefix}ᴛʀᴛ
┃◇ ${prefix}ᴛᴛs
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   
   if (selectedId == "Ai Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐀𝐈 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴀɪ
┃◇ ${prefix}ʙᴜɢ
┃◇ ${prefix}ʀᴇᴘᴏʀᴛ
┃◇ ${prefix}ɢᴘᴛ
┃◇ ${prefix}ɢᴘᴛ4
┃◇ ${prefix}ᴅᴀʟʟᴇ
┃◇ ${prefix}ʀᴇᴍɪɴᴊ
┃◇ ${prefix}ɢᴇᴍɪɴɪ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
   
   if (selectedId == "Converter Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 ɢɪғᴛᴇᴅ-ᴍᴅ 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ɢɪғᴛᴇᴅ ᴛᴇᴄʜ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴀᴛᴛᴘ
┃◇ ${prefix}ᴀᴛᴛᴘ2
┃◇ ${prefix}ᴀᴛᴛᴘ3
┃◇ ${prefix}ᴇɴᴄᴏᴅᴇ
┃◇ ${prefix}ᴇʙɪɴᴀʀʏ
┃◇ ${prefix}ᴅᴇᴄᴏᴅᴇ
┃◇ ${prefix}ᴅᴇʙɪɴᴀʀʏ
┃◇ ${prefix}𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
┃◇ ${prefix}ᴍᴘ3
┃◇ ${prefix}ᴛᴏᴍᴘ3
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*
> *ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ*
`
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
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
