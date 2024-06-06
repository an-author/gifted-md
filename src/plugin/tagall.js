const tagAll = async (m, gss) => {
  try {
    // Ensure the function is async
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    
    // Check for the valid command
    const validCommands = ['tagall'];
    if (!validCommands.includes(cmd)) return;

    // Check if the message is in a group
    if (!m.isGroupMsg) return await m.reply('You can use this command only in groups.');

    // Check if the sender is an admin
    if (!m.isAdmin) return await m.reply('This feature is only for group admins.');

    // Extract the message to be sent
    let message = `乂 *Attention Everyone* 乂\n\n*Message:* ${m.body.slice(prefix.length + cmd.length).trim() || 'no message'}\n\n`;

    const groupMetadata = m.isGroup ? await gss.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''


    for (let participant of participants) {
      message += `❒ @${participant.id.split('@')[0]}\n`;
    }

    await gss.sendTextWithMentions(m.from, message);
  } catch (error) {
    console.error('Error:', error);
    await m.reply('An error occurred while processing the command.');
  }
};

export default tagAll;
