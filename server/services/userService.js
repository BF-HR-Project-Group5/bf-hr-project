const User = require('../models/user.model');
const { caseInsensitiveRegex } = require('../utils/regexHelpers');

const getUserById = async (id) => User.findById(id);
const getUserByEmail = async (email) => User.findOne({ email });
const getUserByUsername = async (username) => User.findOne({ username });
const getUsersByFirstName = async (firstName) =>
	User.find({ name: { first: caseInsensitiveRegex(firstName) } });
const getUsersByLastName = async (lastName) =>
	User.find({ name: { last: caseInsensitiveRegex(lastName) } });
const getUsersByMiddleName = async (middleName) =>
	User.find({ name: { middle: caseInsensitiveRegex(middleName) } });
const getUsersByPreferredName = async (preferredName) =>
	User.find({ name: { preferred: caseInsensitiveRegex(preferredName) } });

const queryUsers = async (filter) => User.find(filter);

// searches first and last name? Assumes fullName === 'john doe'?
// would be nice to filter first, middle, last, and preferred
// so would need to build a big filter:
/**	{
 * $or: [
 * {name: {first: {$or: [names[0], ..., names[n],]}}},
 * {name: {last: {$or: [names[0], ..., names[n],]}}},
 * {name: {middle: {$or: [names[0], ..., names[n],]}}},
 * {name: {preferred: {$or: [names[0], ..., names[n],]}}},
 * ]
 * }
 * 
 * 
 */
const getUsersByFullName = async (fullName) => {
	const names = fullName.split(' ');

	const filter = {
		'$or': [
			{name: {first: {$or: names}}},
			{name: {last: {$or: names}}},
			{name: {middle: {$or: names}}},
			{name: {preferred: {$or: names}}},
		],
	};

	return queryUsers(filter);
};

const createUser = async (userBody) => {
	const promises = [];
	const messages = [];
	if (userBody.email) {
		promises.push(User.isEmailTaken(userBody.email));
		messages.push({ statusCode: 409, message: 'createUser: Email already taken' });
	}
	if (userBody.username) {
		promises.push(User.isUsernameTaken(userBody.username));
		messages.push({ statusCode: 409, message: 'createUser: Username already taken' });
	}

	const results = await Promise.all(promises);
	console.log({ results });

	results.forEach((isTaken, index) => {
		if (isTaken === true) {
			console.log('createUser: promise failed:', messages[index]);
			throw messages[index];
		}
	});

	return User.create(userBody);
};

// oldPassword must be included and be correct
const updateUserById = async (userId, updateBody) => {
	const user = await getUserById(userId);
	if (!user) {
		throw { statusCode: 404, message: 'updateUserById: User not found' };
	}

	// use array of promises so they can run concurrently
	const promises = [];
	const messages = [];
	if (updateBody.password) {
		promises.push(user.isPasswordMatch(updateBody.oldPassword));
		messages.push({ statusCode: 400, message: 'updateUserById: Old password was not correct' });
	}
	if (updateBody.email) {
		promises.push(User.isEmailTaken(updateBody.email));
		messages.push({ statusCode: 400, message: 'updateUserById: Email already taken' });
	}
	if (updateBody.username) {
		promises.push(User.isUsernameTaken(updateBody.username));
		messages.push({ statusCode: 400, message: 'updateUserById: Username already taken' });
	}

	const results = await Promise.allSettled(promises);
	console.log({ results });

	results.forEach((promise, index) => {
		console.log('this promise:', promise);
		if (promise.result === 'rejected') {
			throw messages[index];
		}
	});

	Object.assign(user, updateBody);
	await user.save();
	return user;
};

// fields === string[] of fieldNames
const getUserByIdAndPopulateFields = async (userId, fieldNames) => {
	const user = await getUserById(userId);
	if (!user) {
		throw { statusCode: 404, message: 'getUserByIdAndPopulateFields: User not found' };
	}
	const promises = [];
	for (let i = 0; i < fieldNames.length; i++) {
		promises.push(user.populate(fieldNames[i]));
	}
	await Promise.allSettled(promises);
	return user;
};

// assumes it's not already following
const putUserFollowArtistId = async (user, artistId) => {
	user.followedArtists.push(artistId);
	await user.save();
	return user;
};

// assumes following already
const putUserUnfollowArtistId = async (user, artistId) => {
	const indexOfArtist = user.followedArtists.indexOf(artistId);
	user.followedArtists.splice(indexOfArtist, 1);
	await user.save();
	return user;
};

// assumes it's not already liked
const putUserLikeSongId = async (user, songId) => {
	user.likedSongs.push(songId);
	await user.save();
	return user;
};

// assumes liked already
const putUserUnlikeSongId = async (user, songId) => {
	const indexOfSong = user.likedSongs.indexOf(songId);
	user.likedSongs.splice(indexOfSong, 1);
	await user.save();
	return user;
};

module.exports = {
	getUserByEmail,
	getUserById,
	getUserByUsername,
	createUser,
	updateUserById,
	getUserByIdAndPopulateFields,
	putUserFollowArtistId,
	putUserUnfollowArtistId,
	putUserLikeSongId,
	putUserUnlikeSongId,
};
