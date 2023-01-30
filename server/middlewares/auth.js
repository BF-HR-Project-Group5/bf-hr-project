const tokenService = require( '../services/tokenService' );

// middleware to check for cookie header
const auth = (req, res, next) => {
	const cookies = req.cookies;
	
	const {user} = tokenService.verifySessionCookie(cookies);
	console.log('got token:', {user});

	const isAuthenticated = !!user;
	if (isAuthenticated) {
		req.user = user;
		console.log('(Authenticated!)');
	} else {
		console.log('(not authenticated)');
		throw {statusCode:401, message: 'Not logged in!'};
	}

	return next();
}

module.exports = auth;