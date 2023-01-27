const transactionService = require('../services/transactionService');
const catchAsync = require('../utils/catchAsync');

// handles toggle follow/unfollow on artist and user
const putArtistsFollow = catchAsync(async (req, res) => {
	console.log('put artist follow/unfollow controller:', {
		reqUser: req.user,
		params: req.params.artistId,
	});
	const userId = req?.user?._id;
	const artistId = req.params.artistId;
	const { user, artist } = await transactionService.getUserAndArtistById(userId, artistId);

	const isUserFollowing = user.followedArtists.includes(artistId);
	console.log({ wasFollowing: isUserFollowing });

	const results = await (isUserFollowing
		? transactionService.unfollowArtistTransaction(user, artist)
		: transactionService.followArtistTransaction(user, artist));

	return res.status(202).send({ user: results.user, artist: results.artist });
});

module.exports = {
	putArtistsFollow,
};