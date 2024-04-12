const ytdl = require('ytdl-core');
const yts = require('yt-search');
const videoSearchResults = new Map();
let optionIndex = 1;

const ytsHandler = async (m, gss, args) => {
    try {
        const body = typeof m.text === 'string' ? m.text : '';
        const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : '/';
        const isCmd = body.startsWith(prefix);

        if (isCmd) {
            const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();
            const text = body.trim().split(/ +/).slice(1).join(' ');
            

            switch (command) {
                case 'yts':
                case 'ytsearch': {
                    if (!text) {
                        return m.reply('Enter YouTube Video Link or Search Query!');
                    }

                    const results = await yts(text);

                    if (results.videos.length > 0) {
                        let pollOptions = [];
                        const uniqueKey = `yts_${optionIndex}`;
                        const urlObject = {};

                        for (let i = 0; i < Math.min(5, results.videos.length); i++) {
                            const result = results.videos[i];
                            const videoUrl = result.url;
                            const title = result.title;

                            urlObject[`${optionIndex}.${i + 1}`] = videoUrl;
                            pollOptions.push(`𝐩𝐥𝐚𝐲 ${optionIndex}.${i + 1} ${title}`);
                        }

                        if (!videoSearchResults.has(uniqueKey)) {
                            videoSearchResults.set(uniqueKey, {});
                        }

                        videoSearchResults.set(uniqueKey, Object.assign(videoSearchResults.get(uniqueKey), urlObject));

                        await gss.sendPoll(m.chat, 'Choose a video to download:', [...pollOptions]);

                        optionIndex += 1;
                    } else {
                        return m.reply('No search results found.');
                    }
                    break;
                }

                case '𝐩𝐥𝐚𝐲': {
                    if (!text) {
                        return m.reply('Please specify the video you want to play. Use the format: play [unique-key]');
                    }

                    const match = text.match(/(\d+)\.(\d+)/);

                    if (!match) {
                        return m.reply('Invalid format. Please provide a valid unique key (e.g., 1.1)');
                    }

                    const optionIndex = parseInt(match[1]);
                    const subOption = parseInt(match[2]);

                    const uniqueKey = `yts_${optionIndex}`;

                    if (videoSearchResults.has(uniqueKey)) {
                        const selectedUrl = videoSearchResults.get(uniqueKey)[`${optionIndex}.${subOption}`];

                        if (selectedUrl) {
                            try {
                                const videoInfo = await ytdl.getInfo(selectedUrl);
                                const title = videoInfo.title || (videoInfo.videoDetails && videoInfo.videoDetails.title) || 'N/A';
                                const uploadDate = formatUploadDate(videoInfo.videoDetails.uploadDate) || 'N/A'; 
                                const pollMessage = `
╭═════════•∞•══╮
│⿻ *GSS BOTWA*
│  *Youtube Mp4 Player* ✨
│⿻ *Title:* ${title}
│⿻ *Author:* ${videoInfo.videoDetails.author.name || 'N/A'}
│⿻ *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
│⿻ *Views:* ${videoInfo.videoDetails.viewCount.toLocaleString() || 'N/A'}
│⿻ *Upload Date:* ${uploadDate}
╰══•∞•═════════╯
`;

                                await gss.sendPoll(m.chat, pollMessage, [
                                    `𝐀𝐮𝐝𝐢𝐨 ${optionIndex}.${subOption}`,
                                    `𝐕𝐢𝐝𝐞𝐨 ${optionIndex}.${subOption}`,
                                    `𝐀𝐮𝐝𝐢𝐨𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭 ${optionIndex}.${subOption}`,
                                    `𝐕𝐢𝐝𝐞𝐨𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭 ${optionIndex}.${subOption}`
                                ]);
                            } catch (error) {
                                console.error('Error during poll creation:', error);
                                return m.reply('Unexpected error occurred during poll creation.');
                            }
                        } else {
                            return m.reply('Invalid sub-option. Please choose a valid sub-option.');
                        }
                    } else {
                        return m.reply('Invalid unique key. Please provide a valid unique key.');
                    }
                    break;
                }
                
                case '𝐀𝐮𝐝𝐢𝐨': {
  if (!text) {
    return m.reply('Please specify the unique key for audio playback. Use the format: audio [unique-key]');
    doReact("❌");
  }

  const match = text.match(/(\d+)\.(\d+)/);

  if (!match) {
    return m.reply('Invalid format. Please provide a valid unique key (e.g., 1.1)');
    doReact("❌");
  }

  const optionIndex = parseInt(match[1]);
  const subOption = parseInt(match[2]);

  const uniqueKey = `yts_${optionIndex}`;

  if (videoSearchResults.has(uniqueKey)) {
    const selectedUrl = videoSearchResults.get(uniqueKey)[`${optionIndex}.${subOption}`];

    if (selectedUrl) {
      try {
        // Fetch video info for additional details
        const videoInfo = await ytdl.getInfo(selectedUrl);

        // Get the video thumbnail
        const thumbnailUrl = videoInfo.videoDetails.thumbnails[0].url;

const title = videoInfo.title || (videoInfo.videoDetails && videoInfo.videoDetails.title) || 'N/A';
const uploadDate = formatUploadDate(videoInfo.videoDetails.uploadDate) || 'N/A'; 
        // Construct caption with audio details
        const caption = `
╭═════════•∞•══╮
│⿻ *GSS BOTWA*
│  *Youtube Mp4 Player* ✨
│⿻ *Title:* ${title}
│⿻ *Author:* ${videoInfo.videoDetails.author.name || 'N/A'}
│⿻ *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
│⿻ *Views:* ${videoInfo.videoDetails.viewCount.toLocaleString() || 'N/A'}
│⿻ *Upload Date:* ${uploadDate}
╰══•∞•═════════╯
`;

        // Fetch audio stream directly
        const audioStream = ytdl(selectedUrl, { quality: 'highestaudio', filter: 'audioonly' });

        // Convert the stream to buffer for sending
        const audioBuffer = await streamToBuffer(audioStream);

        // Send the thumbnail as an image along with audio info
        await gss.sendMessage(m.chat, {
          image: {
            url: thumbnailUrl,
          },
          caption: caption,
        }, {
          quoted: m,
        });

        // Send the audio as a voice message
        await gss.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg' });
        await doReact("✅");
      } catch (error) {
        console.error('Error during audio playback:', error);
        return m.reply('Unexpected error occurred during audio playback.');
      }
    } else {
      return m.reply('Invalid sub-option. Please choose a valid sub-option.');
    }
  } else {
    return m.reply('Invalid unique key. Please provide a valid unique key.');
  }
  break;
}



case '𝐀𝐮𝐝𝐢𝐨𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭': {
  if (!text) {
    return m.reply('Please specify the unique key for audio playback. Use the format: audio [unique-key]');
  }

  const match = text.match(/(\d+)\.(\d+)/);

  if (!match) {
    return m.reply('Invalid format. Please provide a valid unique key (e.g., 1.1)');
  }

  const optionIndex = parseInt(match[1]);
  const subOption = parseInt(match[2]);

  const uniqueKey = `yts_${optionIndex}`;

  if (videoSearchResults.has(uniqueKey)) {
    const selectedUrl = videoSearchResults.get(uniqueKey)[`${optionIndex}.${subOption}`];

    if (selectedUrl) {
      try {
        // Fetch video info for additional details
        const videoInfo = await ytdl.getInfo(selectedUrl);

        // Get the video thumbnail
        const thumbnailUrl = videoInfo.videoDetails.thumbnails[0].url;

const title = videoInfo.title || (videoInfo.videoDetails && videoInfo.videoDetails.title) || 'N/A';
const uploadDate = formatUploadDate(videoInfo.videoDetails.uploadDate) || 'N/A'; 
        // Construct caption with audio details
        const caption = `
╭═════════•∞•══╮
│⿻ *GSS BOTWA*
│  *Youtube Mp4 Player* ✨
│⿻ *Title:* ${title}
│⿻ *Author:* ${videoInfo.videoDetails.author.name || 'N/A'}
│⿻ *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
│⿻ *Views:* ${videoInfo.videoDetails.viewCount.toLocaleString() || 'N/A'}
│⿻ *Upload Date:* ${uploadDate}
╰══•∞•═════════╯
`;

        // Fetch audio stream directly
        const audioStream = ytdl(selectedUrl, { quality: 'highestaudio', filter: 'audioonly' });

        // Convert the stream to buffer for sending
        const audioBuffer = await streamToBuffer(audioStream);

        // Send the thumbnail as an image along with audio info
        await gss.sendMessage(m.chat, {
          image: {
            url: thumbnailUrl,
          },
          caption: caption,
        }, {
          quoted: m,
        });

        // Send the audio as a voice message
        await gss.sendMessage(m.chat, {
  document: audioBuffer,
  mimetype: 'audio/mpeg',
  fileName: `${title}.mp3`,
}, { quoted: m });
await doReact("✅");
      } catch (error) {
        console.error('Error during audio playback:', error);
        return m.reply('Unexpected error occurred during audio playback.');
      }
    } else {
      return m.reply('Invalid sub-option. Please choose a valid sub-option.');
    }
  } else {
    return m.reply('Invalid unique key. Please provide a valid unique key.');
  }
  break;
}



case '𝐕𝐢𝐝𝐞𝐨': {
  if (!text) {
    return m.reply('Please specify the unique key for video playback. Use the format: video [unique-key]');
  }

  const match = text.match(/(\d+)\.(\d+)/);

  if (!match) {
    return m.reply('Invalid format. Please provide a valid unique key (e.g., 1.1)');
  }

  const optionIndex = parseInt(match[1]);
  const subOption = parseInt(match[2]);

  const uniqueKey = `yts_${optionIndex}`;

  if (videoSearchResults.has(uniqueKey)) {
    const selectedUrl = videoSearchResults.get(uniqueKey)[`${optionIndex}.${subOption}`];

    if (selectedUrl) {
      try {
        // Fetch video info for additional details
        const videoInfo = await ytdl.getInfo(selectedUrl);

        // Get the video thumbnail
        const thumbnailUrl = videoInfo.videoDetails.thumbnails[0].url;

        // Construct caption with video details
        const title = videoInfo.title || (videoInfo.videoDetails && videoInfo.videoDetails.title) || 'N/A';
        const uploadDate = formatUploadDate(videoInfo.videoDetails.uploadDate) || 'N/A'; 

const captionText = `
╭═════════•∞•══╮
│⿻ *GSS BOTWA*
│  *Youtube Mp4 Player* ✨
│⿻ *Title:* ${title}
│⿻ *Author:* ${videoInfo.videoDetails.author.name || 'N/A'}
│⿻ *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
│⿻ *Views:* ${videoInfo.videoDetails.viewCount.toLocaleString() || 'N/A'}
│⿻ *Upload Date:* ${uploadDate}
╰══•∞•═════════╯
`;


        // Download audio and video together using 'videoandaudio' filter
        const videoAndAudioStream = ytdl(selectedUrl, { quality: 'highest', filter: 'audioandvideo' });

        // Convert the stream to buffer
        const videoAndAudioBuffer = await streamToBuffer(videoAndAudioStream);

        // Send the video and audio as a media message with caption
        await gss.sendMessage(m.chat, {
          video: videoAndAudioBuffer,
          mimetype: 'video/mp4',
          caption: captionText,
        }, { quoted: m });
        
      } catch (error) {
        console.error('Error during video playback:', error);
        return m.reply('Unexpected error occurred during video playback.');
      }
    } else {
      return m.reply('Invalid sub-option. Please choose a valid sub-option.');
    }
  } else {
    return m.reply('Invalid unique key. Please provide a valid unique key.');
  }
  break;
}

case '𝐕𝐢𝐝𝐞𝐨𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭': {
  if (!text) {
    return m.reply('Please specify the unique key for video playback. Use the format: video [unique-key]');
  }

  const match = text.match(/(\d+)\.(\d+)/);

  if (!match) {
    return m.reply('Invalid format. Please provide a valid unique key (e.g., 1.1)');
  }

  const optionIndex = parseInt(match[1]);
  const subOption = parseInt(match[2]);

  const uniqueKey = `yts_${optionIndex}`;

  if (videoSearchResults.has(uniqueKey)) {
    const selectedUrl = videoSearchResults.get(uniqueKey)[`${optionIndex}.${subOption}`];

    if (selectedUrl) {
      try {
        // Fetch video info for additional details
        const videoInfo = await ytdl.getInfo(selectedUrl);

        // Get the video thumbnail
        const thumbnailUrl = videoInfo.videoDetails.thumbnails[0].url;

        // Construct caption with video details
        const title = videoInfo.title || (videoInfo.videoDetails && videoInfo.videoDetails.title) || 'N/A';
        const uploadDate = formatUploadDate(videoInfo.videoDetails.uploadDate) || 'N/A'; 

const captionText = `
 *Video In Document* ✨
 *Title:* ${title}
 *Author:* ${videoInfo.videoDetails.author.name || 'N/A'}
 *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
 *Views:* ${videoInfo.videoDetails.viewCount.toLocaleString() || 'N/A'}
*Upload Date:* ${uploadDate}
`;


        // Download audio and video together using 'videoandaudio' filter
        const videoAndAudioStream = ytdl(selectedUrl, { quality: 'highest', filter: 'audioandvideo' });

        // Convert the stream to buffer
        const videoAndAudioBuffer = await streamToBuffer(videoAndAudioStream);

        // Send the video and audio as a media message with caption
        await gss.sendMessage(m.chat, {
  document: videoAndAudioBuffer,
  mimetype: 'video/mp4',
  fileName: `${title}.mp4`,
  caption: captionText,
}, { quoted: m });
      } catch (error) {
        console.error('Error during video playback:', error);
        return m.reply('Unexpected error occurred during video playback.');
      }
    } else {
      return m.reply('Invalid sub-option. Please choose a valid sub-option.');
    }
  } else {
    return m.reply('Invalid unique key. Please provide a valid unique key.');
  }
  break;
}


                default:
                    return m.reply('Invalid command.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return m.reply('An error occurred.');
    }
};

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}



function formatUploadDate(uploadDate) {
    const date = new Date(uploadDate);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

module.exports = ytsHandler;
