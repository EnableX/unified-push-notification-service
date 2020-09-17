const https = require('https');
const btoa = require('btoa');
require('dotenv').config();

const vcxutil = {};

// Function: To create basic authentication header using APP ID and APP KEY
vcxutil.getBasicAuthToken = function getBasicAuthToken() {
  return btoa(`${process.env.ENABLEX_APP_ID}:${process.env.ENABLEX_APP_KEY}`);
};

// Function: To connect to Enablex Server API Service
vcxutil.connectServer = function connectServer(options, data, callback) {
  console.log(`REQ URI:- ${options.method} ${options.host}:${options.port}${options.path}`);
  console.log(`REQ PARAM:- ${data}`);
  const request = https.request(options, (res) => {
    res.on('data', (chunk) => {
      console.log(`RESPONSE DATA:- ${chunk}`);
      console.log(JSON.parse(chunk).result);
      if (JSON.parse(chunk).result === 0) {
        callback('success', JSON.parse(chunk));
      } else {
        callback('error', JSON.parse(chunk));
      }
    });
  });
  request.on('error', (err) => {
    console.log(`RESPONSE ERROR:- ${JSON.stringify(err)}`);
  });
  if (data == null) {
    request.end();
  } else {
    request.end(data);
  }
};

module.exports = vcxutil;
