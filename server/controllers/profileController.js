const {
	pruneDataForPutInfo,
	validatePasswordsMatch,
	isOldPasswordExists,
} = require('../utils/validate');
const userService = require('../services/userService');
const profileService = require('../services/profileService');
const inviteService = require('../services/inviteService');
const emailService = require('../services/emailService');
// const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { objectValuesToRegex } = require('../utils/regexHelpers');

// already logged in, so we have req.user
// this needs to update the profile, and update the user.name
// could also update the invite.name
// need to add profile to user
const createProfile = catchAsync(async (req, res) => {
	console.log('createProfile controller:', { reqUser: req.user, reqBody: req.body });
	const userId = req.user._id;
	const name = req.body.name; // grab name object from body

	// maybe need to save document here!
	// s3Service.upload...
	// documentService.create...

	// create profile
	const profile = await profileService.createProfile(req.body);

	// update user.name and user.profile
	const userUpdate = {
		name,
		profile: profile._id,
	};
	const user = await userService.updateUserById(userId, userUpdate);

	// update invite.name for this user
	const inviteId = user.invite;
	const inviteUpdate = {
		name,
	};
	const invite = await inviteService.updateInviteById(inviteId, inviteUpdate);

	res.status(200).json({ user, profile, invite });
});

// take the req.user and look up the profile
const getProfile = catchAsync(async (req, res) => {
	console.log('getProfile controller, get current user profile:', {
		reqUser: req.user,
		reqBody: req.body,
	});

	// look up user so we know which profile id to find
	const user = await userService.getUserById(req.user._id);
	if (!user) throw { statusCode: 404, message: 'User not found' };
	console.log('found user, should populate profile, which should have _id:', { user });

	// find profile and populate documents
	const profile = await profileService.getProfileByIdAndPopulate(user.profile);
	if (!profile) throw { statusCode: 404, message: 'Profile not found' };
	console.log('found profile:', { profile });

	return res.status(200).json({ user, profile });
});

// take the req.user, look up profile, put edit to profile
const putUpdateProfile = catchAsync(async (req, res) => {
	console.log('putUpdateProfile controller, get current user profile:', {
		reqUser: req.user,
		reqBody: req.body,
	});

	// look up user so we know which profile id to find
	const user = await userService.getUserById(req.user._id);
	if (!user) throw { statusCode: 404, message: 'User not found' };
	console.log('found user, should populate profile, which should have _id:', { user });

	// update profile
	const profile = await profileService.updateProfileById(user.profile, req.body);
	if (!profile) throw { statusCode: 404, message: 'Profile not found' };
	console.log('found profile:', { profile });

	return res.status(200).json({ user, profile });
});

// the user gets their profile status AKA next step
const getProfileNextStep = catchAsync(async (req, res) => {
	// get the profile, get the user
	const userId = req.user._id;
	const user = await userService.getUserById(userId);
	const nextStep = await profileService.getNextStepForProfileId(user.profile._id);
	return res.status(200).json({nextStep});
});

// should be auth and authHr protected
const getAllProfiles = catchAsync(async (req, res) => {
	console.log('getAllProfiles');
	const users = await userService.getAllUsersAndPopulate();
	return res.status(200).json({ users, totalResults: users.length });
});

// should be auth and authHr protected
// /profile/:userId
// Returns User object (with profile inside)
const getProfileById = catchAsync(async (req, res) => {
	console.log('getProfileById controller, get a user profile:', { reqBody: req.body });
	const userId = req.params.userId;

	// look up user so we know which profile id to find
	const user = await userService.getUserByIdAndPopulate(userId);
	if (!user) throw { statusCode: 404, message: 'User not found' };
	console.log('found user:', { user });

	// return early if no profile
	if (!user.profile) {
		return res.status(200).json({ user });
	}

	// find profile and populate documents
	const profile = await profileService.getProfileByIdAndPopulate(user.profile._id);
	if (!profile) throw { statusCode: 404, message: 'Profile not found' };
	console.log('found profile:', { profile });

	return res.status(200).json({ user });
});

const getAllVisaProfiles = catchAsync(async (req, res) => {
	console.log('get all Visa profiles');

	const foundUsers = await userService.getAllVisaUsers();
	return res.status(200).json({ users: foundUsers, totalResults: foundUsers.length });
});


	// what do I want to do?
	// Maybe something like this:
	// return any result where:
	// 	queryString.includes name.first
	// 	queryString.includes name.last
	// etc

	// more complex:
	// return any results where:
	// queryString.split(' ') each word regex
	// check each name field against each regex word

	// so I could make different queries for each word regex
	//or for every option
	// User.find({name: {first: {$regex: regexWords[0]}}})
	// User.find({name: {first: {$regex: regexWords[1]}}})
	// User.find({name: {first: {$regex: regexWords[2]}}})
	// User.find({name: {last: {$regex: regexWords[0]}}})
	// ...

// // use search query
const queryProfiles = catchAsync(async (req, res) => {
	console.log('querying profiles:', { query: req.query });
	const {search: nameString} = pick(req.query, ['search']);
	console.log({nameString});
	const foundUsers = await userService.queryUsersAndPopulate(nameString);
	return res.status(200).json({users: foundUsers, totalResults: foundUsers.length});
});

// req.query.search === 'some full name'
// const queryVisaProfiles = catchAsync( async (req, res) => {
// 	console.log('querying Visa profiles:', { query: req.query });
// 	const picked = pick(req.query, ['search']);
// 	// const filter = objectValuesToRegex(picked);
// 	console.log({picked});


// 	// get users based on name filter, and populate fields
// 	const foundUsers = await userService.queryVisaUsers(picked);
// 	return res.status(200).json({users: foundUsers, totalResults: foundUsers.length});
// })

// take param for profile
// get the user
// get the next step
// send the email
const sendReminderToProfile = catchAsync(async (req, res) => {
	console.log('sendReminder to userId:', { reqParam: req.params });
	const userId = req.params.userId;
	// get user, and profile id
	const user = await userService.getUserById(userId);

	let nextSteps = await profileService.getNextStepForProfileId(user?.profile);
	console.log({ nextSteps });
	// example:
	// nextSteps === {user: 'Please wait for HR to approve your OPT receipt.', hr: 'OPT receipt needs approval'};
	
	const data = {
		name: { first: user.name.first, last: user.name.last },
		email: user.email,
		nextStep: nextSteps.user,
	};
	emailService.sendReminder(data);
	return res.status(202).json({ message: `Notification sent to ${user.email}` });
});

module.exports = {
	createProfile,
	getProfile,
	getProfileById,
	putUpdateProfile,
	getAllProfiles,
	getAllVisaProfiles,
	queryProfiles,
	// queryVisaProfiles,
	sendReminderToProfile,
	getProfileNextStep,
};
