const userService = require('../services/userService');
const authService = require('../services/authService');
const inviteService = require('../services/inviteService');
const tokenService = require('../services/tokenService');
const houseService = require('../services/houseService');
const catchAsync = require('../utils/catchAsync');
const { validatePasswordsMatch } = require('../utils/validate');

// register:
// they came from the special link and have now filled out the form and are submitting the register data.
// Need to grab the 'token' header and make sure it's not expired
const register = catchAsync(async (req, res) => {
	console.log('"register" route', { body: req.body, token: req.params.token });

	const { invite } = await inviteService.getInviteFromParams(req.params);
	if (!invite) throw { statusCode: 400, message: 'Token is required' };

	// check if invite is expired
	if (await invite.isTokenExpired()) throw { status: 400, message: 'Token is expired' };

	// check if invite matches the register email
	if (invite.email !== req.body.email)
		throw { statusCode: 400, message: 'Email does not match the invite' };

	// add this to the body so it's added into the user
	req.body.invite = invite;
	req.body.name = {
		first: invite.name.first,
		last: invite.name.last,
		middle: invite.name?.middle,
		preferred: invite.name?.preferred,
	}

	// create user, create token
	const user = await userService.createUser(req.body);
	const jwt = tokenService.createJwt(user);

	// mark registered
	await inviteService.putIsRegisteredToInviteId(invite._id);
	// assign to random house
	const house = await houseService.assignUserIdToHouse(user._id);
	// assign the house to the user
	await userService.putHouseIdToUserId(house._id, user._id);
	// refresh the user so everything is up to date when sending response
	const freshUser = await userService.getUserByIdAndPopulate(user._id);

	res.set('Set-Cookie', `jwt=${jwt}; Path=/;`); // removed httponly
	// res.headers = {
	// 	"auth": jwt
	// }
	// should change to header

	return res.status(201).send({ user: freshUser, jwt }); // send jwt so client can save it in redux
});

const login = catchAsync(async (req, res) => {
	console.log('"login" route', { body: req.body });
	const { username, email, password } = req.body;

	const user = await authService.loginUserWithUsernameOrEmail(username, email, password);
	const jwt = tokenService.createJwt(user);
	// if HR, maybe create a secondary token? or some identifier?
	// Or, the user already has a 'role' key so the client will know whether or not the user is 'hr' or 'employee'
	// user has role: hr | employee

	console.log('login:', { user });

	res.set('Set-Cookie', `jwt=${jwt}; Path=/;`);
	return res.status(200).send({ user, jwt });
});

const logout = catchAsync(async (req, res) => {
	console.log('"logout" route', { body: req.body });
	res.set('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
	return res.status(200).send({ message: 'logout success!' });
});

module.exports = {
	login,
	register,
	logout,
};
