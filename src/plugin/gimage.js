import google from 'google-it';

const imageCommand = async (m, gss, config) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['image', 'img', 'gimage'];

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
        await gss.sendMessage(m.from, { image: { url: image.link }, caption: image.title || '' }, { quoted: m });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      await m.reply('Error fetching images.');
    }
  }
};

export default imageCommand;
