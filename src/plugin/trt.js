// Import the necessary modules
import translate from '@vitalets/google-translate-api';
const translateCommand = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + cmd.length).trim().split(' ');

  if (cmd === 'translate') {
    const targetLang = args[0];
    const text = args.slice(1).join(' ');

    if (!targetLang || !text) {
      const responseMessage = "Usage: /translate <target_lang> <text>\nExample: /translate en कैसे हो भाई";
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
      return;
    }

    try {
      const result = await translate(text, { to: targetLang });
      const translatedText = result.text;

      const responseMessage = `Translated to ${targetLang}:\n\n${translatedText}`;
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error translating text:", error);
      await Matrix.sendMessage(m.from, { text: 'Error translating text.' }, { quoted: m });
    }
  }
};

export default translateCommand;
