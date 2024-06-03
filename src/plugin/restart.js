import { exec } from 'child_process';

const restartBot = async (m) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === 'restart') {
    try {
      m.reply('Restarting bot...');
      exec('pm2 restart all', (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          m.reply(`An error occurred while restarting the bot: ${error.message}`);
         m.React("❌");
          return;
        }
        if (stderr) {
          console.error(stderr);
          m.reply(`Error output while restarting the bot: ${stderr}`);
          m.React("❌");
          return;
        }
        console.log(stdout);
        m.reply(`Bot successfully restarted.`);
       m.React("✅");
      });
    } catch (error) {
      console.error(error);
      await m.React("❌");
      return m.reply(`An error occurred while restarting the bot: ${error.message}`);
    }
  }
};

export default restartBot;
