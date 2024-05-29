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



const Handler = async (chatUpdate, sock, logger) => {
    try {
        if (chatUpdate.type !== 'notify') return;

        const m = serialize(JSON.parse(JSON.stringify(chatUpdate.messages[0])), sock, logger);
        if (!m.message) return;
        const botNumber = await sock.decodeJid(sock.user.id)

        const participants = m.isGroup ? await sock.groupMetadata(m.from).then(metadata => metadata.participants) : [];
        const groupAdmins = m.isGroup ? getGroupAdmins(participants) : [];
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;

        if (
            m.key &&
            m.key.remoteJid === 'status@broadcast' &&
            config.AUTO_STATUS_SEEN
        ) {
            await sock.readMessages([m.key]);
        }
/*
        const onrNumber = m.from.match(/\d+/)[0];

        if (!sock.public) {
            if (!m.isSelf && onrNumber !== config.OWNER_NUMBER) {
                return;
            }
        }
        
/*
        const groupChatId = '120363162694704836@g.us';
        const groupLink = 'https://chat.whatsapp.com/E3PWxdvLc7ZCp1ExOCkEGp';
        const commandLimit = 10; // Daily command limit
        const oneDayInMs = 24 * 60 * 60 * 1000; // Milliseconds in a day

        if (!m.isSelf && onrNumber !==config.OWNER_NUMBER && config.NOT_ALLOW) {
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
        */

        if (
            m.type === 'protocolMessage' ||
            m.type === 'senderKeyDistributionMessage' ||
            !m.type ||
            m.type === ''
        ) {
            return;
        }

        const { isGroup, type, sender, from, body } = m;
      //  console.log(m);

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
