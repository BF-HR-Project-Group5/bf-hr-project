const { pruneDataForPutInfo, validatePasswordsMatch, isOldPasswordExists } = require('../utils/validate');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const catchAsync = require( '../utils/catchAsync' );

const getUser = catchAsync(async (req, res) => {
	console.log('get user controller:', { reqUser: req.user });
	const userId = req.user._id;
	const user = await userService.getUserByIdAndPopulate(userId);
	res.status(200).json({user});
});

// edit user
const putEditInfo = catchAsync(async (req, res) => {
	console.log('put edit user/info controller:', { reqUser: req.user, body: req.body });
	const userId = req.user._id;

	// remove nulls/empties, remove repeatPassword
	const data = pruneDataForPutInfo(req.body);
	const user = await userService.updateUserById(userId, data);
	const jwt = tokenService.createJwt(user); // create a new JWT in case some of the data in the JWT changed

	console.log('new JWT:', jwt);

	// res.set('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
	res.set('Set-Cookie', `jwt=${jwt}; path=/;`);

	res.status(202).json({ message: `Success saving user!`, user });
});

// const putDocumentToUserId
// const putDocumentToUserId = catchAsync(async (req, res) => {
// 	console.log('put docId to userId', { reqUser: req.user, body: req.body });
// })


module.exports = {
	getUser,
	putEditInfo,
};
