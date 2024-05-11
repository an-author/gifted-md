import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino';
import axios from 'axios';
import { Boom } from '@hapi/boom';
import path from 'path';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import moment from 'moment-timezone';
import { makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './event/index.js';
import NodeCache from 'node-cache';
import readline from 'readline';
import parsePhoneNumber from 'libphonenumber';

dotenv.config();
const app = express();
const port = 8000;

var sessionFolderPath = path.join(__dirname, '/session');
var sessionPath = path.join(sessionFolderPath, '/creds.json');
console.log(process.env.SESSION_ID);
Dec_Sess();
var sessionFolderPath = path.join(__dirname, '/session');
var sessionPath = path.join(sessionFolderPath, '/creds.json');
console.log(process.env.SESSION_ID);
Dec_Sess();

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

async function Dec_Sess() {
    execSync('rm -rf ' + sessionPath);
    exec('rm -r ' + sessionPath);
    exec('mkdir ' + sessionFolderPath)
    let code = process.env.SESSION_ID.replace(/Ethix-MD/g, "");
    let code2 = Buffer.from(code, "base64").toString("utf-8")
    let id = code2.replace(/Ethix-MD/g, "");
    let id2 = Buffer.from(id, "base64").toString("utf-8")
    if (!fs.existsSync(sessionPath)) {
        if (id2.length < 30) {
            const axios = require('axios');
            let { data } = await axios.get('https://paste.c-net.org/' + id2)
            //   console.log(data)
            await fs.writeFileSync(sessionPath, JSON.stringify(data))
        }
    }
}

async function startsock() {
    await delay(3000);
    await delay(2000);
    //------------------------------------------------------
    let { version, isLatest } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true, // popping up QR in terminal log
        browser: Browsers.ubuntu('Firefox'), // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
        auth: state,
        version
    });

    store.bind(sock.ev)

    // Handle Incoming Messages
    sock.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, sock));
    sock.ev.on("call", async (json) => await Callupdate(json, sock));
    sock.ev.on("group-participants.update", async (messag) => await GroupUpdate(sock, messag));

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            let reason = new DisconnectReason(lastDisconnect?.error)?.output.statusCode;

            if (reason === DisconnectReason.badSession) {
                console.log("Bad Session File, Please Delete Session and Scan Again");
                sock.logout();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting...");
                startsock();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server, reconnecting...");
                startsock();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                sock.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log("Device Logged Out, Please Scan Again And Run.");
                sock.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...");
                startsock();
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut, Reconnecting...");
                startsock();
            } else if (reason === DisconnectReason.Multidevicemismatch) {
                console.log("Multi device mismatch, please scan again");
                sock.logout();
            } else {
                sock.end(`Unknown DisconnectReason: ${reason}|${connection}`);
            }
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
