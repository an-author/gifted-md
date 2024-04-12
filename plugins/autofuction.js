 const autoHandler = async (message, gss, isCreator) => {
    try {
        require("dotenv").config();  
        require('../config')

        const body = typeof message.text === 'string' ? message.text : '';
        const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : '/';
        const isCmd = body.startsWith(prefix);
        
        if (isCmd) {
            const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();
            const args = body.trim().split(/ +/).slice(1);
            if (command) {
            
            if (!message.isGroup && !isCreator && global.onlygroup) {
    return m.reply("Hello, because we want to reduce spam, please use the bot in a group!\n\nIf there are joint interests, please type .owner to contact the owner.")
}
// Private Only
if (!isCreator && global.onlypc && m.isGroup) {
    return message.reply("Hello, if you want to use this bot, please chat privately with the bot.")
}

            if (global.autoTyping && message.chat) {
                gss.sendPresenceUpdate("composing", message.chat);
            }

            if (global.autoRecord && message.chat) {
                gss.sendPresenceUpdate("recording", message.chat);
            }

            if (global.available) {
                gss.sendPresenceUpdate('available', message.chat);
            } else {
                gss.sendPresenceUpdate('unavailable', message.chat);
            }

            if (global.autoread) {
                gss.readMessages([message.key]);
            }

            if (global.autoBlock && message.sender.startsWith('212')) {
                gss.updateBlockStatus(message.sender, 'block');
            }
            }
        }
    } catch (error) {
        console.error('Error in auto handler:', error);
    }
};

// Export the auto handler function
module.exports = autoHandler;
