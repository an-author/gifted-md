const alive = async (m, sock) => {
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
  if (cmd === "alive") {
    const text = `𝐇𝐞𝐲 👋 𝐈 𝐚𝐦 𝐀𝐥𝐢𝐯𝐞 𝐧𝐨𝐰`;
    const audtxt = `Hey ${m.pushName} don't worry i am Alive now`
    const speechURL = `https://matrix-anime-api-production.up.railway.app/speech?text=${encodeURIComponent(audtxt)}`;
    const img = 'https://i.imgur.com/eHhCPbU.jpg'
    await m.React('👋');
    let doc = {
        audio: {
          url: speechURL
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Matrix",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: text,
          body: "Ethix-MD",
          thumbnailUrl: img,
          sourceUrl: 'https://matrixcoder.tech',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };
    let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `Ethix-MD`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
    };

    await sock.sendMessage(m.from, doc, { quoted: fgg })
  }
};

alive.type = "main";
alive.desc = "*_This Command Is For Check Bot Online or Not_*"

export default alive;