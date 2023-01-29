const authHr = (req, res, next) => {
	if (req.user.role === 'hr') throw { statusCode: 403, message: 'Not allowed! Must be HR' };
	console.log('(Authenticated as HR!)');
	return next();
};

module.exports = authHr;
