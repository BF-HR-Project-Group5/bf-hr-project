const {Song} = require('../models');

// get songs query

// put like to song
const getSongById = async (id) => Song.findById(id);

const querySongs = async (filter) => {
	const songs = await Song.find(filter);
  return songs;
};

// assumes it's not already liked
const putSongLikedByUserId = async (song, userId) => {
	song.likedBy.push(userId);
	await song.save();
	return song;
}

// assumes liked already
const putSongUnlikedByUserId = async (song, userId) => {
	const indexOfUser = song.likedBy.indexOf(userId);
	song.likedBy.splice(indexOfUser, 1);
	await song.save();
	return song;
};

module.exports = {
	getSongById,
	querySongs,
	putSongLikedByUserId,
	putSongUnlikedByUserId,
}