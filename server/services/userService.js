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

const generateFullNameFilter = (fullName) => {
	const names = fullName.split(' ').map(each => caseInsensitiveRegex(each));
	console.log({ names });

	const filter = {
		$or: [
			{ name: { first: { $in: names } } },
			{ name: { last: { $in: names } } },
			{ name: { middle: { $in: names } } },
			{ name: { preferred: { $in: names } } },
		],
	};

	return filter;
};

const queryUsers = async (filter) => {
	return User.find(filter);
	// const users = await User.find(filter);
	// const unique = [... new Set(users)];
	// return unique;
};
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
// for querying users by name
const queryUsersByFullName = async (fullName) => {
	return queryUsers(generateFullNameFilter(fullName));
};

// needs more work
// This runs as when the user accepts the invite from the email and is starting to register their new account
// Validation of the userBody already happens before this, so what do we need to check in here?
// we'll build off the invite so we already know the email is not taken, assuming we use the invite email
const createUser = async (userBody) => {
	// only one thing to check, so can just check it and throw error
	if (userBody.username && (await User.isUsernameTaken(userBody.username))) {
		throw { statusCode: 409, message: 'createUser: Username already taken' };
	}
	return User.create(userBody);
};

// Looks like email is editable so need to check it here, to make sure they're not taken
const updateUserById = async (userId, updateBody) => {
	const user = await getUserById(userId);
	if (!user) {
		throw { statusCode: 404, message: 'updateUserById: User not found' };
	}

	// use array of promises so they can run concurrently
	// (in case there are multiple)
	const promises = [];
	const messages = [];
	if (updateBody.email) {
		promises.push(User.isEmailTaken(updateBody.email));
		messages.push({ statusCode: 400, message: 'updateUserById: Email already taken' });
	}

	const results = await Promise.allSettled(promises);
	// console.log({ results });

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
// can get user and populate 'Documents', etc.
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

const getUserByIdAndPopulate = (userId) =>
	getUserByIdAndPopulateFields(userId, ['profile', 'invite', 'house']);

// put a document to the user
const putDocumentIdToUserId = async (docId, userId) => {
	// find user
	const user = await getUserById(userId);

	// update user with the document, update status???
	user.documents.push(docId);

	await user.save();
	return user;
};

// put a house to the user?
// Or only done on creation? <<<
const putHouseIdToUserId = async (houseId, userId) => {
	const user = await getUserById(userId);
	user.house = houseId;
	await user.save();
	return user;
};

const getAllUsersAndPopulate = () => User.find().populate(['profile', 'invite', 'house']);

const filterVisaProfiles = (users) =>
	users.filter((user) => user?.profile?.workAuth.title === 'VISA');

const getAllVisaUsers = async () => {
	const users = await getAllUsersAndPopulate();
	return filterVisaProfiles(users);
};

// const queryUsersAndPopulate = async (filter) => {
// 	filter = generateFullNameFilter(filter.search);
// 	console.log({filter});
// 	const users = await User.find(filter).populate(['profile', 'invite', 'house']);
// 	return users;
// }

// const queryUsersAndPopulate = async (filter) => {
// 	const users = await getAllUsersAndPopulate();
// 	const names = filter.search.split(' ');
// 	console.log({ names, users });
// 	const filtered = users.filter(
// 		(user) =>
// 			names.includes(user.name.first) ||
// 			names.includes(user.name.last) ||
// 			names.includes(user.name?.middle) ||
// 			names.includes(user.name?.preferred)
// 	);
// 	console.log({filtered});
// 	return filtered;
// };


const queryUsersAndPopulate = async (filter) => { 
	const names = filter.search.split(' ').map(each => caseInsensitiveRegex(each));
	// array of regex strings
	const promises = [];
	names.forEach(name => {
		console.log({name});
		promises.push(
			User.find({
				$or: [
					// {name: {first: {$regex: name}}},
					// {name: {middle: {$regex: name}}},
					// {name: {last: {$regex: name}}},
					// {name: {preferred: {$regex: name}}},

					{'name.first': {$regex: name}},
					{'name.middle': {$regex: name}},
					{'name.last': {$regex: name}},
					{'name.preferred':{$regex: name}},
				]
			}).populate(['profile, invite, house'])
		)
	})
	const results = (await Promise.allSettled(promises)).map(each => each.value);
	console.log({results});
	const all = results.reduce((accum, current) => {
		accum.concat(current);
	}, []);
	const unique = [...new Set(all)];
	return unique;
}

const queryVisaUsers = async (filter) => {
	const fullName = filter.search;
	const users = await queryUsersByFullName(fullName);
	// const users = await queryUsersAndPopulate(filter);
	await users.populate(['profile', 'invite', 'house']);
	console.log('users after populate:', { users });
	// console.log('queryVisaUsers service:', {users});
	return filterVisaProfiles(users);
};

module.exports = {
	getUserByEmail,
	getUserById,
	getUserByUsername,
	getUsersByFirstName,
	getUsersByLastName,
	getUsersByMiddleName,
	queryUsersByFullName,
	getUsersByPreferredName,
	createUser,
	updateUserById,
	getUserByIdAndPopulateFields,
	getUserByIdAndPopulate,
	putDocumentIdToUserId,
	putHouseIdToUserId,
	queryUsers,
	getAllUsersAndPopulate,
	queryUsersAndPopulate,
	getAllVisaUsers,
	queryVisaUsers,
};
