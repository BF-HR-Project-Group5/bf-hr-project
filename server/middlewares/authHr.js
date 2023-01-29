/*
For simplicity, just throw this middleware in AFTER `auth` middleware, 
		i.e. router.get('some/hr/page', auth, authHr, controller.showSomeHrPage)
After `auth` runs, we have access to `req.user`, and so here we simply check the role on the user.
*/
const authHr = (req, res, next) => {
	if (req.user.role !== 'hr') throw { statusCode: 403, message: 'Not allowed! Must be HR' };
	console.log('(Authenticated as HR!)');
	return next();
};

module.exports = authHr;
