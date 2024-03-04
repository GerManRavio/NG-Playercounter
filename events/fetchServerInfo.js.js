require("dotenv").config();
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const SERVER_ID = process.env.SERVER_ID;
const API_URL = `https://api.scplist.kr/api/servers/${SERVER_ID}`;

async function fetchServerInfoWithCurl() {
  try {
    const { stdout, stderr } = await exec(`curl -s ${API_URL}`);
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

module.exports = { fetchServerInfoWithCurl };
