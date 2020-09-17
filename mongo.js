const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;
let connString;
if (process.env.MONGO_CONN_STRING) {
  connString = process.env.MONGO_CONN_STRING;
} else if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
  connString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
} else {
  connString = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
}

MongoClient
  .connect(`${connString}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log('Connected to the database!');
    database = db.db(process.env.MONGO_DB);
  })
  .catch((err) => {
    console.error('Cannot connect to the database!', err);
    process.exit();
  });

// register device (token) to the server
exports.saveDevice = (
  userIdentity, deviceToken, devicePlatform,
) => new Promise((resolve, reject) => {
  const deviceObject = { user_identity: userIdentity, device_token: deviceToken, platform: devicePlatform };
  database
    .collection('devices')
    .insertOne(deviceObject, (err, result) => (err ? reject(err) : resolve(result)));
});

// get all devices (token) registered to the server
exports.getDevices = () => new Promise((resolve, reject) => {
  database
    .collection('devices')
    .find({})
    .toArray((err, result) => (err ? reject(err) : resolve(result)));
});

// get device token to the server
exports.getDeviceByIdentity = (userIdentity) => new Promise((resolve, reject) => {
  database
    .collection('devices')
    .find({ user_identity: userIdentity })
    .limit(1)
    .toArray((err, result) => (err ? reject(err) : resolve(result)));
});
