import axios from 'axios';

const flirting = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['flirt'];

  if (validCommands.includes(cmd)) {
    try {
      const apiKey = 'shizo'; 

      const res = await axios.get(`https://shizoapi.onrender.com/api/texts/flirt?apikey=${apiKey}`);
      if (!res.ok) {
        throw new Error('Failed to fetch flirt message');
      }

      const result = res.data.result;
      await Matrix.sendMessage(m.from, { text: result, mentions: [m.sender] }, { quoted: m });
    } catch (error) {
      console.error('Error fetching flirt message:', error);
      await Matrix.sendMessage(m.from, { text: "Failed to retrieve flirt message. Please try again later." });
    }
  }

  await m.React("❌");
};

export default flirting;
