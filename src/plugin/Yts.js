import yts from 'yt-search';
import ytdl from 'ytdl-core';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fs from 'fs';
import os from 'os';

// Use a global variable to store the topVideos
let topVideos = [];

const song = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
    }
  }

  const selectedId = selectedListId || selectedButtonId;

  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['yts', 'ytsearch', 'play', 'play2'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a YouTube URL or search query');

    try {
      await m.React("🕘");

      // Search YouTube for the provided query
      const searchResult = await yts(text);
      topVideos = searchResult.videos.slice(0, 10);

      if (topVideos.length === 0) {
        m.reply('No results found.');
        await m.React("❌");
        return;
      }

      const buttons = topVideos.map((video, index) => ({
        "header": "",
        "title": video.title,
        "description": ``,
        "id": video.title // Use video title as ID
      }));

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Ethix-MD Video Downloader\n\n🔍 Search and download your favorite YouTube videos easily.\n\n🎵 Download audio or video with a single click.\n\n📌 Simply select a video from the list below to get started.`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "© Powered By Ethix-MD"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: `https://uploadimage.org/i/Untitled69-2.jpg` } }, { upload: Matrix.waUploadToServer })),
                title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🔖 Select a video",
                      sections: [
                        {
                          title: "😎 Top 10 YouTube Results",
                          highlight_label: "🤩 Top 10",
                          rows: buttons
                        }
                      ]
                    })
                  },
                ],
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363222395675670@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });
      await m.React("✅");
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { // Check if selectedId exists
    const selectedVideo = topVideos.find(video => video.title === selectedId); // Find video by title

    if (selectedVideo) {
      const videoInfo = await ytdl.getBasicInfo(selectedVideo.videoId);
      const title = videoInfo.videoDetails.title;
      const author = videoInfo.videoDetails.author.name;
      const duration = videoInfo.videoDetails.lengthSeconds;
      const uploadDate = videoInfo.videoDetails.uploadDate;
      const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.videoId}`;
      const thumbnailUrl = selectedVideo.thumbnail; // Get the thumbnail URL from search results

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Title: ${title}\nAuthor: ${author}\nDuration: ${duration} seconds\nUpload Date: ${uploadDate}`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "© Powered By Ethix-MD"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
                title: `Video Information`,
                subtitle: `Video by ${author}`,
                hasMediaAttachment: false
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "quick_reply",
                    buttonParamsJson: `{\"display_text\":\"Download Audio\",\"id\":\".song ${videoUrl}\"}`
                  },
                  {
                    name: "quick_reply",
                    buttonParamsJson: `{\"display_text\":\"Download Video\",\"id\":\".video ${videoUrl}\"}`
                  }
                ],
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363222395675670@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
            })
          }
        }
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });
    }
  }
};

export default song;
