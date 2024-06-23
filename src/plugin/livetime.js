import nodeFetch from 'node-fetch';

const flirting = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['time', 'timenow'];

      if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a countrys short code eg _.time KE_.');

    try {
      await m.React('🕘');


      const response = await nodeFetch(`https://levanter.onrender.com/time?code=${text}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch time: ${await response.text()}`);
      }

      const json = await response.json();
      const result = json.result;
      await Matrix.sendMessage(m.from, { text: result, mentions: [m.sender] }, { quoted: m });
    } catch (error) {
      console.error('Error fetching time:', error);
      await Matrix.sendMessage(m.from, { text: "Failed to retrieve flirt message. Please try again later." });
    }
  }
};

export default flirting;
