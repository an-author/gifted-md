import dotenv from 'dotenv';
dotenv.config();
import { makeWASocket, jidDecode, DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './event/index.js'
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs';
import axios from 'axios';
import moment from 'moment-timezone';
import express from 'express';

const app = express()
const port = 8000;

const logger = pino({ level: 'silent' });
let useQR;
let isSessionPutted;

async function start() {
  if(!process.env.SESSION_ID) {
    useQR = true;
    isSessionPutted = false;
  } else {
    useQR = false;
    isSessionPutted = true;
  }
  
  //Baileys Device Configuration
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = makeWASocket({
    logger: logger,
    printQRInTerminal: useQR,
    browser: ['Ethix-MD', 'Safari', '3.O'],
    auth: state,
  });

 // Manage Device Loging
 if (!sock.authState.creds.registered && isSessionPutted) {
    const sessionID = process.env.SESSION_ID.split('Ethix-MD&')[1];
    const pasteUrl = `https://pastebin.com/raw/${sessionID}`;
    const response = await fetch(pasteUrl);
    const text = await response.text();
    if (typeof text === 'string') {
      fs.writeFileSync('./session/creds.json', text);
      await start()
    }
  }
  
    // Handle Incomming Messages
  sock.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, sock));
  sock.ev.on("call", async (json) => await Callupdate(json, sock));
  sock.ev.on("group-participants.update", async (messag) => await GroupUpdate(sock, messag));
  
  // Check Socket Connection
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        sock.logout();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        start();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        start();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
        sock.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Scan Again And Run.`);
        sock.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        start();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        start();
      } else if (reason === DisconnectReason.Multidevicemismatch) {
        console.log("Multi device mismatch, please scan again");
        sock.logout();
      } else {
        sock.end(`Unknown DisconnectReason: ${reason}|${connection}`);
      }
    } else if (connection === "open") {
      console.log('Connected...', update);
      await sock.sendMessage(sock.user.id, { text: `> Ethix-MD connected` });
    }
  });
}

start();

app.get('/', (req, res) => { 
   res.send('Server Running') 
 }) 

 app.listen(port, () => { 
   console.log(`Example app listening on port ${port}`) 
 }) 
