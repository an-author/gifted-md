import { spawn } from 'child_process'

const restartBot = async (m,) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === 'restart') {
    try {
      if (!process.send) throw 'Restart command is not supported in this environment.';

      await m.reply('🔄 Restarting Bot...\nPlease wait a moment.');
      process.send('reset');
      m.React("✅");
    } catch (error) {
      console.error(error);
      await m.React("❌");
      return m.reply(`An error occurred while restarting the bot: ${error}`);
    }
  }
};

export default restartBot;
