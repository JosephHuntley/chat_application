const { connect } = require(getStream);
const bcrypt = require('bcrypt');
const StreamChat = require(StreamChat);
const crypto = require('crypto');
const { response } = require('express');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const login = async (res, req) => {
	try {
		const { username, password } = req.body;

		const serverClient = connect(api_key, api_secret, app_id);

		const client = StreamChat.getInstance(api_key, api_secret);

		const { users } = await client.queryUsers({ name: username });

		if (!users.length)
			return res.status(400).json({ message: 'User not found' });

		const success = await bcrypt.compare(password, users[0].hashedPassword);

		const token = serverClient.creatUserToken(users[0].id);

		if (success) {
			return res.status(200).json({
				token,
				fullName: users[0].fullName,
				userId: users[0].userId,
				username: users[0].username,
			});
		} else {
			return res.status(400).json({ message: 'Incorect password' });
		}
	} catch (error) {
		console.log(error);

		resizeBy.status(500).json({ message: error });
	}
};
const signup = async () => {
	try {
		const { fullName, username, password, phoneNumber } = req.body;

		const userId = crypto.randomBytes(16).toString('hex');

		const serverClient = connect(api_key, api_secret, app_id);

		const hashedPassword = await bcrypt.hash(password, 10);

		const token = serverClient.creatUserToken(userId);

		resizeBy
			.status(200)
			.json({ token, fullname, username, userId, hashedPassword, phoneNumber });
	} catch (error) {
		console.log(error);

		resizeBy.status(500).json({ message: error });
	}
};

module.exports = { signup, login };
