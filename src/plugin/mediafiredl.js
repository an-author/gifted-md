import axios from 'axios';
import pkg from 'mediafire-dl-nimeshofficial';
const { mediafiredl } = pkg;

const mediafireDownload = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['mediafire', 'mf', 'mfdownload'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a MediaFire URL.');

    try {
      await m.React('🕘');

      const mediafireUrl = text;
      const mediafireInfo = await mediafiredl(mediafireUrl);

      if (mediafireInfo && mediafireInfo.link) {
        const mediaUrl = mediafireInfo.link;
        const mimeType = mediafireInfo.mime;
        const caption = `> © Powered By Ethix-Xsid\n> File: ${mediafireInfo.name}\n> Size: ${mediafireInfo.size}\n> Date: ${mediafireInfo.date}`;

        if (mimeType.startsWith('image/')) {
          await Matrix.sendMessage(m.from, { image: { url: mediaUrl }, caption: caption }, { quoted: m });
        } else if (mimeType.startsWith('video/')) {
          await Matrix.sendMessage(m.from, { video: { url: mediaUrl }, caption: caption }, { quoted: m });
        } else if (mimeType.startsWith('audio/')) {
          await Matrix.sendMessage(m.from, { audio: { url: mediaUrl }, caption: caption }, { quoted: m });
        } else {
          await Matrix.sendMessage(m.from, { document: { url: mediaUrl }, fileName: mediafireInfo.name, caption: caption }, { quoted: m });
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid response from MediaFire.');
      }
    } catch (error) {
      console.error('Error downloading MediaFire file:', error.message);
      m.reply('Error downloading MediaFire file.');
      await m.React('❌');
    }
  }
};

export default mediafireDownload;
