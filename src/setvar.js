import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { exec } from 'child_process';

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

        const herokuApiToken = process.env.HEROKU_API_TOKEN;
        const herokuAppName = process.env.HEROKU_APP_NAME;

        if (!herokuApiToken || !herokuAppName) {
            m.reply('Heroku API token or app name is not set.');
            return;
        }

        // Update the environment variable on Heroku
        await axios.patch(
            `https://api.heroku.com/apps/${herokuAppName}/config-vars`,
            { [varName]: varValue },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${herokuApiToken}`,
                    'Accept': 'application/vnd.heroku+json; version=3',
                },
            }
        );

        m.reply(`Environment variable ${varName} updated on Heroku.`);

        // Restart the Heroku dyno
        await axios.delete(
            `https://api.heroku.com/apps/${herokuAppName}/dynos`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${herokuApiToken}`,
                    'Accept': 'application/vnd.heroku+json; version=3',
                },
            }
        );

        m.reply('Heroku dyno restarted successfully.');
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        m.reply('Failed to update environment variable or restart the dyno on Heroku.');
    }
};

export default setEnvCommand;
