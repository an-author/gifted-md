import nodeFetch from 'node-fetch';
import JavaScriptObfuscator from 'javascript-obfuscator';

const obfuscator = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['obfus', 'obf', 'enc', 'encrypt', 'obfuscate'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a javascript code to encrypt.');

    try {
      await m.React('🧿');
      
  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1
  });

await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        } else {
          await Matrix.sendMessage(m.from, { text: answer }, { quoted: m });
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid code for encryption.');
      }
    } catch (error) {
      console.error('Error getting GPT response:', error.message);
      m.reply('Error getting response from GPT.');
      await m.React('❌');
    }
  }
};

export default obfuscator;
