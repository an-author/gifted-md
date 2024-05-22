import { TelegraPh } from '../uploader.js'; // Ensure this import statement is correct
import { writeFile, unlink } from 'fs/promises';
import { remini } from 'betabotz-tools';

const tourl = async (m, gss) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['remini', 'hd', 'hdr', 'enhance', 'upscale'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`*Send/Reply with an image to enhance your picture quality ${prefix + cmd}*`);
    }

    try {
      const media = await m.quoted.download(); // Download the media from the quoted message
      if (!media) throw new Error('Failed to download media.');

      const filePath = `./${Date.now()}.jpg`; // Save the media with .jpg extension
      await writeFile(filePath, media);

      let response;
      try {
        response = await TelegraPh(filePath); // Pass the file path to TelegraPh
        console.log('TelegraPh response:', response);
      } catch (uploadError) {
        console.error('Error uploading to TelegraPh:', uploadError);
        throw new Error('Failed to upload media to TelegraPh.');
      }

      const mediaUrl = response.url || response; // Extract the URL from the response
      if (!mediaUrl) throw new Error('Failed to get media URL from TelegraPh.');

      let enhancedImageUrl;
      try {
        const reminiResponse = await remini(mediaUrl); // Enhance the image using remini
        console.log('Remini response:', reminiResponse);
        enhancedImageUrl = reminiResponse.image_data; // Extract the enhanced image URL
      } catch (reminiError) {
        console.error('Error enhancing image with remini:', reminiError);
        throw new Error('Failed to enhance the image.');
      }

      if (!enhancedImageUrl) throw new Error('Failed to get enhanced image URL.');

      const message = {
        image: { url: enhancedImageUrl },
        caption: `> Hey ${m.pushName}, here is your enhanced image\nURL: ${enhancedImageUrl}`,
      };

      await gss.sendMessage(m.from, message, { quoted: m }); // Send the enhanced image with the URL as the caption
      await unlink(filePath); // Delete the downloaded media file
    } catch (error) {
      console.error('Error processing media:', error);
      m.reply('Error processing media.');
    }
  }
};

export default tourl;
