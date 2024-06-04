import Instagram from 'instagram-user';
import axios from 'axios';

// Initialize Instagram client
const instagram = new Instagram();

const instagramProfileCommandHandler = async (m) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const username = m.body.split(' ')[1]; // Assuming the command is in the format: /insta username

  if (cmd === 'igs' && username) {
    try {
      const userProfile = await instagram.getUser(username);
      if (userProfile) {
        const profileInfo = `
          *Username:* ${userProfile.username}
          *Full Name:* ${userProfile.full_name}
          *Bio:* ${userProfile.biography}
          *Followers:* ${userProfile.edge_followed_by.count}
          *Following:* ${userProfile.edge_follow.count}
          *Posts:* ${userProfile.edge_owner_to_timeline_media.count}
          *Profile Picture:* ${userProfile.profile_pic_url_hd}
        `;
        
        // Send profile picture
        await gss.sendImage(m.from, userProfile.profile_pic_url_hd, m, { caption: profileinfo });
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
