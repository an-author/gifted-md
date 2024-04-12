const ytdl = require('ytdl-core');
const yts = require('yt-search');
const videoSearchResults = new Map();

const playHandler = async (m, gss, args) => {
    try {
        const body = typeof m.text === 'string' ? m.text : '';
        const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : '/';
        const isCmd = body.startsWith(prefix);

        if (isCmd) {
            const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();
            const commandArgs = body.trim().split(/ +/).slice(1);

            switch (command) {
                case 'play':
                  const text = commandArgs.join(' ');
                    if (!text) return m.reply('Enter Search Query!');

                    try {
                        const searchResults = await yts(text);

                        if (!searchResults.videos || searchResults.videos.length === 0) {
                            return m.reply('No search results found.');
                        }

                        const resultsArray = searchResults.videos.slice(0, 5).map((result, index) => {
                            const { url, title, duration, views, author, timestamp } = result;
                            const uniqueKey = title.toLowerCase().replace(/\s/g, '_');
                            videoSearchResults.set(`${m.chat}_${index}`, { uniqueKey, url, title, duration, views, author, timestamp });
                            return { index, title, duration, views, author, timestamp };
                        });

                        currentPollIndex = 0;

                        const pollOptions = ['𝗔𝗨𝗗𝗜𝗢', '𝗔𝗨𝗗𝗜𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧', '𝗩𝗜𝗗𝗘𝗢', '𝗩𝗜𝗗𝗘𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧', '𝗡𝗘𝗫𝗧'];

                        await gss.sendPoll(
                            m.chat,
                            `Choose an option:\n\n"${resultsArray[currentPollIndex].title}":\nDuration: ${resultsArray[currentPollIndex].duration}\nViews: ${resultsArray[currentPollIndex].views}\nAuthor: ${resultsArray[currentPollIndex].author}\nUpload Date: ${resultsArray[currentPollIndex].timestamp}`,
                            pollOptions
                        );
                    } catch (error) {
                        console.error('Error during play:', error);
                        m.reply('Unexpected error occurred. please vote on next and try again');
                    }
                    break;

                case '𝗔𝗨𝗗𝗜𝗢':
                case '𝗩𝗜𝗗𝗘𝗢':
                case '𝗔𝗨𝗗𝗜𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧':
                case '𝗩𝗜𝗗𝗘𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧':
                case '𝗡𝗘𝗫𝗧':
                    const pollOption = command.toLowerCase();

                    if (!videoSearchResults.has(`${m.chat}_${currentPollIndex}`)) {
                        return m.reply('No search results found.');
                    }

                    const currentResult = videoSearchResults.get(`${m.chat}_${currentPollIndex}`);

                    switch (pollOption) {
                        case '𝗔𝗨𝗗𝗜𝗢':
                            try {
                                const audioStream = ytdl(currentResult.url, { quality: 'highestaudio', filter: 'audioonly' });
                                const audioBuffer = await new Promise((resolve, reject) => {
                                    const chunks = [];
                                    audioStream.on('data', (chunk) => chunks.push(chunk));
                                    audioStream.on('end', () => resolve(Buffer.concat(chunks)));
                                    audioStream.on('error', (error) => reject(error));
                                });

                                await gss.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mp4', fileName: `${currentResult.title}.mp3` }, { quoted: m });
                            } catch (error) {
                                console.error(`Error during audio download:`, error);
                                m.reply('Unexpected error occurred.please vote on next and try again');
                            }
                            break;

                        case '𝗔𝗨𝗗𝗜𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧':
                            try {
                                const audioStream = ytdl(currentResult.url, { quality: 'highestaudio', filter: 'audioonly' });
                                const audioBuffer = await new Promise((resolve, reject) => {
                                    const chunks = [];
                                    audioStream.on('data', (chunk) => chunks.push(chunk));
                                    audioStream.on('end', () => resolve(Buffer.concat(chunks)));
                                    audioStream.on('error', (error) => reject(error));
                                });

                                await gss.sendMessage(m.chat, { document: audioBuffer, mimetype: 'audio/mp3', fileName: `${currentResult.title}.mp3` }, { quoted: m });
                            } catch (error) {
                                console.error(`Error during audio download:`, error);
                                m.reply('Unexpected error occurred.please vote on next and try again');
                            }
                            break;

                        case '𝗩𝗜𝗗𝗘𝗢':
                            try {
                                const videoStream = ytdl(currentResult.url, { quality: 'highest', filter: 'audioandvideo' });
                                const videoBuffer = await new Promise((resolve, reject) => {
                                    const chunks = [];
                                    videoStream.on('data', (chunk) => chunks.push(chunk));
                                    videoStream.on('end', () => resolve(Buffer.concat(chunks)));
                                    videoStream.on('error', (error) => reject(error));
                                });

                                await gss.sendMessage(m.chat, { video: videoBuffer, mimetype: 'video/mp4', caption: `Downloading video: ${currentResult.title}` }, { quoted: m });
                            } catch (error) {
                                console.error(`Error during video download:`, error);
                                m.reply('Unexpected error occurred.please vote on next and try again');
                            }
                            break;

                        case '𝗩𝗜𝗗𝗘𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧':
                            try {
                                const videoStream = ytdl(currentResult.url, { quality: 'highest', filter: 'audioandvideo' });
                                const videoBuffer = await new Promise((resolve, reject) => {
                                    const chunks = [];
                                    videoStream.on('data', (chunk) => chunks.push(chunk));
                                    videoStream.on('end', () => resolve(Buffer.concat(chunks)));
                                    videoStream.on('error', (error) => reject(error));
                                });

                                await gss.sendMessage(m.chat, { document: videoBuffer, mimetype: 'video/mp4', fileName: `${currentResult.title}.mp4`, caption: `Downloading video: ${currentResult.title}` }, { quoted: m });
                            } catch (error) {
                                console.error(`Error during video download:`, error);
                                m.reply('Unexpected error occurred.please vote on next and try again');
                            }
                            break;

                        case '𝗡𝗘𝗫𝗧':
                          
                            currentPollIndex++;
                            if (videoSearchResults.has(`${m.chat}_${currentPollIndex}`)) {
                                const nextResult = videoSearchResults.get(`${m.chat}_${currentPollIndex}`);

                                const pollOptions = ['𝗔𝗨𝗗𝗜𝗢', '𝗔𝗨𝗗𝗜𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧', '𝗩𝗜𝗗𝗘𝗢', '𝗩𝗜𝗗𝗘𝗢𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧', '𝗡𝗘𝗫𝗧'];

                                await gss.sendPoll(
                                    m.chat,
                                    `Choose an option:\n\n"${nextResult.title}":\nDuration: ${nextResult.duration}\nViews: ${nextResult.views}\nAuthor: ${nextResult.author}\nUpload Date: ${nextResult.timestamp}`,
                                    pollOptions
                                );
                            } else {
                                m.reply('No more search results available.');
                            }
                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }
        }
    } catch (error) {
        console.error('Error during play:', error);
        m.reply('Unexpected error occurred. Please try again later.');
    }
};

module.exports = playHandler;
