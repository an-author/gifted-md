import pkg from 'instagram-user';
const { Instagram } = pkg;
import axios from 'axios';


const instagramProfileCommandHandler = async (m, sock) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const username = m.body.split(' ')[1];

  // Assuming the command is in the format: /insta username
  if (cmd === 'igs' && username) {
    try {
      const userProfile = await instagram.getUser(username);
      if (userProfile) {
        const profileInfo = `*Username:* ${userProfile.username}\n*Full Name:* ${userProfile.full_name}\n*Bio:* ${userProfile.biography}\n*Followers:* ${userProfile.edge_followed_by.count}\n*Following:* ${userProfile.edge_follow.count}\n*Posts:* ${userProfile.edge_owner_to_timeline_media.count}\n*Profile Picture:* ${userProfile.profile_pic_url_hd}`;
        // Send profile picture
        await sock.sendMessage(m.from, { image: userProfile.profile_pic_url_hd }, { caption: profileInfo, quoted: m });
      } else {
        m.reply('User not found.');
      }
    } catch (error) {
      console.error('Error fetching Instagram profile:', error);
      m.reply('Error fetching Instagram profile.');
    }
  } else {
  }
};

export default instagramProfileCommandHandler;