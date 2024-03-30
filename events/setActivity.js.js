const { fetchServerInfoWithAxios, fetchServerInfoCurl, getApiUrlKR, getApiUrlGAME} = require('./fetchServerInfo.js');

async function setActivity(client) {
  try {
    const serverInfo_KR = await fetchServerInfoCurl();
    const serverInfo_GAME = await fetchServerInfoWithAxios();
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("URL KR: " + getApiUrlKR());
    console.log("URL GAME: " + getApiUrlGAME());
    if (serverInfo_KR && serverInfo_KR.online) {
      const playercount = serverInfo_GAME.Servers[1].Players;
      const serverport = serverInfo_GAME.Servers[1].Port;
      client.user.setPresence({
        activities: [
          {
            name: `SCP:SL: ${playercount} | IP: ${serverInfo_KR.ip}:${serverport}`,
            type: 4,
          },
        ],
        status: "online",
      });
      console.log("Updated Status to: " + playercount);
      await sleep(30000);
      await setActivity(client);
    }
  } catch (error) {
    console.error("Failed to set activity:", error);
    await sleep(30000);
    await setActivity(client);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { setActivity };
