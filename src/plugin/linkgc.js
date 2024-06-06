const linkgc = async (m, gss) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['linkgc', 'grouplink'];

    if (!validCommands.includes(cmd)) return;

    if (!m.isGroup) {
      return m.reply('This command can only be used in groups.');
    }

    const groupMetadata = await gss.groupMetadata(m.chat);
    const botNumber = await gss.decodeJid(gss.user.id);
    const isBotAdmins = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

    if (!isBotAdmins) {
      return m.reply('Bot must be an admin to use this command.');
    }

    const response = await gss.groupInviteCode(m.from);
    await gss.sendMessage(m.from, {
      text: `https://chat.whatsapp.com/${response}\n\nGroup Link: ${groupMetadata.subject}`,
      detectLink: true
    });

  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default linkgc;
