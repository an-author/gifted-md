import { serialize, decodeJid } from '../../lib/Serializer.js';
import path from 'path';
import fs from 'fs/promises';
import config from '../../config.cjs';
import { smsg } from '../../lib/myfunc.cjs';

const userCommandCounts = new Map();
const antilinkSettings = {};

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const getMessage = async (key, store) => {
    if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
    }
    return {
        conversation: "Hai Im sock botwa"
    };
};

// Function to get group admins
export const getGroupAdmins = (participants) => {
    let admins = [];
    for (let i of participants) {
        if (i.admin === "superadmin" || i.admin === "admin") {
            admins.push(i.id);
        }
    }
    return admins || [];
};

const Handler = async (chatUpdate, sock, logger, store) => {
    try {
        if (chatUpdate.type !== 'notify') return;

        const m = serialize(JSON.parse(JSON.stringify(chatUpdate.messages[0])), sock, logger);
        if (!m.message) return;

        const participants = m.isGroup ? await sock.groupMetadata(m.from).then(metadata => metadata.participants) : [];
        const groupAdmins = m.isGroup ? getGroupAdmins(participants) : [];

        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botId) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;

        const PREFIX = /^[\\/!#.]/;
        const isCOMMAND = (body) => PREFIX.test(body);
        const prefixMatch = isCOMMAND(m.body) ? m.body.match(PREFIX) : null;
        const prefix = prefixMatch ? prefixMatch[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
        const text = m.body.slice(prefix.length + cmd.length).trim();
        const args = m.body.slice(prefix.length + cmd.length).trim().split(' ');

        if (m.message.protocolMessage && m.message.protocolMessage.type === 'REVOKE') {
            console.log("Debugging REVOKE message:", m);
            const key = m.message.protocolMessage.key;
            if (!key) return;

            const deletedMsg = chatUpdate.messages.find(msg => msg.key.id === key.id || msg.key.remoteJid === key.remoteJid);
            if (deletedMsg) {
                const serializedMsg = serialize(deletedMsg, sock);
                const participant = key.participant || m.key.participant || m.participant || m.key.remoteJid;
                const sender = participant ? participant.split('@')[0] : 'unknown';

                if (serializedMsg.message) {
                    console.log(`Deleted message from ${sender}:`, serializedMsg.message);
                } else {
                    console.log(`Deleted message from ${sender}: Message type not supported for logging`);
                }
            } else {
                const participant = key.participant || m.key.participant || m.participant || m.key.remoteJid;
                const sender = participant ? participant.split('@')[0] : 'unknown';
                console.log(`Deleted message from ${sender} but no message found. Detailed info:`, {
                    keyId: key.id,
                    chatUpdateMessages: chatUpdate.messages.map(msg => msg.key.id),
                    m: m
                });
            }
        }

        // Handle edited messages
        if (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.quotedMessage && m.message.extendedTextMessage.contextInfo.quotedMessage.type === 'editedMessage') {
            console.log("Edited message:", m.message.extendedTextMessage.text);
        }

        if (m.key && m.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN) {
            await sock.readMessages([m.key]);
        }

        const botNumber = await sock.decodeJid(sock.user.id);
        const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
        let isCreator = false;

        if (m.isGroup) {
            isCreator = m.sender === ownerNumber || m.sender === botNumber;
        } else {
            isCreator = m.sender === ownerNumber || m.sender === botNumber;
        }

        if (!sock.public) {
            if (!isCreator) {
                return;
            }
        }

        const groupChatId = '120363162694704836@g.us';
        const groupLink = 'https://chat.whatsapp.com/E3PWxdvLc7ZCp1ExOCkEGp';
        const commandLimit = 10; // Daily command limit
        const oneDayInMs = 24 * 60 * 60 * 1000; // Milliseconds in a day

        if (isCOMMAND(m.body) && config.NOT_ALLOW) {
            const groupMetadata = await sock.groupMetadata(groupChatId);
            const participants = groupMetadata.participants;
            const participantIndex = participants.map(participant => participant.id);

            if (!participantIndex.includes(m.sender)) {
                let userInfo = userCommandCounts.get(m.sender) || { count: 0, timestamp: Date.now() };

                if (Date.now() - userInfo.timestamp >= oneDayInMs) {
                    userInfo.count = 0;
                    userInfo.timestamp = Date.now();
                }

                if (userInfo.count >= commandLimit) {
                    const timeLeft = oneDayInMs - (Date.now() - userInfo.timestamp);
                    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

                    const warnmsg = `You have reached the maximum number of allowed commands. Join the group to use more commands continuously.\n\nOtherwise, wait for some time to use commands again.\n\nTime Left: ${hoursLeft}H ${minutesLeft}M`;

                    await sock.sendMessage(m.from, {
                        text: warnmsg,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `${m.pushName}`,
                                sourceUrl: groupLink,
                                body: ``
                            }
                        }
                    }, { quoted: m });
                    return;
                } else {
                    userInfo.count += 1;
                    userCommandCounts.set(m.sender, userInfo);
                }
            }
        }


        if (m.isGroup && antilinkSettings[m.from]) {
            if (m.body.match(/(chat.whatsapp.com\/)/gi)) {
                if (!isBotAdmins) {
                    await sock.sendMessage(m.from, { text: `The bot needs to be an admin to remove links.` });
                    return;
                }
                let gclink = `https://chat.whatsapp.com/${await sock.groupInviteCode(m.from)}`;
                let isLinkThisGc = new RegExp(gclink, 'i');
                let isgclink = isLinkThisGc.test(m.body);
                if (isgclink) {
                    await sock.sendMessage(m.from, { text: `The link you shared is for this group, so you won't be removed.` });
                    return;
                }
                if (isAdmins) {
                    await sock.sendMessage(m.from, { text: `Admins are allowed to share links.` });
                    return;
                }
                if (isCreator) {
                    await sock.sendMessage(m.from, { text: `The owner is allowed to share links.` });
                    return;
                }
                await sock.sendMessage(m.from, {
                    text: `\`\`\`「 Group Link Detected 」\`\`\`\n\n@${m.sender.split("@")[0]}, please do not share group links in this group.`,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: m });
                setTimeout(async () => {
                    await sock.groupParticipantsUpdate(m.from, [m.sender], 'remove');
                }, 5000);
            }
        }

        const { isGroup, type, sender, from, body } = m;
        console.log(m);

        const pluginFiles = await fs.readdir(path.join(__dirname, '..', 'plugin'));

        for (const file of pluginFiles) {
            if (file.endsWith('.js')) {
                const pluginModule = await import(path.join(__dirname, '..', 'plugin', file));
                const loadPlugins = pluginModule.default;
                await loadPlugins(m, sock, antilinkSettings);
            }
        }
    } catch (e) {
        console.log(e);
    }
};

export default Handler;
