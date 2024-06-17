import axios from 'axios';

const flirting = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['flirt'];

  if (validCommands.includes(cmd)) {
    try {
      let shizokeys = 'shizo'	
  let res = await fetch(`https://shizoapi.onrender.com/api/texts/flirt?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
	    let json = await res.json()

  let result = `${json.result}`
  await Matrix.sendMessage(m.from, { text: result, mentions: [m.sender] }, { quoted: m })
}
      await m.React("❌");
    }
};

export default flirting;
