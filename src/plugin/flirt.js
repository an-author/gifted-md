import axios from 'axios';

const flirting = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['flirt'];

  if (validCommands.includes(cmd)) {
    try {
      const apiKey = "shizo";
      const url = `https://shizoapi.onrender.com/api/texts/flirt?apikey=${apiKey}`;
      const response = await axios.post(url);
      const result = response.data.result;
      m.reply(`${result}`);
    } catch (error) {
      console.error('Error in Flirt API:', error);
      m.reply(`An error occurred: ${error.message}`);
      await m.React("❌");
    }
  }
};

export default flirting;
