const menuHandler = async (message, gss) => {
    try {
        const body = typeof message.text === 'string' ? message.text : '';
        const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : '/';
        const isCmd = body.startsWith(prefix);

        if (isCmd) {
            const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();

            if (command === 'menu') {
                const options = ['Allmenu', 'Groupmenu', 'ping', 'Searchmenu', 'ping', 'Toolmenu', 'Convertmenu', 'aimenu', 'Mainmenu', 'Ownermenu'];
 
                const pollMsg = await gss.sendPoll(message.chat, `Vote for Menu Option`, options);
            }
        }
    } catch (error) {
        console.error('Error in menu handler:', error);
    }
};

module.exports = menuHandler;
