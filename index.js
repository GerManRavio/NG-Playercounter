require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

async function registerCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const folders = await fs.readdir(commandsPath);

    for (const folder of folders) {
        const commandFiles = await fs.readdir(path.join(commandsPath, folder));

        for (const file of commandFiles) {
            if (file.endsWith('.js')) {
                try {
                    const command = require(path.join(commandsPath, folder, file));

                    if (command.data && command.execute) {
                        client.commands.set(command.data.name, command);
                    } else {
                        console.warn(`[WARNING] The command in ${file} is missing required properties.`);
                    }
                } catch (error) {
                    console.error(`[ERROR] An error occurred while loading ${file}: ${error}`);
                }
            }
        }
    }
}

async function registerEvents() {
    const eventsPath = path.join(__dirname, 'events');
    const files = await fs.readdir(eventsPath);

    for (const file of files) {
        if (file.endsWith('.js')) {
            try {
                const event = require(path.join(eventsPath, file));

                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
            } catch (error) {
                console.error(`[ERROR] An error occurred while loading ${file}: ${error}`);
            }
        }
    }
}

async function start() {
    try {
        await registerCommands();
        await registerEvents();
        await client.login(token);
    } catch (error) {
        console.error('[ERROR] An error occurred during startup:', error);
    }
}

start();
