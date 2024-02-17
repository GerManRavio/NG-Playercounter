require('dotenv').config();
const axios = require('axios').default;
const { Client } = require('discord.js');

const SERVER_ID = process.env.SERVER_ID;
const SCPSL_KEY = process.env.SCPSL_KEY;
const API_URL = `https://api.scpslgame.com/serverinfo.php?id=${SERVER_ID}&key=${SCPSL_KEY}&players=true`;

async function fetchServerInfo() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("API error:", error);
        return null;
    }
}

async function setActivity(client) {
    try {
        const serverInfo = await fetchServerInfo();
        if (serverInfo && serverInfo.Success) {
            const playercount = serverInfo.Servers[0].Players;
            client.user.setActivity(`SCP:SL: ${playercount}`, { type: 'CUSTOM' });
            const waitTime = serverInfo.Cooldown + 1;
            await sleep(waitTime * 1000);
            setActivity(client);
        }
    } catch (error) {
        console.error("Failed to set activity:", error);
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        setActivity(client);
    },
};
