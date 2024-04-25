const ping = async (m, sock) => {
const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
if (cmd === "ping") {

 const startTime = new Date();
 const { key } = await sock.sendMessage(m.from, { text: 'Pinging...' }, {quoted: m});
 await m.React('🚀')
 const text = `*_Bot Speed: ${new Date() - startTime} ms_*`
 await sock.relayMessage(m.from, {
      protocolMessage: {
        key: key,
        type: 14,
        editedMessage: {
          conversation: text
        }
      }
    }, {});
 await m.React('⚡')
}}


ping.type = 'main';
ping.desc = 'check bot response';

export default ping;
