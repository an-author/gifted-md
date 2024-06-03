import { exec } from 'child_process';

const restartPM2 = async (m, doReact) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['restart'];

   if (validCommands.includes(cmd)) {
    try {
      const restartCommand = 'pm2 restart all';
      exec(restartCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          return m.reply(`An error occurred while restarting all processes: ${error.message}`);
        }
        if (stderr) {
          console.error(stderr);
          return m.reply(`Error output while restarting all processes: ${stderr}`);
        }
        console.log(stdout);
        m.reply(`All processes successfully restarted.`);
        m.React("✅");
      });
    } catch (error) {
      console.error(error);
      await m.React("❌");
      return m.reply(`An error occurred while processing the restart command. ${error.message}`);
    }
  }
};

export default restartPM2;
