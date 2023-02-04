const userService = require('./userService');

const loginUserWithEmailAndPassword = async (email, password) => {
	const user = await userService.getUserByEmail(email);
	if (!user) throw { statusCode: 401, message: 'Incorrect email' }
	if (!(await user.isPasswordMatch(password))) {
		throw { statusCode: 401, message: 'Incorrect password' };
	}
	return user;
};

const loginUserWithUsernameAndPassword = async (username, password) => {
	const user = await userService.getUserByUsername(username);
	if (!user) throw { statusCode: 401, message: 'Incorrect username' };
	if (!(await user.isPasswordMatch(password)))
		throw { statusCode: 401, message: 'Incorrect password' };

	return user;
};


const loginUserWithUsernameOrEmail = async (username, email, password) => {
	if (!username && !email) throw { statusCode: 400, message: 'login: Either Username or Email is required!' };

	if (!password) throw {statusCode: 400, message: 'login: Password is required!'};

	// start both promises: email login and username login
	const promises = [];
	if (username) promises.push(loginUserWithUsernameAndPassword(username, password));
	if (email) promises.push(loginUserWithEmailAndPassword(email, password));

	// once one succeeds, we have our user
	const results = await Promise.allSettled(promises);
	const firstSuccessfulPromise = results.filter(r => r.status === 'fulfilled')[0];
	console.log({user: firstSuccessfulPromise});

	if (!firstSuccessfulPromise) throw { statusCode: 400, message: 'login: Failed, user not found!'}

	const user = firstSuccessfulPromise.value;

	return userService.getUserByIdAndPopulate(user._id);
}

module.exports = {
	loginUserWithEmailAndPassword,
	loginUserWithUsernameAndPassword,
	loginUserWithUsernameOrEmail,
};