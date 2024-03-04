require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { setActivity } = require('./events/setActivity.js');

const token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await setActivity(client);
});

client.login(token).catch(console.error);
