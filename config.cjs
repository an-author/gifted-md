// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "Your Session Id",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN === 'true',
  REJECT_CALL: process.env.REJECT_CALL === 'true',
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "Sid bhai",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "919142294571",
  AUTO_REACT: process.env.AUTO_REACT === 'true',
  ANTI_VIEW_ONCE: process.env.ANTI_VIEW_ONCE === 'true'
};

console.log("Loaded Configuration:", config);

module.exports = config;
