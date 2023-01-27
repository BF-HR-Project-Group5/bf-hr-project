const { pruneDataForPutInfo, validatePasswordsMatch, isOldPasswordExists } = require('../utils/validate');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const catchAsync = require( '../utils/catchAsync' );

// get songs liked by user
const getLikedSongs = catchAsync(async (req, res) => {
	console.log('get liked songs controller:', { reqUser: req.user });
	const userId = req.user._id;
	const user = await userService.getUserByIdAndPopulateFields(userId, ['likedSongs']);
	res.status(200).json({likedSongs: user.likedSongs});
});

const getUser = catchAsync(async (req, res) => {
	console.log('get user controller:', { reqUser: req.user });
	const userId = req.user._id;
	const user = await userService.getUserByIdAndPopulateFields(userId, ['likedSongs', 'followedArtists']);
	res.status(200).json({user});
});

// edit user
const putEditInfo = catchAsync(async (req, res) => {
	console.log('put edit user/info controller:', { reqUser: req.user, body: req.body });
	const userId = req.user._id;

	// password && repeatPassword
	validatePasswordsMatch(req.body);
	// requires oldPassword
	isOldPasswordExists(req.body);

	// remove nulls/empties, remove repeatPassword
	const data = pruneDataForPutInfo(req.body);
	const user = await userService.updateUserById(userId, data);
	const jwt = tokenService.createJwt(user);

	console.log('new JWT:', jwt);

	// res.set('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
	res.set('Set-Cookie', `jwt=${jwt}; path=/; HttpOnly`);

	res.status(202).json({ message: `Success saving user!`, user });
});


module.exports = {
	getUser,
	getLikedSongs,
	putEditInfo,
};
