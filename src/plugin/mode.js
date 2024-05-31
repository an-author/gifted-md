import config from '../../config.cjs';

const modeCommand = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

  if (cmd === 'mode') {
    let responseMessage;

    if (text === 'public') {
      config.MODE = 'public';
      responseMessage = "Mode has been set to public.";
    } else if (text === 'self') {
      config.MODE = 'self';
      responseMessage = "Mode has been set to self.";
    } else {
      responseMessage = "Usage:\n- `mode public`: Set mode to public\n- `mode self`: Set mode to self";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default modeCommand;
