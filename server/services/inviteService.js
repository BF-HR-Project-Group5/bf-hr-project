const { User } = require('../models');
const Invite = require('../models/invite.model');
const { caseInsensitiveRegex } = require('../utils/regexHelpers');

const getInviteById = (id) => Invite.findById(id);
const getInviteByEmail = (email) => Invite.findOne({ email });

const getInvitesByFirstName = (firstName) =>
	Invite.find({ name: { first: caseInsensitiveRegex(firstName) } });
const getInvitesByLastName = (lastName) =>
	Invite.find({ name: { last: caseInsensitiveRegex(lastName) } });
const getInvitesByMiddleName = (middleName) =>
	Invite.find({ name: { middle: caseInsensitiveRegex(middleName) } });
const getInvitesByPreferredName = (preferredName) =>
	Invite.find({ name: { preferred: caseInsensitiveRegex(preferredName) } });

const getInviteByToken = (token) => Invite.findOne({ token });
const getInviteByLink = (link) => Invite.findOne({ link });

// get invites that are registered; or can pass in `false` to get unregistered invites
const getInvitesByRegistered = (isRegistered = true) => Invite.find({ isRegistered: isRegistered });

// when an HR person creates an invite, the email should be unique.
// (Afterwards, when the user registers using the link, they need to use (this email or ) a unique email, and also a unique username)
// data: {email, token, name: {first, last, middle, preferred}, link, isRegistered: false,}
const createInvite = async (
	data = {
		email: '',
		token: '',
		name: { first: '', last: '', middle: '', preferred: '' },
		link: '',
		isRegistered: false,
	}
) => {
	// check for email taken
	if (await Invite.isEmailTaken(data.email)) {
		throw { statusCode: 409, message: 'Email is already taken' };
	}

	// create it?
	return Invite.create(data);
};
