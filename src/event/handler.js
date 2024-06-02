import { downloadMediaMessage, generateWAMessageFromContent, getAggregateVotesInPollMessage } from '@whiskeysockets/baileys';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { proto } = pkg;
import { serialize, decodeJid } from '../../lib/Serializer.js';
import path from 'path';
import fs from 'fs/promises';
import config from '../../config.cjs';

const userCommandCounts = new Map();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const getMessage = async (key, store) => {
    if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
    }
    return {
        conversation: "Hai Im gss botwa"
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

const deleteUpdate = async (message, sock, store) => {
    try {
        const { fromMe, id, participant } = message;
        if (fromMe || !participant) return; // Check if participant is defined

        const msg = await getMessage({ remoteJid: message.key.remoteJid, id: message.key.id }, store); // Fetch the original message
        if (!msg) return;

        const serializedMsg = serialize(msg, sock); // Serialize the fetched message
        if (!serializedMsg) return;

        await sock.sendMessage(serializedMsg.from, {
            text: `
≡ deleted a message 
┌─⊷ 𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀 
▢ *Number :* @${participant.split`@`[0]} 
└─────────────
            `.trim(),
            mentions: [participant]
        }, { quoted: serializedMsg });

        await sock.copyNForward(serializedMsg.from, serializedMsg, false).catch(e => console.log(e, serializedMsg));
    } catch (e) {
        console.error(e);
    }
};

const Handler = async (chatUpdate, sock, logger, store) => {
    try {
        if (chatUpdate.type !== 'notify') return;

        const m = serialize(JSON.parse(JSON.stringify(chatUpdate.messages[0])), sock, logger);
        if (!m.message) return;

        const participants = m.isGroup ? await sock.groupMetadata(m.from).then(metadata => metadata.participants) : [];
        const groupAdmins = m.isGroup ? getGroupAdmins(participants) : [];
        const isBotAdmins = m.isGroup ? groupAdmins.includes(m.isSelf) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;

        const PREFIX = /^[\\/!#.]/;
        const isCOMMAND = (body) => PREFIX.test(body);
        const prefixMatch = isCOMMAND(m.body) ? m.body.match(PREFIX) : null;
        const prefix = prefixMatch ? prefixMatch[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
        const text = m.body.slice(prefix.length + cmd.length).trim();

        if (
            m.key &&
            m.key.remoteJid === 'status@broadcast' &&
            config.AUTO_STATUS_SEEN
        ) {
            await sock.readMessages([m.key]);
        }
        
        

        const onrNumber = m.from.match(/\d+/)[0];

if (!sock.public) {
        if (!m.isSelf && onrNumber !== config.OWNER_NUMBER) {
            return;
        }
    }

/* // ANTIBOT TEMPERERY OFF //
        if (m.isGroup && m.key && m.key.id.startsWith("BAE5") && m.key.id.length === 16) {
            if (!isBotAdmins) return m.reply(`Eh, the bot is not an admin`);
            if (isAdmins) return m.reply(`Ehh, sorry you are admin`);
            await sock.sendMessage(m.from, { text: "Bot detect" }, { quoted: m });
            await sock.groupParticipantsUpdate(m.from, [m.sender], 'remove');
            return;
        }
*/
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

                    const warnmsg = `You have reached the maximum number of allowed commands. Join the group on tap join Group for using continuous commands.\n\nOtherwise, wait for some time to use commands again.\n\nLeftTime: ${hoursLeft}H ${minutesLeft}M`;

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

        // Call deleteUpdate for all messages
        await deleteUpdate(m, sock, store);

        const { isGroup, type, sender, from, body } = m;
        console.log(m);

        const pluginFiles = await fs.readdir(path.join(__dirname, '..', 'plugin'));

        for (const file of pluginFiles) {
            if (file.endsWith('.js')) {
                const pluginModule = await import(path.join(__dirname, '..', 'plugin', file));
                const loadPlugins = pluginModule.default;
                await loadPlugins(m, sock);
            }
        }
    } catch (e) {
        console.log(e);
    }
};

export default Handler;
