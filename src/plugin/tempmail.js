import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fetch from 'node-fetch'; // Import fetch for Node.js environment

const tempMailCommand = async (m, Matrix) => {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

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

    if (cmd === 'tempmail') {
        try {
            await m.React("🕘");

            // Generate temporary email
            const genResponse = await fetch('https://tempmail.apinepdev.workers.dev/api/gen');
            const genData = await genResponse.json();

            if (!genData.email) {
                m.reply('Failed to generate temporary email.');
                await m.React("❌");
                return;
            }

            const tempEmail = genData.email;

            const buttons = [
                {
                    "name": "cta_copy",
                    "buttonParamsJson": JSON.stringify({
                        "display_text": "Copy Email",
                        "id": "copy_email",
                        "copy_code": tempEmail
                    })
                },
                {
                    "name": "quick_reply",
                    "buttonParamsJson": JSON.stringify({
                        "display_text": "Check Inbox",
                        "id": `check_inbox_${tempEmail}`
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
                                text: `Generated Temporary Email: ${tempEmail}`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "© Powered By YourApp"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: "Temporary Email",
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

            const sentMsg = await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
                messageId: msg.key.id
            });
            await m.React("✅");

        } catch (error) {
            console.error("Error processing your request:", error);
            m.reply('Error processing your request.');
            await m.React("❌");
        }
    } else if (selectedId && selectedId.startsWith('check_inbox_')) {
        // Extract email from the selectedId
        const email = selectedId.slice('check_inbox_'.length);

        try {
            await m.React("🕘");

            // Check inbox for the provided email
            const inboxResponse = await fetch(`https://tempmail.apinepdev.workers.dev/api/getmessage?email=${email}`);
            const inboxData = await inboxResponse.json();

            let inboxMessages;
            if (inboxData && inboxData.length > 0) {
                inboxMessages = 'Inbox Messages:\n\n';
                inboxData.forEach((msg, index) => {
                    inboxMessages += `${index + 1}. From: ${msg.from}\nSubject: ${msg.subject}\nDate: ${msg.date}\n\n`;
                });
            } else {
                inboxMessages = 'No messages found in the inbox.';
            }

            // Edit the existing message to show the updated inbox
            const updatedMsg = {
                protocolMessage: {
                    key: m.key, // Use the key of the original message
                    type: 14,
                    editedMessage: {
                        conversation: inboxMessages
                    }
                }
            };

            await Matrix.relayMessage(m.chat, updatedMsg, {});
            await m.React("✅");

        } catch (error) {
            console.error("Error processing your request:", error);
            m.reply('Error processing your request.');
            await m.React("❌");
        }
    } else {
    }
};

export default tempMailCommand;
