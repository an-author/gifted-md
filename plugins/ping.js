const pingHandler = async (message, gss) => {
    try {
        const body = typeof message.text === 'string' ? message.text : '';
        const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : '/';
        const isCmd = body.startsWith(prefix);
        
        if (isCmd) {
            const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();
            const args = body.trim().split(/ +/).slice(1);
            if (command === 'ping') {
                const startTime = new Date();
                const pingMsg = await gss.sendMessage(message.chat, { text: '*Pinging...*' });
                const responseTime = new Date() - startTime;
                await gss.relayMessage(message.chat, {
                    protocolMessage: {
                        key: pingMsg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `*Pong:* ${responseTime} ms`
                        }
                    }
                }, {});
            }
        }
    } catch (error) {
        console.error('Error in ping handler:', error);
    }
};

// Export the ping handler function
module.exports = pingHandler;