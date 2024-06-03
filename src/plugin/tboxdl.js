import axios from 'axios';

const teraboxApiBaseUrl = 'https://teraboxvideodownloader.nepcoderdevs.workers.dev/?url=';

const teraboxDownload = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['terabox', 'tb', 'tbdl', 'teraboxdl', 'tboxdl'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a Terabox URL.');

    try {
      await m.React('🕘');

      const apiUrl = `${teraboxApiBaseUrl}${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result.status && result.data.length > 0) {
        const mediaType = result.data[0].type;
        const mediaUrl = result.data[0].url;
        const caption = "> © Powered By Ethix-Xsid";
        
        if (mediaType === 'image') {
          const sendImage = {
            image: { url: mediaUrl },
            caption: caption,
          };
          await Matrix.sendMessage(m.from, sendImage, { quoted: m });
        } else if (mediaType === 'video') {
          const sendVideo = {
            video: { url: mediaUrl },
            caption: caption,
          };
          await Matrix.sendMessage(m.from, sendVideo, { quoted: m });
        } else {
          throw new Error('Unsupported media type.');
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid response from the downloader.');
      }
    } catch (error) {
      console.error('Error downloading Terabox media:', error.message);
      m.reply('Error downloading Terabox media.');
      await m.React('❌');
    }
  }
};

export default teraboxDownload;
