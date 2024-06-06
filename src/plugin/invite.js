const invite = async (m, gss) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['invite', 'add'];

    if (!validCommands.includes(cmd)) return;

    const text = m.body.slice(prefix.length + cmd.length).trim();
    
    if (!m.isGroup) {
      return m.reply('*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS.*');
    }
    
    const groupMetadata = await gss.groupMetadata(m.chat);
    const botNumber = await gss.decodeJid(gss.user.id);
    const isBotAdmins = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

    if (!isBotAdmins) {
      return m.reply('*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND.*');
    }

    if (!text) {
      return m.reply(`*📛 ENTER THE NUMBER YOU WANT TO INVITE TO THE GROUP*\n\nExample:\n*${prefix + cmd}* 919142294671`);
    }

    if (text.includes('+')) {
      return m.reply(`Enter the number together without *+*`);
    }

    if (isNaN(text)) {
      return m.reply(`Enter only the numbers plus your country code without spaces`);
    }

    const group = m.from;
    const link = 'https://chat.whatsapp.com/' + await gss.groupInviteCode(group);

    await gss.sendMessage(`${text}@s.whatsapp.net`, { 
      text: `≡ *GROUP INVITATION*\n\nA user invites you to join this group \n\n${link}`, 
      mentions: [m.sender]
    });

    m.reply(`An invite link is sent to the user`);
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default invite;
