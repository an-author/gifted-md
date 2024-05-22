import { TelegraPh } from '../uploader.js';
import { remini } from 'betabotz-tools';

const tourl = async (m, gss) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['remini', 'hd', 'hdr', 'upscale', 'enhance'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`*Send/Reply With an Image to Enhance Your Picture ${prefix + cmd}*`);
    }

    try {
      const media = await m.quoted.download();
      if (!media) throw new Error('Failed to download media.');

      let response;
      try {
        response = await TelegraPh(media); 
        console.log('TelegraPh response:', response);
      } catch (uploadError) {
        console.error('Error uploading to TelegraPh:', uploadError);
        throw new Error('Failed to upload media to TelegraPh.');
      }

      const mediaUrl = response.url || response;
      if (!mediaUrl) throw new Error('Failed to get media URL from TelegraPh.');

      let enhancedImageUrl;
      try {
        const reminiResponse = await remini(mediaUrl);
        console.log('Remini response:', reminiResponse);
        enhancedImageUrl = reminiResponse.image_data; 
      } catch (reminiError) {
        console.error('Error enhancing image with remini:', reminiError);
        throw new Error('Failed to enhance the image.');
      }

      if (!enhancedImageUrl) throw new Error('Failed to get enhanced image URL.');

      const message = {
        image: { url: enhancedImageUrl },
        caption: `> *Hey ${m.pushName}, here is your enhanced image*\nURL: ${enhancedImageUrl}`,
      };

      await gss.sendMessage(m.from, message, { quoted: m }); 
    } catch (error) {
      console.error('Error processing media:', error);
      m.reply('Error processing media.');
    }
  }
};

export default tourl;
