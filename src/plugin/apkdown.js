import aptoideScraper from 'aptoide-scraper';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fs from 'fs';
import axios from 'axios';
import path from 'path';

// Use a global variable to store the APKs and index
const apkMap = new Map();
let apkIndex = 1; // Global index for APKs

const searchAPK = async (m, Matrix) => {
  let selectedApkId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;

  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['apk', 'searchapk'];

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
          "title": apk.name, // Use the name of the APK
          "description": null,
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
                text: `Ethix-MD APK Downloader\n\n🔍 Search and download your favorite APKs easily.\n\n📌 Simply select an APK from the list below to get started.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> © Powered By Ethix-MD"
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

      // Increment the global APK index for the next set of APKs
      apkIndex += topAPKs.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedButtonId) { // Check if selectedButtonId exists
    const selectedAPK = apkMap.get(parseInt(selectedButtonId)); // Find APK by unique key

    if (selectedAPK) {
      try {
        // Download APK
        const response = await axios.get(selectedAPK.dllink, { responseType: 'arraybuffer' });
        const filePath = path.join(os.tmpdir(), `${selectedAPK.name}.apk`);
        fs.writeFileSync(filePath, response.data);

        const apkMessage = {
          document: fs.readFileSync(filePath),
          mimetype: 'application/vnd.android.package-archive',
          fileName: `${selectedAPK.name}.apk`
        };

        await Matrix.sendMessage(m.from, apkMessage, { quoted: m });
        fs.unlinkSync(filePath); // Clean up the file after sending
      } catch (error) {
        console.error("Error downloading APK:", error);
        
      }
    } else {

    }
  }
};

export default searchAPK;
