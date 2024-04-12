const menuHandler = async (message, gss) => {
    try {
       require("dotenv").config();  
       require('../config')

        const botname = 'ETHIX - ＭＤ';

        const cmdAi = ["Ai", "Voiceai", "Bug", "Report", "Gpt", "Dalle", "Remini"];
        const cmdTool = ["Calculator", "Tempmail", "Checkmail", "Info", "Trt", "Tts"];
        const cmdGrup = ["LinkGroup", "Setppgc", "Setname", "Setdesc", "Group", "Gcsetting", "Welcome", "Left", "SetWelcome", "SetLeft", "Editinfo", "Add", "Kick", "HideTag", "Tagall", "Totag", "Tagadmin", "AntiLink", "AntiToxic", "Mute", "Promote", "Demote", "Revoke", "Poll", "Getbio"];
        const cmdDown = ["Apk", "Facebook", "Mediafire", "Pinterestdl", "XnxxSearch", "Xnxxdl", "Gitclone", "Gdrive", "Insta", "Ytmp3", "Ytmp4", "Play", "Song", "Video", "Ytmp3doc", "Ytmp4doc", "Tiktok"];
        const cmdSearch = ["Play", "Yts", "Imdb", "Google", "Gimage", "Pinterest", "Wallpaper", "Wikimedia", "Ytsearch", "Ringtone", "Lyrics"];
        const cmdFun = ["Delttt", "Tictactoe"];
        const cmdConv = ["Removebg", "Sticker", "Emojimix", "Tovideo", "Togif", "Tourl", "Tovn", "Tomp3", "Toaudio", "Ebinary", "dbinary", "Styletext", "Fontchange", "Fancy", "Upscale", "hd", "attp", "attp2", "attp3", "ttp", "ttp2", "ttp3", "ttp4", "ttp5", "qc"];
        const cmdMain = ["Ping", "Alive", "Owner", "Menu", "Infochat", "Quoted", "Listpc", "Listgc", "Listonline", "Infobot", "Buypremium"];
        const cmdOwner = ["React", "Chat", "Join", "Leave", "Block", "Unblock", "Bcgroup", "Bcall", "Setppbot", "Setexif", "Anticall", "Setstatus", "Setnamebot", "Sleep", "AutoTyping", "AlwaysOnline", "AutoRead", "autosview", "ban", "unban", "warn", "unwarn", "banchat"];
        const cmdStalk = ["Nowa", "Truecaller", "InstaStalk", "GithubStalk"];

        const generateMenu = (cmdList, title) => {
            if (!Array.isArray(cmdList)) {
                console.error('Invalid cmdList. It should be an array.');
                return '';
            }

            const formattedCmdList = cmdList
                .sort((a, b) => a.localeCompare(b))
                .map((v) => `│${v}`).join('\n');

            return `
╭───═❮ ${title} ❯═───❖
│ ╭─────────────···▸
${formattedCmdList.split('\n').map(item => `│${item ? ' ' + item.trim() : ''}`).join('\n')}
│ ╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`;
        };

        const introTextAi = generateMenu(cmdAi, '𝗔𝗜 𝗠𝗘𝗡𝗨');
        const introTextTool = generateMenu(cmdTool, '𝗧𝗢𝗢𝗟 𝗠𝗘𝗡𝗨');
        const introTextGrup = generateMenu(cmdGrup, '𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗡𝗨');
        const introTextDown = generateMenu(cmdDown, '𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥');
        const introTextSearch = generateMenu(cmdSearch, '𝗦𝗘𝗔𝗥𝗖𝗛');
        const introTextFun = generateMenu(cmdFun, '𝗙𝗨𝗡 𝗠𝗘𝗡𝗨');
        const introTextConv = generateMenu(cmdConv, '𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥');
        const introTextMain = generateMenu(cmdMain, '𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨');
        const introTextOwner = generateMenu(cmdOwner, '𝗢𝗪𝗡𝗘𝗥');
        const introTextStalk = generateMenu(cmdStalk, '𝗦𝗧𝗔𝗟𝗞');

        const menuText = `*🔢 TYPE BELOW NUMBER*
1. 𝗔𝗜 𝗠𝗘𝗡𝗨
2. 𝗧𝗢𝗢𝗟 𝗠𝗘𝗡𝗨
3. 𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗡𝗨
4. 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥
5. 𝗦𝗘𝗔𝗥𝗖𝗛
6. 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨
7. 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥
8. 𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨
9. 𝗢𝗪𝗡𝗘𝗥`;

        const menuMessage = `
👨‍💻 ${botname} 👨‍💻
╭─────────────·
│📍 ᴠᴇʀꜱɪᴏɴ: ᴠ2
│👨‍💻 ᴏᴡɴᴇʀ : ${global.owner}
│👤 ɴᴜᴍʙᴇʀ: 917050906659
╰─────────────

╭───═❮ *ᴍᴇɴᴜ ʟɪsᴛ* ❯═───❖
│╭─────────────···▸
${menuText.split('\n').map(item => `││▸ ${item.trim()}`).join('\n')}
│╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`;

        const subMenus = {
            '1': introTextAi,
            '2': introTextTool,
            '3': introTextGrup,
            '4': introTextDown,
            '5': introTextSearch,
            '6': introTextFun,
            '7': introTextConv,
            '8': introTextMain,
            '9': introTextOwner,
        };

        const lowerText = message.text.toLowerCase();
        const prefix = /^[\\/!#.]/gi.test(lowerText) ? lowerText.match(/^[\\/!#.]/gi)[0] : '/';
        const isCmd = lowerText.startsWith(prefix);
        
        if (isCmd) {
            const command = lowerText.slice(prefix.length).trim().split(' ')[0].toLowerCase();
            const args = lowerText.trim().split(/ +/).slice(1);

            if (command === 'menu2') {
                await gss.sendMessage(message.chat, {
                    image: { url: 'https://telegra.ph/file/61eec5ebaeef2a046a914.jpg' },
                    caption: menuMessage,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: false,
                            title: botname,
                            sourceUrl: global.link,
                            body: `Bot Created By ${global.owner}`
                        }
                    }
                }, { quoted: message });
            } else if (/^\d+$/.test(lowerText) && message.quoted) {
                const quotedText = message.quoted.text.toLowerCase();

                if (quotedText.includes(menuMessage.toLowerCase())) {
                    const selectedNumber = lowerText;
                    const subMenu = subMenus[selectedNumber];

                    if (subMenu !== undefined) {
                        await gss.sendMessage(message.chat, {
                            image: { url: 'https://telegra.ph/file/61eec5ebaeef2a046a914.jpg' },
                            caption: subMenu,
                            contextInfo: {
                                externalAdReply: {
                                    showAdAttribution: false,
                                    title: botname,
                                    sourceUrl: global.link,
                                    body: `Bot Created By ${global.owner}`
                                }
                            }
                        }, { quoted: message });
                    } else {
                        await gss.sendMessage(message.chat, { text: 'Invalid menu number. Please select a number from the menu.' }, { quoted: message });
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error in menu handler:', error);
    }
};

// Export the menu handler function
module.exports = menuHandler;
