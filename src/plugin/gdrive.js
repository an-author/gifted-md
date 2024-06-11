import pkg from "nayan-media-downloader";
const { GDLink } = pkg;

const gdriveDownload = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gdrive', 'gd', 'gddownload'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a Google Drive URL.');

    try {
      await m.React('🕘');

      const gdriveUrl = text;
      const gdriveInfo = await GDLink(gdriveUrl);

      if (gdriveInfo && gdriveInfo.link) {
        const mediaUrl = gdriveInfo.link;
        const mimeType = gdriveInfo.mime;
        const caption = `> © Powered By Ethix-Xsid\n> File: ${gdriveInfo.name}\n> Size: ${gdriveInfo.size}\n> Date: ${gdriveInfo.date}`;

        if (mimeType.startsWith('image/')) {
          await Matrix.sendMessage(m.from, { image: { url: mediaUrl }, caption: caption }, { quoted: m });
        } else if (mimeType.startsWith('video/')) {
          await Matrix.sendMessage(m.from, { video: { url: mediaUrl }, caption: caption }, { quoted: m });
        } else if (mimeType.startsWith('audio/')) {
          await Matrix.sendMessage(m.from, { audio: { url: mediaUrl }, caption: caption }, { quoted: m });
        } else {
          await Matrix.sendMessage(m.from, { document: { url: mediaUrl }, fileName: gdriveInfo.name, caption: caption }, { quoted: m });
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid response from Google Drive.');
      }
    } catch (error) {
      console.error('Error downloading Google Drive file:', error.message);
      m.reply('Error downloading Google Drive file.');
      await m.React('❌');
    }
  }
};

export default gdriveDownload;
