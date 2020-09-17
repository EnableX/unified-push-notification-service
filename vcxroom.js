const vcxutil = require('./vcxutil');

const vcxroom = {};

// HTTP Request Header Creation
const options = {
  host: 'api.enablex.io',
  port: 443,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  },
};

// Function: To create Token for a Room
vcxroom.getToken = function getToken(details, callback) {
  options.path = `/v1/rooms/${details.roomId}/tokens`;
  options.method = 'POST';

  vcxutil.connectServer(options, JSON.stringify(details), (status, data) => {
    if (status === 'success') {
      callback(status, data);
    } else if (status === 'error') {
      callback(status, data);
    }
  });
};

// Function: To create Room
// Ref - https://developer.enablex.io/video-api-v1-6/server-api/rooms-route/#create-room
vcxroom.createRoom = function createRoom(callback) {
  const roomMeta = {
    name: 'Push notification service demo app',
    owner_ref: 'push service',
    settings: {
      scheduled: false,
      adhoc: false,
      participants: '4',
      quality: 'SD',
      auto_recording: false
    }
  };

  options.path = '/v1/rooms/';
  options.method = 'POST';

  vcxutil.connectServer(options, JSON.stringify(roomMeta), (status, data) => {
    if (status === 'success') {
      callback(status, data);
    } else if (status === 'error') {
      callback(status, data);
    }
  });
};

module.exports = vcxroom;
