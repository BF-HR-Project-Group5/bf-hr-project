const inviteService = require('../services/inviteService');
const catchAsync = require('../utils/catchAsync');
const { config } = require('../config/constants');
const emailService = require('../services/emailService');
const { getUserById } = require('../services/userService');

/**
should be protected by `auth` and `authHr`
Data is already validated, and sender is already authorized to be HR.
What do we need to do?
		check the email is not taken, (happens in the service for us)
		else:
			create an Invite (with unique token), and send off the registration email

  req.body === {email, firstName, middleName, lastName, preferredName}
 */
const inviteNewEmployee = catchAsync(async (req, res) => {
	console.log('invite new employee: (requires auth and authHr)');
	console.log('req.body:', req.body);

	// format data from req.body
	const inviteData = {
		email: req.body.email,
		name: {
			first: req.body.name.first,
			middle: req.body.name.middle,
			last: req.body.name.last,
			preferred: req.body.name.preferred,
		},
		isRegistered: req.body.isRegistered
	};

	// create invite (check for unique email, create random token, create invite)
	const invite = await inviteService.createInvite(inviteData);

	const data = {
		link: invite.link,
		name: {
			first: req.body.name.first,
			last: req.body.name.last,
		},
		email: req.body.email,
		isRegistered: req.body.isRegistered
	}

	// send the email to the req.body.email
	const response = await emailService.sendInvite(data)

	return res.status(201).send({ invite, response });
});

// 
const sendNotification = catchAsync(async (req, res) => {
	const userId = req.params.userId
	const user = await getUserById(userId)
	const fullUserInfo = await getUserById(userId).populate('profile')
	const documents = await fullUserInfo.profile.populate('documents')

	const inviteData = {
		name: {
			first: user.name.first,
			last: user.name.last
		},
		email: user.email,
		isRegistered: req.body.isRegistered

	}
	// create invite (check for unique email, create random token, create invite)
		const invite = await inviteService.createInvite(inviteData);

		const data = {
			link: invite.link,
			name: {
				first: req.body.name.first,
				last: req.body.name.last,
			},
			email: req.body.email,
			isRegistered: req.body.isRegistered
		}

		const response = await emailService.sendReminder(data)

		return res.status(201).send({ invite, response });
	




})



module.exports = 
{ 
	inviteNewEmployee,
	sendNotification
 };
