const { fetchServerInfoWithCurl } = require('./fetchServerInfo.js');

async function setActivity(client) {
  try {
    const serverInfo = await fetchServerInfoWithCurl();
    if (serverInfo && serverInfo.online) {
      const playercount = serverInfo.players;
      client.user.setPresence({
        activities: [
          {
            name: `SCP:SL: ${playercount} | IP: ${serverInfo.ip}:${serverInfo.port}`,
            type: "PLAYING",
          },
        ],
        status: "online",
      });
      console.log("Updated Status to: " + playercount);
      await sleep(60000);
      await setActivity(client);
    }
  } catch (error) {
    console.error("Failed to set activity:", error);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { setActivity };
