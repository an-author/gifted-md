import { search } from 'aptoide-scraper';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Use a global variable to store the topApps and a global counter for unique IDs
let topApps = [];
let uniqueIdCounter = 0;

const appSearch = async (m, Matrix) => {
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

  const validCommands = ['apt', 'aptoide', 'appsearch'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide an app name or search query');

    try {
      await m.React("🕘");

      // Search Aptoide for the provided query
      const searchResult = await search(text);
      topApps = searchResult.slice(0, 10);

      if (topApps.length === 0) {
        m.reply('No results found.');
        await m.React("❌");
        return;
      }

      const buttons = topApps.map((app) => {
        const id = (uniqueIdCounter++).toString(); // Generate unique ID
        return {
          "header": "",
          "title": app.name,
          "description": app.store,
          "id": id // Use unique ID
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
                text: `Ethix-MD Aptoide Downloader\n\n🔍 Search and download your favorite apps easily from Aptoide.\n\n📱 Simply select an app from the list below to get started.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "© Powered By Ethix-MD"
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
                      title: "🔖 Select an app",
                      sections: [
                        {
                          title: "😎 Top 10 Aptoide Results",
                          highlight_label: "🤩 Top 10",
                          rows: buttons
                        }
                      ]
                    })
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
      await m.React("✅");
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { // Check if selectedId exists
    try {
      const selectedApp = topApps.find(app => app.id === selectedId);

      if (selectedApp) {
        const title = selectedApp.name;
        const store = selectedApp.store;
        const downloads = selectedApp.downloads;
        const version = selectedApp.version;
        const appUrl = selectedApp.url;
        const thumbnailUrl = selectedApp.icon;

        const msg = generateWAMessageFromContent(m.from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `Name: ${title}\nStore: ${store}\nDownloads: ${downloads}\nVersion: ${version}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: "© Powered By Ethix-MD"
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
                  title: `App Information`,
                  subtitle: `App by ${store}`,
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [
                    {
                      name: "quick_reply",
                      buttonParamsJson: `{\"display_text\":\"Download App\",\"id\":\".download ${appUrl}\"}`
                    }
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
              })
            }
          }
        }, {});

        await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
          messageId: msg.key.id
        });
      } else {
      }
    } catch (error) {
      console.error("Error processing the selected app:", error);
    }
  }
};

export default appSearch;
