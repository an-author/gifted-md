import { UploadFileUgu, TelegraPh } from '../uploader.js';
import { writeFile, unlink } from 'fs/promises';
import util from 'util';

const tourl = async (m, gss) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['tourl','url'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`Send/Reply with an image to set your profile picture ${prefix + cmd}`);
    }

    try {
      const media = await m.quoted.download(); // Download the media from the quoted message
      if (!media) throw new Error('Failed to download media.');

      const filePath = `./${Date.now()}.jpg`; // Save the media with .jpg extension
      await writeFile(filePath, media);

      let response;
      if (/^image\//.test(m.quoted.mimetype)) {
        response = await TelegraPh(filePath); // Pass the file path to TelegraPh
      } else {
        response = await UploadFileUgu(filePath); // Pass the file path to UploadFileUgu
      }

      const imageUrl = response.url || response; // Extract the URL from the response

      const message = {
        image: { url: imageUrl },
        caption: `hey ${m.pushName} Here Is Your Image Url: ${imageUrl}`,
      };

      await gss.sendMessage(m.from, message, { quoted:m }); // Send the image with the URL as the caption
      await unlink(filePath); // Delete the downloaded media file
    } catch (error) {
      console.error('Error processing media:', error);
      m.reply('Error processing media.');
    }
  }
};

export default tourl;
