const inviteService = require('../services/inviteService');
const emailService = require('../services/emailService');
const catchAsync = require('../utils/catchAsync');
const { config } = require('../config/constants');

/**
should be protected by `auth` and `authHr`
Data is already validated, and sender is already authorized to be HR.
What do we need to do?
		check the email is not taken, (happens in the service for us)
		else:
			create an Invite (with unique token), and send off the registration email

  req.body === {email, name: {firstName, middleName?, lastName, preferredName?}}
 */
const inviteNewEmployee = catchAsync(async (req, res) => {
	console.log('invite new employee: (requires auth and authHr)');
	console.log('req.body:', req.body);

	// format data from req.body
	const inviteData = {
		email: req.body.email,
		name: {
			first: req.body.name.first,
			last: req.body.name.last,
			middle: req.body.name.middle,
			preferred: req.body.name.preferred,
		},
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
	};

	// send the email to the req.body.email
	const response = await emailService.sendInvite(data);

	return res.status(201).send({ invite, response });
});


const getAllInvites = catchAsync(async (req, res) => {
	console.log('getting all invites');
	// get all invites
	const invites = await inviteService.getAllInvites();
<<<<<<< HEAD
	return res.status(200).send({invites});
=======
	return res.status(200).send({invites, totalResults: invites.length});
>>>>>>> master
})

module.exports = { inviteNewEmployee, getAllInvites };
