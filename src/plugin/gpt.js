import axios from 'axios';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const gptResponse = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gpt', 'gptai', 'ai'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a question.');

    try {
      await m.React('🕘');

      const apiUrl = `https://aemt.me/gpt4?text=${text}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.answer) {
        const answer = result.answer;
        
        // Check if the answer contains code
        const codeMatch = answer.match(/```([\s\S]*?)```/);

          await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        } else {
          await Matrix.sendMessage(m.from, { text: answer }, { quoted: m });
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid response from the GPT API.');
      }
    } catch (error) {
      console.error('Error getting GPT response:', error.message);
      m.reply('Error getting response from GPT.');
      await m.React('❌');
    }
  }
};

export default gptResponse;
