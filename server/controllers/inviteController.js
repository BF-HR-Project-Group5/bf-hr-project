const inviteService = require('../services/inviteService');
const catchAsync = require('../utils/catchAsync');
const crypto = require('node:crypto');
const { config } = require('../config/constants');

// should be protected by `auth` and `authHr`
// Data is already validated, and sender is already authorized to be HR.
// What do we need to do?
// 		check the email is not taken, (happens in the service for us)
// 		else:
//			create the "token", create an Invite, and send off the registration email
/**
 *  req.body === {email, firstName, middleName, lastName, preferredName}
 */
const inviteNewEmployee = catchAsync(async (req, res) => {
	console.log('invite new employee: (requires auth and authHr)');
	console.log('req.body:', req.body);

	// create unique "token" to act as the url param for their special link
	const token = crypto.randomBytes(16).toString('hex');
	console.log('randomHex token:', token);

	const inviteData = {
		email: req.body.email,
		token,
		name: {
			first: req.body.firstName,
			middle: req.body.middleName,
			last: req.body.lastName,
			preferred: req.body.preferredName,
		},
		link: `${config.frontendBaseUrl}/register/${token}`,
	};

	const invite = await inviteService.createInvite(inviteData);
	return res.status(201).send({ invite });
});

module.exports = { inviteNewEmployee };
