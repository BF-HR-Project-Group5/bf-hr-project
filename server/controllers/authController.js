const userService = require('../services/userService');
const authService = require('../services/authService');
const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');
const { validatePasswordsMatch } = require('../utils/validate');

const register = catchAsync(async (req, res) => {
	console.log('"register" route', { body: req.body });
	validatePasswordsMatch(req.body);
	const user = await userService.createUser(req.body);
	const jwt = tokenService.createJwt(user);

	res.set('Set-Cookie', `jwt=${jwt}; Path=/; HttpOnly`);
	return res.status(201).send({ user });
});

const login = catchAsync(async (req, res) => {
	console.log('"login" route', { body: req.body });
	const { username, email, password } = req.body;

	const user = await authService.loginUserWithUsernameOrEmail(username, email, password);
	const token = tokenService.createJwt(user);
	console.log('login:', { user });

	res.set('Set-Cookie', `jwt=${token}; Path=/; HttpOnly`);
	return res.status(200).send({ user });
});

const logout = catchAsync(async (req, res) => {
	console.log('"logout" route', { body: req.body });
	res.set('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
	return res.status(200).send({message: 'logout success!'});
});

module.exports = {
	login,
	register,
	logout,
};
