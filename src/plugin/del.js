import config from '../../config.cjs'

const deleteMessage = async (m, gss) => {
  
  const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
  const botNumber = await gss.decodeJid(gss.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['del', 'delete'];

   if (validCommands.includes(cmd)) {
     if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
        if (!m.quoted) return m.reply('Pʟᴇᴀsᴇ ᴍᴇɴᴛɪᴏɴ ᴀ ᴍᴇssᴀɢᴇ');
        let { from, id } = m.quoted;

        const key = {
            remoteJid: m.from,
            id: m.quoted.id,
            participant: m.quoted.sender
        };

        await gss.sendMessage(m.from, { delete: key });
  }
};

export default deleteMessage;
