import fetch from 'node-fetch';

const downloadAndSendMedia = async (m, Matrix) => {
  const text = m.body.trim();

  if (!/^https?:\/\//.test(text)) {
    m.reply('Start the *URL* with http:// or https://');
    return;
  }

  try {
    const supportedDomains = ['youtube.com', 'youtu.be', 'instagram.com', 'facebook.com', 'tiktok.com', 'mediafire.com', 'drive.google.com'];
    const urlObj = new URL(text);
    const domain = urlObj.hostname.replace('www.', '');

    if (config.AUTO_DL && supportedDomains.some(d => domain.includes(d))) {
      const apiUrl = `https://aiodownloader.onrender.com/download?url=${encodeURIComponent(text)}`;
      const res = await fetch(apiUrl);
      const result = await res.json();

      if (result.status && result.data.length > 0) {
        const mediaUrl = result.data[0].url;
        const extension = mediaUrl.split('.').pop().toLowerCase();
        const caption = `> © Powered By Ethix-Xsid`;

        await Matrix.sendMedia(m.from, mediaUrl, extension, caption, m);
        await m.React('✅');
      } else {
        throw new Error('Invalid response from the downloader API.');
      }
    } else {
      m.reply('Invalid command or unsupported domain.');
    }
  } catch (error) {
    console.error('Error downloading and sending media:', error.message);
    m.reply('Error downloading and sending media.');
    await m.React('❌');
  }
};

export default downloadAndSendMedia;
