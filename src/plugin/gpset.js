const groupSetting = async (m, gss) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['group'];
    if (!validCommands.includes(cmd)) return;

    if (!m.isGroupMsg) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");
    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botNumber = await gss.decodeJid(gss.user.id);
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (!botAdmin) return m.reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");
    if (!senderAdmin) return m.reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");

    const args = m.body.slice(prefix.length + cmd.length).trim().split(/\s+/);
    if (args.length < 1) return m.reply(`Please specify a setting (on/off).\n\nExample:\n*${prefix + cmd} on* or *${prefix + cmd} off*`);

    const groupSetting = args[0].toLowerCase();

    if (groupSetting === 'off') {
      await gss.groupSettingUpdate(m.from, 'announcement')
        .then(() => m.reply("Group successfully closed."))
        .catch(err => m.reply(`Error: ${JSON.stringify(err)}`));
    } else if (groupSetting === 'on') {
      await gss.groupSettingUpdate(m.from, 'not_announcement')
        .then(() => m.reply("Group successfully opened."))
        .catch(err => m.reply(`Error: ${JSON.stringify(err)}`));
    } else {
      m.reply(`Invalid setting. Use "on" to open the group and "off" to close the group.\n\nExample:\n*${prefix + cmd} on* or *${prefix + cmd} off*`);
    }
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default groupsetting;
