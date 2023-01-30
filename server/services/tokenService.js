const { config } = require('../config/constants');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

exports.verifySessionCookie = (cookies) => {
	if (!cookies || !cookies?.jwt) return {};
	const user = jwt.verify(cookies.jwt, process.env.SECRET_KEY);
	return {user};
};

exports.createJwt = (user) => {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
		role: user.role,
		iat: Date.now(),
		exp: Date.now() + config.tokenExpirationMinutes * 60 * 1000,
	};
	return jwt.sign(payload, process.env.SECRET_KEY);
};
