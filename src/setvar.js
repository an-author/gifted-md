import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const envFilePath = path.resolve(__dirname, '../.env');

// Function to set an environment variable in the .env file
const setEnvCommand = async (m, args) => {
    if (args.length !== 1) {
        m.reply('Usage: .setenv VARIABLE_NAME=VARIABLE_VALUE');
        return;
    }

    const [varAssignment] = args;
    const [varName, varValue] = varAssignment.split('=');

    if (!varName || !varValue) {
        m.reply('Invalid format. Usage: .setenv VARIABLE_NAME=VARIABLE_VALUE');
        return;
    }

    const envEntry = `${varName.toUpperCase()}=${varValue}`;
    try {
        fs.appendFileSync(envFilePath, `${envEntry}\n`);
        m.reply(`Environment variable ${varName} has been set to ${varValue}.`);
    } catch (error) {
        console.error('Error writing to env file:', error);
        m.reply('Failed to set environment variable.');
    }
};

export default setEnvCommand;
