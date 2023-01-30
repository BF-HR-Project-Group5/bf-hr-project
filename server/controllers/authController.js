const userService = require('../services/userService');
const authService = require('../services/authService');
const inviteService = require('../services/inviteService');
const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');
const { validatePasswordsMatch } = require('../utils/validate');




// register:
// they came from the special link and have now filled out the form and are submitting the register data.
// Need to grab the 'token' header and make sure it's not expired
const register = catchAsync(async (req, res) => {
	console.log('"register" route', { body: req.body });

	// check if req.headers.token exists and is valid or expired
	const headers = req.headers;
	const {invite} = await inviteService.getInviteFromHeaders(headers);
	if (!invite) throw {status: 400, message: 'Token is required'};

	// If invite is used to register, need to mark isRegistered = true;
	// if token is expired
	// throw token is expired

	
	const user = await userService.createUser(req.body);
	const jwt = tokenService.createJwt(user);

	res.set('Set-Cookie', `jwt=${jwt}; Path=/;`);
	// res.headers = {
	// 	"auth": jwt
	// }
	// should change to header 
	return res.status(201).send({ user, jwt }); // send jwt so client can save it in redux
});

const login = catchAsync(async (req, res) => {
	console.log('"login" route', { body: req.body });
	const { username, email, password } = req.body;

	const user = await authService.loginUserWithUsernameOrEmail(username, email, password);
	const token = tokenService.createJwt(user);
	// if HR, maybe create a secondary token? or some identifier?
	// Or, the user already has a 'role' key so the client will know whether or not the user is 'hr' or 'employee'
	// user has role: hr | employee
	console.log('login:', { user });

	res.set('Set-Cookie', `jwt=${token}; Path=/;`);
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
