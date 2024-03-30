const { fetchServerInfoWithAxios, fetchServerInfoCurl, getApiUrlKR, getApiUrlGAME} = require('./fetchServerInfo.js');

async function setActivity(client) {
  try {
    const serverInfo_KR = await fetchServerInfoCurl();
    const serverInfo_GAME = await fetchServerInfoWithAxios();
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("URL KR: " + getApiUrlKR());
    console.log("URL GAME: " + getApiUrlGAME());
    if ((serverInfo_KR && serverInfo_KR.online)) {
        const playerCount = serverInfo_GAME.Servers[0].Players;
        console.log("Playercount: " + playercount);
        const serverPort = serverInfo_GAME.Servers[0].Port;
        console.log("Serverport: " + serverport);
        const serverIp = serverInfo_KR.ip;
        console.log("ServerIP: " + serverport);
    client.user.setPresence({
      activities: [
        {
            name: `SCP:SL: ${playerCount} | IP: ${serverIp}:${serverPort}`,
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
