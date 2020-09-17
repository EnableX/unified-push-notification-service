const https = require('https');

exports.sendToDevice = (
  deviceToken, moderatorToken,
) => {
  const data = JSON.stringify({
    to: deviceToken,
    notification: {
      title: 'Video Call from EnableX',
      body: `Video Call from EnableX`,
      click_action: `${process.env.ENABLX_VIDEO_WEBAPP}/confo.html?token=${moderatorToken}`,
      icon: 'img/enablex-logo.png',
    },
  });

  console.log(data);

  const options = {
    hostname: 'fcm.googleapis.com',
    port: 443,
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      Authorization: `key=${process.env.FIREBASE_SERVER_KEY}`,
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};
