import dotenv from 'dotenv';
dotenv.config();
import { makeWASocket, useMultiFileAuthState, makeInMemoryStore } from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './event/index.js';
import pino from 'pino';
import os from 'os';
import fs from 'fs/promises';
import axios from 'axios';
import express from 'express';

const app = express();
const port = 8000;

let useQR;
let isSessionPutted;

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

async function startsock() {
  if (!process.env.SESSION_ID) {
    useQR = true;
    isSessionPutted = false;
  } else {
    useQR = false;
    isSessionPutted = true;
  }

  const Device = (os.platform() === 'win32') ? 'Windows' : (os.platform() === 'darwin') ? 'MacOS' : 'Linux';

  // Baileys Device Configuration
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: useQR,
    browser: [Device, 'Chrome', '20.0.04'],
    auth: state,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg?.message;
      }
      return {
        conversation: "Hai Im Ethix-MD"
      };
    }
  });

  store.bind(sock.ev);

  // Manage Device Logging
  if (!sock.authState.creds.registered && isSessionPutted) {
    const sessionID = process.env.SESSION_ID.split('Ethix-MD&')[1];
    const pasteUrl = `https://pastebin.com/raw/${sessionID}`;
    const response = await axios.get(pasteUrl);
    const text = response.data;
    if (typeof text === 'string') {
      await fs.writeFile('./session/creds.json', text);
      await startsock();
    }
  }

  // Handle Incoming Messages
  sock.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, sock));
  sock.ev.on("call", async (json) => await Callupdate(json, sock));
  sock.ev.on("group-participants.update", async (messag) => await GroupUpdate(sock, messag));

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      try {
        console.log('Connection Closed, Reconnecting -');
        startsock();
      } catch (e) {
        console.log('ERROR LOG:--');
        console.log(e);
      }
    } else {
      console.log('Bot Logout');
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

startsock();

app.get('/', (req, res) => {
  res.send('Server Running');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
