const userService = require('./userService');
const artistService = require('./_old_artistService');
const songService = require('./_old_/_old_songService');

// not really "transactions", I could rebuild these with mongoose transactions

const getUserAndArtistById = async (userId, artistId) => {
	const [user, artist] = await Promise.all([
		userService.getUserById(userId),
		artistService.getArtistById(artistId),
	]);
	console.log('getUserAndArtistById returns:', { user, artist });
	return { user, artist };
};

//user is NOT following
// 	need to follow from user
// need to followed from artist (if not already)
const followArtistTransaction = async (user, artist) => {
	console.log('followArtistTransaction:', { user, artist });
	const isArtistFollowed = artist.followedBy.includes(user._id);
	const promises = [
		userService.putUserFollowArtistId(user, artist._id),
		!isArtistFollowed
			? artistService.putArtistFollowedByUserId(artist, user._id)
			: Promise.resolve(artist),
	];
	const [userResults, artistResults] = await Promise.all(promises);
	console.log({ userResults, artistResults });
	return { user: userResults, artist: artistResults };
};

//user is following,
// need to unfollow from user
// need to unfollow from artist if he is followed
const unfollowArtistTransaction = async (user, artist) => {
	console.log('unfollowArtistTransaction:', { user, artist });
	const isArtistFollowed = artist.followedBy.includes(user._id);
	const promises = [
		userService.putUserUnfollowArtistId(user, artist._id),
		isArtistFollowed
			? artistService.putArtistUnfollowedByUserId(artist, user._id)
			: Promise.resolve(artist),
	];
	const [userResults, artistResults] = await Promise.all(promises);
	console.log({ userResults, artistResults });
	return { user: userResults, artist: artistResults };
};

const getUserAndSongById = async (userId, songId) => {
	console.log('getUserAndSongById', { userId, songId });
	const [user, song] = await Promise.all([
		userService.getUserById(userId),
		songService.getSongById(songId),
	]);
	console.log('getUserAndSongById returns:', { user, song });
	return { user, song };
};

//user is NOT liked yet
// 	need to like from user
// need to liked from song (if not already)
const likeSongTransaction = async (user, song) => {
	const isSongLiked = song.likedBy.includes(user._id);
	const promises = [
		userService.putUserLikeSongId(user, song._id),
		!isSongLiked ? songService.putSongLikedByUserId(song, user._id) : Promise.resolve(song),
	];
	const [userResults, songResults] = await Promise.all(promises);
	console.log({ userResults, songResults });
	return { user: userResults, song: songResults };
};

//user is following,
// need to unfollow from user
// need to unfollow from artist if he is followed
const unlikeSongTransaction = async (user, song) => {
	const isSongLiked = song.likedBy.includes(user._id);
	const promises = [
		userService.putUserUnlikeSongId(user, song._id),
		isSongLiked ? songService.putSongUnlikedByUserId(song, user._id) : Promise.resolve(song),
	];
	const [userResults, songResults] = await Promise.all(promises);
	console.log({ userResults, songResults });
	return { user: userResults, song: songResults };
};

module.exports = {
	getUserAndArtistById,
	followArtistTransaction,
	unfollowArtistTransaction,

	getUserAndSongById,
	likeSongTransaction,
	unlikeSongTransaction,
};
