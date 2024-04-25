import path from 'path';
import fs from 'fs/promises';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const pluginsFolderPath = path.join(__dirname, '..', 'plugin');

const menuCommand = async (m, sock) => {
    try {
        const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
        if (cmd === 'menu') {
            const pluginFiles = await fs.readdir(pluginsFolderPath);
            const commandNames = [];
            for (const file of pluginFiles) {
                if (file.endsWith('.js')) {
                    const pluginContent = await fs.readFile(path.join(pluginsFolderPath, file), 'utf-8');
                    const regex = /(?<=cmd\s*===\s*['"`]).*?(?=['"`])/g;
                    const matches = pluginContent.match(regex);

                    if (matches) {
                        commandNames.push(...matches.map((match) => `.${match}`));
                    }
                }
            }
            if (commandNames.length > 0) {
                const menuText = 'Available Commands:\n' + commandNames.map((name) => `- ${name}`).join('\n');
                await sock.sendMessage(m.from, { text: menuText }, { quoted: m });
            } else {
                await sock.sendMessage(m.from, { text: 'No commands available.' }, { quoted: m });
            }
        }
    } catch (err) {
        console.error('Error in menuCommand:', err);
        await sock.sendMessage(m.from, { text: 'An error occurred while processing your request.' }, { quoted: m });
    }
};

menuCommand.type = "main";
menuCommand.desc = "see all available command";

export default menuCommand;
