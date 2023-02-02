const Joi = require('joi');
const { username, passwordMixed } = require('./custom.validation');

const editUser = {
	body: Joi.object().keys({
		username: Joi.string().min(4).max(16).custom(username),
		email: Joi.string().email(),
		oldPassword: Joi.string().min(8).max(16).custom(passwordMixed('oldPassword')),
		password: Joi.string().min(8).max(16).custom(passwordMixed('password')),
	}),
};

const registerUser = {
	body: Joi.object().keys({
		username: Joi.string().min(4).max(16).custom(username).required(),
		email: Joi.string().email().required(),
		password: Joi.string().custom(passwordMixed('password')).required(),
	}),
};

const loginUser = {
	body: Joi.object().keys({
		username: Joi.string().min(4).max(16).custom(username),
		email: Joi.string().email(),
		password: Joi.string().custom(passwordMixed('password')).required(),
	}),
};

module.exports = { editUser, registerUser, loginUser };
