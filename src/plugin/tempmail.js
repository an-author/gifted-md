import axios from 'axios';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const tempMailApiBaseUrl = 'https://tempmail.apinepdev.workers.dev/api/gen';
const checkMailApiBaseUrl = 'https://tempmail.apinepdev.workers.dev/api/getmessage?email=';

const tempMailAndCheckMail = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['tempmail'];

  if (validCommands.includes(cmd)) {
    try {
      await m.React('🕘');

      const response = await axios.get(tempMailApiBaseUrl);
      const result = response.data;

      if (result && result.email) {
        const tempMailInfo = `Temporary Email: ${result.email}`;

        const msg = {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: {
                body: {
                  text: tempMailInfo
                },
                footer: {
                  text: "Use the buttons below to copy or check the email."
                },
                header: {
                  title: "Temporary Email",
                  subtitle: result.email,
                  hasMediaAttachment: false
                },
                buttons: [
                  {
                    "name": "cta_copy",
                    "buttonParamsJson": `{"display_text":"Copy Email","id":"copy_email","copy_code":"${result.email}"}`
                  },
                  {
                    "name": "quick_reply",
                    "buttonParamsJson": "{\"display_text\":\"Check Mail\",\"id\":\"check_mail\"}"
                  }
                ]
              }
            }
          }
        };

        const generatedMsg = await Matrix.generateWAMessageFromContent(m.from, msg, {});
        await Matrix.relayMessage(m.from, generatedMsg.message, { messageId: generatedMsg.key.id });

        await m.React('✅');
      } else {
        throw new Error('Invalid response from the TempMail API.');
      }
    } catch (error) {
      console.error('Error generating temporary email:', error.message);
      m.reply('Error generating temporary email.');
      await m.React('❌');
    }
  } else if (cmd === 'checkmail') {
    const quotedText = m.quoted?.text;
    const tempEmailMatch = quotedText?.match(/Temporary Email: (.+)/);
    const tempEmail = tempEmailMatch ? tempEmailMatch[1] : null;
    if (!tempEmail) return m.reply('Please generate a temporary email first using the tempmail command.');

    try {
      await m.React('🕘');

      const apiUrl = `${checkMailApiBaseUrl}${encodeURIComponent(tempEmail)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.messages) {
        const messages = result.messages.map((msg, index) => `${index + 1}. From: ${msg.from}\nSubject: ${msg.subject}\nDate: ${msg.date}\n\n`).join('');
        const mailInfo = `Emails for ${tempEmail}:\n\n${messages}`;
        await Matrix.sendMessage(m.from, { text: mailInfo }, { quoted: m });
        await m.React('✅');
      } else {
        throw new Error('No messages found or invalid response from the email check API.');
      }
    } catch (error) {
      console.error('Error checking temporary email:', error.message);
      m.reply('Error checking temporary email.');
      await m.React('❌');
    }
  }
};

export default tempMailAndCheckMail;
