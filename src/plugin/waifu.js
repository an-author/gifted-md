import axios from 'axios';

const stickerCommands = ['cry', 'kiss', 'kill', 'kick'];

const stickerCommandHandler = async (m) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  
  if (stickerCommands.includes(cmd)) {
    const mentionedUsers = m.mentionedIds.map(id => '@' + id.replace('@c.us', ''));
    const senderName = m.sender ? '@' + m.sender.replace('@c.us', '') : '';
    let message = `${senderName} ${cmd}`;
    if (mentionedUsers.length > 0) {
      message += ` ${mentionedUsers.join(' ')}`;
    }

    try {
      const { data } = await axios.get(`https://api.waifu.pics/sfw/${cmd}`);
      if (data && data.url) {
        gss.sendImageAsSticker(m.from, data.url, { quoted: m, caption: '' }, { packname: "", author: "" });
        gss.sendMessage(m.from, message, { quoted: m });
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
