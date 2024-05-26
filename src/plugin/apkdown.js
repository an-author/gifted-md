import aptoideScraper from 'aptoide-scraper';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fs from 'fs';


const apkMap = new Map();
let apkIndex = 1;

const searchAPK = async (m, Matrix) => {
  let selectedApkId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;

  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['apksearch', 'searchapk'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a search query for APKs');

    try {
      await m.React("🕘");

      // Search Aptoide for the provided query
      const searchResult = await aptoideScraper.search(text);
      const topAPKs = searchResult.slice(0, 10);

      if (topAPKs.length === 0) {
        m.reply('No APKs found.');
        await m.React("❌");
        return;
      }

      const apkButtons = topAPKs.map((apk, index) => {
        const uniqueId = apkIndex + index;
        apkMap.set(uniqueId, apk);
        return {
          "header": "",
          "title": apk.title,
          "description": `Version: ${apk.version}\nSize: ${apk.size}`,
          "id": `${uniqueId}` // Unique key format: index
        };
      });

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Aptoide APK Downloader\n\n🔍 Search and download your favorite APKs easily.\n\n📌 Simply select an APK from the list below to get started.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "© Powered By Aptoide"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: `https://uploadimage.org/i/Untitled69-2.jpg` } }, { upload: Matrix.waUploadToServer })),
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
                      title: "🔖 Select an APK",
                      sections: [
                        {
                          title: "😎 Top 10 APK Results",
                          highlight_label: "🤩 Top 10",
                          rows: apkButtons
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
                  newsletterName: "Aptoide",
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
      await m.React("✅");

      apkIndex += topAPKs.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedApkId) { // Check if selectedApkId exists
    const selectedAPK = apkMap.get(parseInt(selectedApkId)); // Find APK by unique key

    if (selectedAPK) {
      try {
        // Download APK
        const apkMessage = {
          document: fs.readFileSync(selectedAPK.filePath),
          mimetype: 'application/vnd.android.package-archive',
          fileName: `${selectedAPK.name}.apk`
        };

        await Matrix.sendMessage(m.from, apkMessage, { quoted: m });
      } catch (error) {
        console.error("Error downloading APK:", error);
        
      }
    } else {
      
    }
  }
};

export default searchAPK;
