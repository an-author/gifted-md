import aptoid from 'aptoide-scraper';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Use a global variable to store the topApps
let topApps = [];

const getAppDetails = async (appId) => {
  // Use Aptoid scraper to get app details by ID
  const app = await aptoid.getApp(appId);
  return app;
};

const searchApps = async (query) => {
  // Use Aptoid scraper to search for apps
  const searchResult = await aptoid.searchApps(query);
  return searchResult;
};

const getAppButtons = (apps) => {
  // Generate buttons for each app
  return apps.map((app, index) => ({
    "header": "",
    "title": app.title,
    "description": `Category: ${app.category}`,
    "id": app.title // Use app title as ID
  }));
};

const appSearch = async (m, Matrix) => {
  let selectedAppId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedAppId = params.id;
    }
  }

  const selectedId = selectedAppId || selectedButtonId;

  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['appsearch', 'searchapp', 'getapp'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide an app name or query');

    try {
      await m.React("🕘");

      // Search for apps
      const searchResult = await searchApps(text);
      topApps = searchResult.apps.slice(0, 10);

      if (topApps.length === 0) {
        m.reply('No results found.');
        await m.React("❌");
        return;
      }

      const buttons = getAppButtons(topApps);

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Aptoid App Search\n\n🔍 Search for your favorite apps easily.\n\n📱 Select an app from the list below to get details.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "© Powered By Aptoid"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
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
                          title: "😎 Top 10 Apps",
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
                isForwarded: true
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
  } else if (selectedId) {
    const selectedApp = topApps.find(app => app.title === selectedId);

    if (selectedApp) {
      try {
        const appDetails = await getAppDetails(selectedApp.id);
        const msg = generateWAMessageFromContent(m.from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `App Name: ${appDetails.title}\nCategory: ${appDetails.category}\nRating: ${appDetails.rating}\nDownloads: ${appDetails.downloads}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: "© Powered By Aptoid"
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false 
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [
                    {
                      name: "quick_reply",
                      buttonParamsJson: `{\"display_text\":\"Download\",\"id\":\".download ${appDetails.id}\"}`
                    }
                  ],
                }),
                contextInfo: {
                  mentionedJid: [m.sender],
                  forwardingScore: 9999,
                  isForwarded: true
                }
              }),
            }
          },
        }, {});

        await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
          messageId: msg.key.id
        });
      } catch (error) {
        console.error("Error getting app details:", error);
      }
    }
  }
};

export default appSearch;
