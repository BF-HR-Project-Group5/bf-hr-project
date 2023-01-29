const inviteService = require('../services/inviteService');
const catchAsync = require('../utils/catchAsync');
const { config } = require('../config/constants');

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
			first: req.body.firstName,
			middle: req.body.middleName,
			last: req.body.lastName,
			preferred: req.body.preferredName,
		},
	};

	// create invite (check for unique email, create random token, create invite)
	const invite = await inviteService.createInvite(inviteData);


	// send the email to the req.body.email
	// emailService.sendEmail()

	return res.status(201).send({ invite });
});


module.exports = { inviteNewEmployee };
