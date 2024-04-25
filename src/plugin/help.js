import path from 'path';
import fs from 'fs/promises';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const pluginsFolderPath = path.join(__dirname, '..', 'plugin');

const helpCommand = async (m, sock) => {
    try {
        const cmd = m.body.toLowerCase();
        const args = cmd.split(' ');

        if (args[0] === '.help') {
            if (args.length < 2) {
                await sock.sendMessage(m.from, { text: 'Please provide a command name after .help' }, { quoted: m });
                return;
            }

            const commandName = args[1];
            const pluginFileName = `${commandName.slice(0)}.js`;
            const pluginFilePath = path.join(pluginsFolderPath, pluginFileName);

            try {
                const pluginContent = await fs.readFile(pluginFilePath, 'utf-8');
                const regex = /desc\s*=\s*['"`](.*?)['"`]/g;
                const matches = [...pluginContent.matchAll(regex)];

                if (matches.length > 0) {
                    const description = matches[0][1];
                    await sock.sendMessage(m.from, { text: description }, { quoted: m });
                } else {
                    await sock.sendMessage(m.from, { text: 'No description found for this command.' }, { quoted: m });
                }
            } catch (error) {
                console.error('Error reading plugin file:', error);
                await sock.sendMessage(m.from, { text: 'An error occurred while fetching the command description.' }, { quoted: m });
            }
        }
    } catch (error) {
        console.error('Error processing help command:', error);
    }
};

helpCommand.type = "main";
helpCommand.desc = "this is a help command";


export default helpCommand;
