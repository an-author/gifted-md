import Instagram from 'instagram-private-api';

const instagramProfileCommandHandler = async (m, sock) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.split(' ');
  const validCommands = ['igs', 'igstalk'];

  if (validCommands.includes(cmd)) {
    if (!args[1]) return m.reply(`Enter Instagram Username\n\nExample: ${prefix}igs world_reacode_egg`);
    try {
      await m.reply(`Please wait...`);
      const user = await Instagram.getUSERByUsername(args[1]);
      const te = `┌──「 *Information* ▢ *🔖Name:* ${user.full_name} ▢ *🔖Username:* ${user.username} ▢ *👥Follower:* ${user.followers_count} ▢ *🫂Following:* ${user.following_count} ▢ *📌Bio:* ${user.biography} ▢ *🏝️Posts:* ${user.media_count} ▢ *🔗 Link* : https://instagram.com/${user.username} └────────────`;
      await sock.sendMessage(m.from, { image: { url: user.profile_pic_url }, caption: te }, { quoted: m });
    } catch (err) {
      console.error(err);
      m.reply(`Make sure the username comes from *Instagram*`);
    }
  }
};

export default instagramProfileCommandHandler;