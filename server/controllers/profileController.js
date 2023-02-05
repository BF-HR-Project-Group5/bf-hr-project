const {
	pruneDataForPutInfo,
	validatePasswordsMatch,
	isOldPasswordExists,
} = require('../utils/validate');
const userService = require('../services/userService');
const profileService = require('../services/profileService');
const inviteService = require('../services/inviteService');
const emailService = require('../services/emailService');
const s3Service = require('../services/s3Service');
const documentService = require('../services/documentService');
// const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { objectValuesToRegex } = require('../utils/regexHelpers');
const { config } = require( '../config/constants' );

// already logged in, so we have req.user
// this needs to update the profile, and update the user.name
// could also update the invite.name
// need to add profile to user
const createProfile = catchAsync(async (req, res) => {
	console.log('createProfile controller:', { reqUser: req.user, reqBody: req.body, req: req });
	const userId = req.user._id;

	console.log('files:', {
		license: req.body.licenseFile,
		workAuth: req.body.workAuthFile,
		photo: req.body.photoFile,
	});
	const uploadPromises = [];

	// check for work auth
	const workAuth = req.body.workAuthFile ?? undefined;
	const isCitizen = req.body.citizenType === 'Citizen' || req.body.citizenType === 'Green Card';
	if (!isCitizen) {
		if (!workAuth) {
			throw { statusCode: 400, message: 'Please include an OPT Receipt' };
		} else {
			uploadPromises.push(s3Service.uploadFileFromBuffer(workAuth, userId));
		}
	}

	// check for and upload license
	const license = req.body.licenseFile ?? undefined;
	if (license) uploadPromises.push(s3Service.uploadFileFromBuffer(license, userId));

	// check for and upload (optional) profile photo
	const photo = req.body.photoFile ?? undefined; // optional field
	if (photo) uploadPromises.push(s3Service.uploadFileFromBuffer(photo, userId));

	// get the results
	const results = await Promise.all(uploadPromises);
	console.log({ results });

	// break each file out of the array of upload results:

	// if we have work auth, need to build a document for it
	if (workAuth) {
		const { Location, Key } = results.shift();
		if (!Location) {
			throw { statusCode: 500, message: 'Error uploading work auth to S3' };
		} else {
			// create document for work auth
			const workAuthDocument = await documentService.createDocument({
				link: Location,
				feedback: '',
				status: 'PENDING',
				type: req.body.workAuth.title,
			});

			// finalize the work auth
			req.body.documents = [workAuthDocument._id];
		}
	}

	// if we have a license, save the link
	if (license) {
		const { Location, Key } = results.shift();
		if (!Location) {
			throw { statusCode: 500, message: 'Error uploading license to S3' };
		} else {
			// add it to the profile
			req.body.license.link = Location;
		}
	}

	// if we have a photo, save the link
	if (photo) {
		const { Location, Key } = results.shift();
		if (!Location) {
			throw { statusCode: 500, message: 'Error uploading profile photo to S3' };
		} else {
			// add link to req.body?
			req.body.photo = Location;
		}
	}

	// make citizenType and gender match our constants
	req.body.citizenType = req.body.citizenType.toUpperCase().replace(' ', '_');
	const uppercaseGender = req.body.gender.toUpperCase();
	req.body.gender = (uppercaseGender !== 'MALE' && uppercaseGender !== 'FEMALE') ? 'NO_RESPONSE' : uppercaseGender;

	console.log('final body before creating profile:', req.body);

	// create profile!!
	const profile = await profileService.createProfile(req.body);

	// update user.name and user.profile
	const name = req.body.name; // grab name object from body
	const userUpdate = {
		name,
		profile: profile._id,
	};
	// update current user with the data, then we can update the invite
	const user = await userService.updateUserById(userId, userUpdate);

	// update invite.name for this user's invite, just to stay consistent
	const inviteUpdate = {
		name,
	};
	const invite = await inviteService.updateInviteById(user.invite, inviteUpdate);

	// done!!!
	res.status(200).json({ user, profile, invite });
});

// take the req.user and look up the profile
const getProfile = catchAsync(async (req, res) => {
	console.log('getProfile controller, get current user profile:', {
		reqUser: req.user,
		reqBody: req.body,
	});

	// look up user so we know which profile id to find
	const user = await userService.getUserByIdAndPopulate(req?.user?._id);
	if (!user) throw { statusCode: 404, message: 'User not found' };
	console.log('found user, should populate profile, which should have _id:', { user });

	// find profile and populate documents
	const profile = await profileService.getProfileByIdAndPopulate(user?.profile?._id);
	if (!profile) throw { statusCode: 404, message: 'Profile not found' };
	console.log('found profile:', { profile });

	return res.status(200).json({ user, profile });
});

// take the req.user, look up profile, put edit to profile
// When updating, should fail if profile.status === 'PENDING'
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

	const updatedUser = await userService.getUserByIdAndPopulate(user._id);
	return res.status(200).json({ user: updatedUser, profile });
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
	const user = await userService.getUserByIdAndPopulate(userId);
	const nextStepCode = user?.profile?.nextStep;
	const nextSteps = config.application.nextStepsObj[nextStepCode];

	console.log({ nextStepCode, nextSteps });
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


const approveProfile = catchAsync(async (req, res) => {
	const userId = req.params.userId
	// approve the profile
	const user = await userService.getUserById(userId);
	if (!user) throw { statusCode: 404, message: 'User not found' };

	await profileService.approveProfileId(user?.profile);

	const updatedUser = await userService.getUserByIdAndPopulate(userId);

	return res.status(202).json({user: updatedUser});
});

const rejectProfile = catchAsync(async (req, res) => {
	const userId = req.params.userId
	const {feedback} = req.body;
	// reject the profile
	const user = await userService.getUserById(userId);
	if (!user) throw { statusCode: 404, message: 'User not found' };

	await profileService.rejectProfileIdWithFeedback(user?.profile, feedback);

	const updatedUser = await userService.getUserByIdAndPopulate(userId);

	return res.status(202).json({user: updatedUser});
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
	rejectProfile,
	approveProfile,
};
