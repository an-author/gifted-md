import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const teraboxdownloader = async (m, Matrix) => {
  const teraboxUrl = "https://teraboxvideodownloader.nepcoderdevs.workers.dev/?url=";
  const videoUrl = m.body.slice(teraboxUrl.length).trim();

  if (!videoUrl.startsWith("https://")) {
    return m.reply("Please provide a valid video URL.");
  }

  try {
    await m.React("🕘");

    // Make API request to Terabox Downloader API
    const response = await axios.get(videoUrl);
    const apiResult = response.data.response[0];

    // Extract data from the API response
    const resolutions = apiResult.resolutions;
    const thumbnailUrl = apiResult.thumbnail;
    const title = apiResult.title;

    // Create buttons for fast download and HD video
    const buttons = [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Fast Download",
          id: `terabox_fast_${Date.now()}`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "HD Video",
          id: `terabox_hd_${Date.now()}`
        })
      }
    ];

    // Create the message content
    const msgContent = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `Terabox Downloader\n\n🔍 ${title}\n\n📌 Select an option to download:`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "> © Powered by Terabox"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
              title: title,
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
              isForwarded: true
            }
          }),
        },
      },
    };

    // Send the message
    const msg = generateWAMessageFromContent(m.from, msgContent);
    await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
    await m.React("✅");
  } catch (error) {
    console.error("Error processing your request:", error);
    m.reply('Error processing your request.');
    await m.React("❌");
  }
};

export default teraboxdownloader;
