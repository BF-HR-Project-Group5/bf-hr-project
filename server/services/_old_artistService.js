const {Artist} = require('../models');

const getArtistById = async (id) => Artist.findById(id);
const createArtist = async (artistBody) => Artist.create(artistBody);

// assumes it's not already following
const putArtistFollowedByUserId = async (artist, userId) => {
	artist.followedBy.push(userId);
	await artist.save();
	return artist;
}

// assumes following already
const putArtistUnfollowedByUserId = async (artist, userId) => {
	const indexOfUser = artist.followedBy.indexOf(userId);
	artist.followedBy.splice(indexOfUser, 1);
	await artist.save();
	return artist;
};


module.exports = {
	getArtistById,
	createArtist,
	putArtistFollowedByUserId,
	putArtistUnfollowedByUserId,
}