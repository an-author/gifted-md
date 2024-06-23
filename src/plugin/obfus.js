import nodeFetch from 'node-fetch';
import JavaScriptObfuscator from 'javascript-obfuscator';

const obfuscator = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['obfus', 'obf', 'enc', 'encrypt', 'obfuscate'];

  if (validCommands.includes(cmd)) {
    try {
  
let code = arg.join(' ')

  if (!arg[0]) { repondre('After the command, provide a valid JavaScript code for encryption');return}; 

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

await Matrix.sendMessage(obfuscationResult.getObfuscatedCode());

  } catch (error) {
      console.error('Error fetching flirt message:', error);
      await Matrix.sendMessage(m.from, { text: "Failed to retrieve flirt message. Please try again later." });
    }
  }
};

export default obfuscator;
