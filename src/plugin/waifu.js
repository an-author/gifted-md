import axios from 'axios';


const stickerCommandHandler = async (m, gss) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  
  const stickerCommands = ['cry', 'kiss', 'kill', 'kick'];

  if (stickerCommands.includes(cmd)) {
    const packname = `Ethix-MD`;
    const author = '';

    try {
      const { data } = await axios.get(`https://api.waifu.pics/sfw/${cmd}`);
      if (data && data.url) {
        gss.sendImageAsSticker(m.from, data.url, m, { packname, author });
      } else {
        m.reply('Error fetching sticker.');
      }
    } catch (error) {
      console.error('Error fetching sticker:', error);
      m.reply('Error fetching sticker.');
    }
  }
};

export default stickerCommandHandler;
