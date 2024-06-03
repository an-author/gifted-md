import config from '../../config.cjs'

const deleteMessage = async (m, gss) => {
  const botNumber = await gss.decodeJid(gss.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['del', 'delete'];

   if (validCommands.includes(cmd)) {
     if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    if (!m.quoted) return m.reply('Please mention a message to delete.');

    const { chat, id } = m.quoted;

    const key = {
      remoteJid: m.chat,
      id: m.quoted.id,
      participant: m.quoted.sender,
    };

    try {
      await gss.sendMessage(m.from, { delete: key });
      m.reply('Message deleted successfully.');
    } catch (error) {
      console.error(error);
      m.reply(`An error occurred while deleting the message: ${error.message}`);
    }
  }
};

export default deleteMessage;
