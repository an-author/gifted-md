import apiDylux from 'api-dylux';

const instagramProfileCommandHandler = async (m, sock) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.split(' ');
  const validCommands = ['igs', 'igstalk'];

  if (validCommands.includes(cmd)) {
    if (!args[1]) return m.reply(`Enter Instagram Username\n\nExample: ${prefix}igs world_reacode_egg`);
    await m.reply(`Please wait...`);
    try {
      const res = await apiDylux.igStalk(args[1]);
      const te = `┌──「 *Information* ▢ *🔖Name:* ${res.name} ▢ *🔖Username:* ${res.username} ▢ *👥Follower:* ${res.followersH} ▢ *🫂Following:* ${res.followingH} ▢ *📌Bio:* ${res.description} ▢ *🏝️Posts:* ${res.postsH} ▢ *🔗 Link* : https://instagram.com/${res.username.replace(/^@/, '')} └────────────`;
      await sock.sendMessage(m.from, { image: { url: res.profilePic }, caption: te }, { quoted: m });
    } catch {
      m.reply(`Make sure the username comes from *Instagram*`);
    }
  }
};

export default instagramProfileCommandHandler;