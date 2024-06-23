import nodeFetch from 'node-fetch';
import JavaScriptObfuscator from 'javascript-obfuscator';
import jidDecode from "@whiskeysockets/baileys";


  const obfuscator = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['obfus', 'obf', 'enc', 'encrypt', 'obfuscate'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a javascript code to encrypt');

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

      let msg = generateWAMessageFromContent(m.from, {
            viewOnceMessage: {
            
      

          await Matrix.sendMessage(obfuscationResult.getObfuscatedCode());

        await m.React('✅');
      } else {
        throw new Error('Error 404.');
  }
    } catch (error) {
      console.error('Encountered an Error:', error.message);
      m.reply('Could not connect to Js Obfuscator.');
      await m.React('❌');
    }
  }
};

export default obfuscator;
