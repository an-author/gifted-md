const aliveHandler = async (message, gss) => {
    try {
        const body = typeof message.text === 'string' ? message.text : '';
        const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : '/';
        const isCmd = body.startsWith(prefix);
        
        if (isCmd) {
            const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();
            const args = body.trim().split(/ +/).slice(1);
            if (command === 'alive') {
                const uptimeMs = process.uptime() * 1000; 
                const hours = Math.floor(uptimeMs / (1000 * 60 * 60));
                const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((uptimeMs % (1000 * 60)) / 1000);
                const uptimeMessage = `*I am alive now since ${hours}h ${minutes}m ${seconds}s*`;
                await gss.sendMessage(message.chat, { text: uptimeMessage }, { quoted: message });
            }
        }
    } catch (error) {
        console.error('Error in alive handler:', error);
    }
};

// Export the alive handler function
module.exports = aliveHandler;
