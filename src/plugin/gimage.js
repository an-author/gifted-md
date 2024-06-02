import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import google from 'google-it';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const imageCommand = async (m, gss, config) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['img', 'image', 'gimage'];

   if (validCommands.includes(cmd)) {
    if (!args) {
      return m.reply(`Usage: ${prefix + cmd} <search_query>\nExample: ${prefix + cmd} cats`);
    }

    try {
      const results = await google({ query: args, noDisplay: true, includeImages: true });
      const images = results.slice(0, 5); // Get the top 5 images

      if (images.length === 0) {
        return m.reply('No images found for your search query.');
      }

      for (const image of images) {
        const response = await axios.get(image.link, { responseType: 'arraybuffer' });
        const filePath = path.join(__dirname, `temp_${Date.now()}.jpg`);
        await writeFile(filePath, response.data);

        await gss.sendMessage(m.from, { image: { url: filePath }, caption: image.title || '' }, { quoted: m });
        await unlink(filePath); // Clean up the temporary file
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      await m.reply('Error fetching images.');
    }
  }
};

export default imageCommand;
