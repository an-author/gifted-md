import { downloadMediaMessage, generateWAMessageFromContent, getAggregateVotesInPollMessage } from '@whiskeysockets/baileys';
import { serialize, decodeJid } from '../../lib/Serializer.js';
import path from 'path';
import fs from 'fs/promises';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const Handler = async (chatUpdate, sock, logger) => {
  try {
    if (chatUpdate.type !== 'notify') return;

    const m = serialize(JSON.parse(JSON.stringify(chatUpdate.messages[0])), sock, logger);
    if (!m.message) return;

    if (
      m.key &&
      m.key.remoteJid === 'status@broadcast' &&
      config.AUTO_STATUS_SEEN === 'true'
    ) {
      await sock.readMessages([m.key]);
    }
    
     if (!sock.public) {
            if (!m.key.fromMe) return
        }
        
    
    if (
      m.type === 'protocolMessage' ||
      m.type === 'senderKeyDistributionMessage' ||
      !m.type ||
      m.type === ''
    ) {
      return;
    }

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