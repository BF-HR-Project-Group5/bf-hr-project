
const { pruneDataForPutInfo, validatePasswordsMatch, isOldPasswordExists } = require('../utils/validate');
const userService = require('../services/userService');
const profileService = require('../services/profileService');
const inviteService = require('../services/inviteService');
// const tokenService = require('../services/tokenService');
const catchAsync = require( '../utils/catchAsync' );



// already logged in, so we have req.user
// this needs to update the profile, and update the user.name
// could also update the invite.name
// need to add profile to user
const createProfile = catchAsync(async (req, res) => {
	console.log('createProfile controller:', { reqUser: req.user, reqBody: req.body });
	const userId = req.user._id;
	const name = req.body.name; // grab name object from body

	// create profile
	const profile = await profileService.createProfile(req.body);

	// update user.name and user.profile
	const userUpdate = {
		name,
		profile: profile._id,
	}
	const user = await userService.updateUserById(userId, userUpdate);

	// update invite.name for this user
	const inviteId = user.invite;
	const inviteUpdate = {
		name,
	}
	const invite = await inviteService.updateInviteById(inviteId, inviteUpdate);

	res.status(200).json({user, profile, invite});
});

// take the req.user and look up the profile
const getProfile = catchAsync(async (req, res) => {
	console.log('getProfile controller, get current user profile:', { reqUser: req.user, reqBody: req.body })

	// look up user so we know which profile id to find
	const user = await userService.getUserById(req.user._id);
	if (!user) throw {statusCode: 404, message: 'User not found'};
	console.log('found user, should populate profile, which should have _id:', {user});

	// find profile and populate documents
	const profile = await profileService.getProfileByIdAndPopulate(user.profile);
	if (!profile) throw {statusCode: 404, message: 'Profile not found'};
	console.log('found profile:', {profile});

	return res.status(200).json({user, profile});
});

// take the req.user, look up profile, put edit to profile
const putUpdateProfile = catchAsync(async (req, res) => {
	console.log('putUpdateProfile controller, get current user profile:', { reqUser: req.user, reqBody: req.body })

	// look up user so we know which profile id to find
	const user = await userService.getUserById(req.user._id);
	if (!user) throw {statusCode: 404, message: 'User not found'};
	console.log('found user, should populate profile, which should have _id:', {user});

	// update profile
	const profile = await profileService.updateProfileById(user.profile, req.body);
	if (!profile) throw {statusCode: 404, message: 'Profile not found'};
	console.log('found profile:', {profile});

	return res.status(200).json({user, profile});
});

// // what to return...
// // just get the profile and use frontend logic to check the documents and statuses
// const getProfileStatus = catchAsync(async (req, res) => {

// })


const getAllProfiles = catchAsync(async (req, res) => {
	console.log('getAllProfiles');

	const users = await userService.queryUsers();
	const populated = users.map(user => user.populate(['profile', 'invite', 'house']));
	const results = (await Promise.allSettled(populated)).map(promise => promise.value);

	console.log('should have everything populated in all users?:', {users, results});
	return res.status(200).json({users: results})
})



const sendReminder = catchAsync(async (req, res) => {
	console.log('sendReminder to userId');

	return res.status(202).json({message: 'Success sending notification'});
})


module.exports = {
	createProfile,
	getProfile,
	putUpdateProfile,
	getAllProfiles,
	sendReminder,
};