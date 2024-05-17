import ytdl from 'ytdl-core'
import yts from 'yt-search'

const video = async (m, Matrix) => {
const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
  if (command == 'video') {
  
    if (!text) return m.reply('give a YT URL or search query');	 
 
try {
    await m.React("🕘");

    // Check if the input is a valid YouTube URL
    const isUrl = ytdl.validateURL(text);
await m.React("⬇️");
    if (isUrl) {
      // If it's a URL, directly use ytdl-core for audio and video
      const videoStream = ytdl(text, { filter: 'audioandvideo', quality: 'highest' });

      const videoBuffer = [];

      videoStream.on('data', (chunk) => {
        videoBuffer.push(chunk);
      });

      videoStream.on('end', async () => {
        try {
          const finalVideoBuffer = Buffer.concat(videoBuffer);

          const videoInfo = await yts({ videoId: ytdl.getURLVideoID(text) });
          const thumbnailMessage = {
  image: {
    url: videoInfo.thumbnail,
  },
  caption: `
╭──═❮ *YouTube Player* ✨ ❯═─┈•
│✑ *Title:* ${videoInfo.title}
│✑ *duration:* ${videoInfo.timestamp}
│✑ *Uploaded* ${videoInfo.ago}
│✑ *Uploader:* ${videoInfo.author.name}
╰────────────────❃ 
`, 
};
          await Matrix.sendMessage(m.from, thumbnailMessage, { quoted: m });
          await Matrix.sendMessage(m.from, { video: finalVideoBuffer, mimetype: 'video/mp4', caption: 'Downloaded by Ethix Bot' });
          await m.React("✅");
        } catch (err) {
          console.error('Error sending video:', err);
          m.reply('Error sending video.');
          await m.React("❌");
        }
      });
    } else {
      // If it's a search query, use yt-search for video
      const searchResult = await yts(text);
      const firstVideo = searchResult.videos[0];
await m.React("⬇️");
      if (!firstVideo) {
        m.reply('Video not found.');
        await m.React("❌");
        return;
      }

      const videoStream = ytdl(firstVideo.url, { filter: 'audioandvideo', quality: 'highest' });

      const videoBuffer = [];

      videoStream.on('data', (chunk) => {
        videoBuffer.push(chunk);
      });

      videoStream.on('end', async () => {
        try {
          const finalVideoBuffer = Buffer.concat(videoBuffer);
          const thumbnailMsg = {
  image: {
    url: firstVideo.thumbnail,
  },
  caption: `
╭──═❮ *YouTube Player* ✨ ❯═─┈•
│✑ *Title:* ${firstVideo.title}
│✑ *duration:* ${firstVideo.timestamp}
│✑ *Uploaded* ${firstVideo.ago}
│✑ *Uploader:* ${firstVideo.author.name}
╰────────────────❃ 
`, 
};
          await Matrix.sendMessage(m.from, thumbnailMsg, { quoted: m });
          await Matrix.sendMessage(m.from, { video: finalVideoBuffer, mimetype: 'video/mp4', caption: 'Downloaded my Ethix Bot' });
          await m.React("✅");
        } catch (err) {
          console.error('Error sending video:', err);
          m.reply('Error sending video.');
          await m.React("❌");
        }
      });
    }
} catch (error) {
        console.error("Error generating response:", error);
    }
}}

export default video;