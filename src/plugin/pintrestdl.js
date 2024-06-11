import fetch from 'node-fetch';
import scrapePinterest from 'scrape-pinterest';

const supportedDomains = ['pinterest.com', 'pin.it'];

const pinterestDl = async (m, Matrix) => {

  const text = m.body.trim();
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (!['pintrestdl', 'pntdl'].includes(cmd)) return;


  try {
    const urlObj = new URL(text);
    const domain = urlObj.hostname.replace('www.', '');

    if (supportedDomains.some(d => domain.includes(d))) {
      const result = await scrapePinterest.scrape(text);

      if (result && result.pins && result.pins.length > 0) {
        const media = result.pins[0]; 
        const mediaUrl = media.images.orig.url;  
        const extension = mediaUrl.split('.').pop().toLowerCase();
        const caption = `> © Powered By Ethix-MD`;

        await Matrix.sendMedia(m.from, mediaUrl, extension, caption, m);
        await m.React('✅');
      } else {
        throw new Error('No media found in the Pinterest URL.');
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

export default pinterestDl;
