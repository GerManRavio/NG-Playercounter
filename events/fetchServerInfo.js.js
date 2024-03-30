require("dotenv").config();
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const axios = require("axios");

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const API_KEY = process.env.API_KEY;
const API_URL_GAME = `https://api.scpslgame.com/serverinfo.php?id=${ACCOUNT_ID}&key=${API_KEY}&players=true`;

const SERVER_ID = process.env.SERVER_ID;
const API_URL_KR = `https://api.scplist.kr/api/servers/${SERVER_ID}`;

async function fetchServerInfoCurl() {
  try {
    const { stdout, stderr } = await exec(`curl -s ${API_URL_KR}`);
    if (stderr) {
      console.error("Curl stderr:", stderr);
      throw new Error(stderr);
    }
    const data = JSON.parse(stdout);
    return data;
  } catch (error) {
    console.error("Curl error:", error);
    throw error;
  }
}

async function fetchServerInfoWithAxios() {
  try {
    const response = await axios.get(API_URL_GAME);
    const data = response.data;
    if (data && typeof data === "object") {
      const jsonData = JSON.stringify(data);
      const cleanedJsonData = jsonData.replace(/\\\//g, "/");
      const result = JSON.parse(cleanedJsonData);
      return result;
    } else {
      console.error("Invalid response data from the API.");
    }
  } catch (error) {
    console.error("Axios error:", error.message);
    throw error;
  }
}

function getApiUrlKR() {
  return API_URL_KR;
}

function getApiUrlGAME() {
  return API_URL_GAME;
}

module.exports = {
  fetchServerInfoWithAxios,
  fetchServerInfoCurl,
  getApiUrlKR,
  getApiUrlGAME,
};
