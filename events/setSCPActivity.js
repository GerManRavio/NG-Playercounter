require("dotenv").config();
const axios = require("axios").default;
const { Events, Client } = require("discord.js");

const SERVER_ID = process.env.SERVER_ID;
const SCPSL_KEY = process.env.SCPSL_KEY;
const API_URL = `https://api.scplist.kr/api/servers/${SERVER_ID}`;

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
    if (serverInfo && serverInfo.online) {
      const playercount = serverInfo.players;
      client.user.setPresence({
        activities: [
          {
            name: `SCP:SL: ${playercount} | IP: ${serverInfo.ip}`,
            type: 4,
          },
        ],
        status: "online",
      });
      console.log("Updated Status to: " + playercount);
      await sleep(60000);
      setActivity(client);
    }
  } catch (error) {
    console.error("Failed to set activity:", error);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    setActivity(client);
  },
};
