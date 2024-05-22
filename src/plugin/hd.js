import { TelegraPh } from '../uploader.js';
import { writeFile, unlink } from 'fs/promises';
import { remini } from 'betabotz-tools';

const tourl = async (m, gss) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['remini', 'hd', 'hdr', 'enhance'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`Send/Reply with an image to set your profile picture ${prefix + cmd}`);
    }

    try {
      const media = await m.quoted.download(); 
      if (!media) throw new Error('Failed to download media.');

      const filePath = `./${Date.now()}.jpg`; 
      await writeFile(filePath, media);

      let response;
      try {
        response = await TelegraPh(filePath);
      } catch (error) {
        throw new Error('Failed to upload media to TelegraPh.');
      }

      const mediaUrl = response.url || response;
      if (!mediaUrl) throw new Error('Failed to get media URL from TelegraPh.');

      let enhancedImageUrl;
      try {
        const reminiResponse = await remini(mediaUrl);
        enhancedImageUrl = reminiResponse.url || reminiResponse;
      } catch (error) {
        throw new Error('Failed to get enhanced image URL.');
      }

      const message = {
        image: { url: enhancedImageUrl },
        caption: `> Hey ${m.pushName}, Here Is Your Enhanced Image\n*URL:*  ${enhancedImageUrl}`,
      };

      await gss.sendMessage(m.from, message, { quoted: m });
      await unlink(filePath);
    } catch (error) {
      console.error('Error processing media:', error);
      m.reply('Error processing media.');
    }
  }
};

export default tourl;
