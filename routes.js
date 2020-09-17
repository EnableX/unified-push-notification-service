const router = require('express').Router();
const mongo = require('./mongo');
const fcmWeb = require('./fcm-web');
const vcxroom = require('./vcxroom');

// register user device and save to database
const registerDevice = async (userIdentity, deviceToken, devicePlatform) => {
	const result = await (mongo.saveDevice(userIdentity, deviceToken, devicePlatform));
	console.error(JSON.stringify(result));
	return result;
};

// endpoint to register devices
router.post('/device', (req, res) => {
	try {
		registerDevice(req.body.user_identity, req.body.device_token, req.body.platform)
			.then((result) => {
				if (result) {
					res.status(200).send({
						message: 'Device registered successfully',
						result: '0',
					});
				} else {
					res.status(500).send({
						message: 'Error registering device',
					});
				}
			});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			message: 'Error processing request',
			error,
		});
	}
});

// get list of all user / devices
const getAllDevices = async () => {
	const result = await (mongo.getDevices());
	console.log(JSON.stringify(result));
	return result;
};

// endpoint to get all users / devices
// ideally, it will be filterd by any kind of organization instead of get all
router.get('/device', (req, res) => {
	try {
		getAllDevices()
			.then((result) => {
				if (result) {
					console.log(JSON.stringify(result));
					res.status(200).send({
						message: 'Device found',
						result,
					});
				} else {
					res.status(500).send({
						message: 'Error fetching devices',
					});
				}
			});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			message: 'Error processing request',
			error,
		});
	}
});

// get device by user provided identity.
const getDeviceDetails = async (userIdentity) => {
	const result = await (mongo.getDeviceByIdentity(userIdentity));
	console.log(JSON.stringify(result));
	return result;
};

// endpoint to create room & token and send push notification
router.post('/call', (req, res) => {
	try {
		getDeviceDetails(req.body.user_identity).then((remoteDeviceToken) => {
			if (remoteDeviceToken.length > 0) {
				// create EnableX room for video call
				let roomId = '';
				console.log('creating enablex room');
				// Ref - https://developer.enablex.io/video-api-v1-6/server-api/rooms-route/#create-room
				vcxroom.createRoom((roomStatus, roomData) => {
					console.log(`roomStatus ${roomStatus}`);
					console.log(JSON.stringify(roomData));
					if (roomStatus === 'success') {
						// Room Created successfully, create EnableX room token for moderator
						console.log('creating enablex token for moderator');
						roomId = roomData.room.room_id;
						// Ref - https://developer.enablex.io/video-api-v1-6/server-api/rooms-route/#create-token
						const createModeratorTokenObj = {
							name: req.body.user_identity,
							role: 'moderator',
							user_ref: req.body.user_identity,
							roomId,
						};

						let moderatorToken = '';
						vcxroom.getToken(createModeratorTokenObj, (tokenStatus, tokenData) => {
							console.log(tokenStatus);
							console.log(JSON.stringify(tokenData));
							if (tokenStatus === 'success') {
								// moderator token created successfully, now create room token for participant
								moderatorToken = tokenData.token;
								// Ref - https://developer.enablex.io/video-api-v1-6/server-api/rooms-route/#create-token
								const createParticipantTokenObj = {
									name: req.body.user_identity,
									role: 'participant',
									user_ref: req.body.user_identity,
									roomId,
								};

								let participantToken = '';
								console.log('creating enablex token for participant');
								vcxroom.getToken(createParticipantTokenObj, (status, data) => {
									console.log(status);
									console.log(JSON.stringify(data));
									if (status === 'success') {
										// room created and token created for moderator & participant
										participantToken = data.token;
										// send roomId & token to remote device using push notification
										if (remoteDeviceToken[0].platform === 'web') {
											fcmWeb.sendToDevice(
												remoteDeviceToken[0].device_token,
												moderatorToken,
											);
										}
										// send roomId & token to local device by http response
										res.status(200);
										res.send({
											token: participantToken,
										});
									}
								});
							}
						});
					}

					console.log(`error processing request`);
					res.status(500).send({
						message: 'Error processing request',
						error,
					});

				});
			} else {
				console.log(`Record not found for the given identity ${req.body.user_identity}`);
				res.status(404);
				res.send({
					message: `Record not found for the given identity ${req.body.user_identity}`,
					error: 'record not found'
				});
			}
		});
	} catch (error) {
		res.status(500).send({
			message: 'Error processing request',
			error,
		});
	}
});

module.exports = router;
