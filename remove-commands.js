require('dotenv').config();

const { REST, Routes } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const rest = new REST().setToken(token);

rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1208488340219760700'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1208488340219760701'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1208488340219760702'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

rest.delete(Routes.applicationCommand(clientId, '1208488340219760700'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);