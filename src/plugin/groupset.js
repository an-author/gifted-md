import cron from 'node-cron';
import moment from 'moment-timezone';

let scheduledTasks = {};

const groupSetting = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['group'];
    if (!validCommands.includes(cmd)) return;
    
        if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");
    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (!botAdmin) return m.reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");
    if (!senderAdmin) return m.reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");

    const args = m.body.slice(prefix.length + cmd.length).trim().split(/\s+/);
    if (args.length < 2) return m.reply(`Please specify a setting (open/close) and a time.\n\nExample:\n*${prefix + cmd} open 04:00*`);

    const groupSetting = args[0].toLowerCase();
    const time = args[1];

    // Check if the provided time is valid
    if (!/^\d{2}:\d{2}$/.test(time)) return m.reply(`Invalid time format. Use HH:mm format.\n\nExample:\n*${prefix + cmd} open 04:00*`);

    const [hour, minute] = time.split(':').map(Number);
    const cronTime = `${minute} ${hour} * * *`;

    // Clear any existing scheduled task for this group
    if (scheduledTasks[m.from]) {
      scheduledTasks[m.from].stop();
      delete scheduledTasks[m.from];
    }

    scheduledTasks[m.from] = cron.schedule(cronTime, async () => {
      try {
        if (groupSetting === 'close') {
          await gss.groupSettingUpdate(m.from, 'announcement');
          m.reply("Group successfully closed.");
        } else if (groupSetting === 'open') {
          await gss.groupSettingUpdate(m.from, 'not_announcement');
          m.reply("Group successfully opened.");
        }
      } catch (err) {
        console.error('Error:', err);
        m.reply('An error occurred while updating the group setting.');
      }
    }, {
      timezone: "Asia/Kolkata"
    });

    m.reply(`Group will be set to "${groupSetting}" at ${time} IST.`);
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default groupSetting;
