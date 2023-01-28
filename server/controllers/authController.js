const userService = require('../services/userService');
const authService = require('../services/authService');
const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');
const { validatePasswordsMatch } = require('../utils/validate');


// takes name, email...

// const invite = catchAsync()
// create a token for the unique invite
// creates an Invite (using the form data inputted by the HR person)
//			also sets the expiration  when it's created
// send email with their special link from the token/invite
// send a confirm response to the HR person so they know the action is completed


const register = catchAsync(async (req, res) => {
	console.log('"register" route', { body: req.body });
	validatePasswordsMatch(req.body);
	const user = await userService.createUser(req.body);
	const jwt = tokenService.createJwt(user);

	res.set('Set-Cookie', `jwt=${jwt}; Path=/; HttpOnly`);
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
