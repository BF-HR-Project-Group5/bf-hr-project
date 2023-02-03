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

	console.log('make sure we have files in here', {files: req.files});
	const uploadPromises = [];
	// check for and upload profile photo
	const photo = req.files.photo[0] ?? undefined; // optional field
	if (photo) uploadPromises.push(s3Service.uploadFile(photo));
	// check for and upload license
	const license = req.files.license[0];
	if (!license) {
		throw {statusCode: 400, message: 'Please include a license'};
	} else {
		uploadPromises.push(s3Service.uploadFile(license));
	}
	
	const workAuth = req.files?.workAuth[0] ?? undefined; // may be undefined if they are citizen/green_card
	const isVisaStatus = req.body.workAuth.title !== 'CITIZEN' && req.body.workAuth.title !== 'GREEN_CARD';
	if (isVisaStatus) {
		if (!workAuth) {
			throw {statusCode: 400, message: 'Please include an OPT Receipt'};
		} else {
			uploadPromises.push(s3Service.uploadFile(workAuth));
		}
	}
	const results = await Promise.all(uploadPromises);
	console.log({results});
	const link = response.location;
	if (!link) throw {statusCode: 500, message: 'Error uploading document to S3'};
	// maybe need to save document here!
	// const thisFileLink = s3Service.upload([1])...
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
	const user = await userService.getUserByIdAndPopulate(req.user._id);
	if (!user) throw { statusCode: 404, message: 'User not found' };
	console.log('found user, should populate profile, which should have _id:', { user });

	// find profile and populate documents
	const profile = await profileService.getProfileByIdAndPopulate(user.profile._id);
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
	const nextStepForUser = await profileService.getUserNextStepForProfileId(user.profile._id);
	return res.status(200).json({ nextStep: nextStepForUser });
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

const queryProfiles = catchAsync(async (req, res) => {
	console.log('querying profiles:', { query: req.query });
	const { search: nameString } = pick(req.query, ['search']);
	console.log({ nameString });
	const foundUsers = await userService.queryUsersByFullNameAndPopulate(nameString);
	return res.status(200).json({ users: foundUsers, totalResults: foundUsers.length });
});

// req.query.search === 'some full name'
const queryVisaProfiles = catchAsync(async (req, res) => {
	console.log('querying profiles:', { query: req.query });
	const { search: nameString } = pick(req.query, ['search']);
	console.log({ nameString });
	const foundUsers = await userService.queryVisaUsersByFullNameAndPopulate(nameString);
	return res.status(200).json({ users: foundUsers, totalResults: foundUsers.length });
});

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
	queryVisaProfiles,
	sendReminderToProfile,
	getProfileNextStep,
};
