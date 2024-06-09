const handleCommand = async (m, sock, antilinkSettings) => {
    const PREFIX = /^[\\/!#.]/;
    const isCOMMAND = (body) => PREFIX.test(body);
    const prefixMatch = isCOMMAND(m.body) ? m.body.match(PREFIX) : null;
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const args = m.body.slice(prefix.length + cmd.length).trim().split(' ');

    const groupMetadata = await sock.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botNumber = await sock.decodeJid(sock.user.id);
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (cmd === 'antilink') {
        const action = args[0] ? args[0].toLowerCase() : '';

        if (!m.isGroup) {
            await sock.sendMessage(m.from, { text: 'This command can only be used in groups.' }, { quoted: m });
            return;
        }

        if (!botAdmin) {
            await sock.sendMessage(m.from, { text: 'The bot needs to be an admin to manage the antilink feature.' }, { quoted: m });
            return;
        }

        if (action === 'on') {
            if (senderAdmin) {
                antilinkSettings[m.from] = true;
                await sock.sendMessage(m.from, { text: 'Antilink feature has been enabled for this chat.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.from, { text: 'Only admins can enable the antilink feature.' }, { quoted: m });
            }
            return;
        }

        if (action === 'off') {
            if (senderAdmin) {
                antilinkSettings[m.from] = false;
                await sock.sendMessage(m.from, { text: 'Antilink feature has been disabled for this chat.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.from, { text: 'Only admins can disable the antilink feature.' }, { quoted: m });
            }
            return;
        }

        await sock.sendMessage(m.from, { text: `Usage: ${prefix + cmd} on\n${prefix + cmd} off` }, { quoted: m });
        return;
    }
};

export default handleCommand;
