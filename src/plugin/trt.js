import translate from 'translate-google-api';

const translateCommand = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + cmd.length).trim().split(' ');

  const validCommands = ['translate', 'trt'];

   if (validCommands.includes(cmd)) {
    const targetLang = args[0];
    const providedText = args.slice(1).join(' ');

    if (!targetLang || (!providedText && !(m.quoted && m.quoted.text))) {
      const responseMessage = "Usage: /translate <target_lang> <text>\nExample: /translate en कैसे हो भाई";
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
      return;
    }

    let dataToTranslate = providedText;
    if (m.quoted && m.quoted.text) {
      dataToTranslate = `${m.quoted.text} ${providedText}`.trim();
    }

    try {
      const result = await translate(dataToTranslate, { to: targetLang });
      const translatedText = result[0];

      const responseMessage = `${translatedText}`;
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error translating text:", error);
      await Matrix.sendMessage(m.from, { text: 'Error translating text.' }, { quoted: m });
    }
  }
};

export default translateCommand;
