import nodeFetch from 'node-fetch';
const JavaScriptObfuscator = require('javascript-obfuscator')
const {jidDecode}=require("@whiskeysockets/baileys")


  const obfuscator = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['obfus', 'obf', 'enc', 'encrypt', 'obfuscate'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a javascript code to encrypt');

    try {
      await m.React('🧿');
      
  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1
  });
const result = (obfuscationResult.getObfuscatedCode());
      let msg = generateWAMessageFromContent(m.from, {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                  body: proto.Message.InteractiveMessage.Body.create({
                    text: answer
                  }),
                  footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "> *© ɢɪғᴛᴇᴅ-ᴍᴅ ᴠᴇʀsɪᴏɴ5*"
                  }),
                  header: proto.Message.InteractiveMessage.Header.create({
                    title: "",
                    subtitle: "",
                    hasMediaAttachment: false
                  }),
                  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                      {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                          display_text: "ᴄᴏᴘʏ ᴄᴏᴅᴇ",
                          id: "copy_code",
                          copy_code: code
                        })
                      }
                    ]
                  })
                })
              }
            }
          }, {});
      
await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        } else {
          await Matrix.sendMessage(m.from, { text: result }, { quoted: m });
        }

        await m.React('✅');
      } else {
        throw new Error('Error 404.');
  }
    } catch (error) {
      console.error('Encountered an Error:', error.message);
      m.reply('Could not connect to Js Obfuscator.');
      await m.React('❌');
    }
  }
};

export default obfuscator;
