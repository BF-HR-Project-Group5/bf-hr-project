const Invite = require('../models/invite.model');
const { caseInsensitiveRegex } = require('../utils/regexHelpers');

// get singular invites
const getInviteById = (id) => Invite.findById(id);
const getInviteByEmail = (email) => Invite.findOne({ email });
const getInviteByToken = (token) => Invite.findOne({ token });
const getInviteByLink = (link) => Invite.findOne({ link });

// get multiple invites
const getInvitesByFirstName = (firstName) =>
	Invite.find({ name: { first: caseInsensitiveRegex(firstName) } });
const getInvitesByLastName = (lastName) =>
	Invite.find({ name: { last: caseInsensitiveRegex(lastName) } });
const getInvitesByMiddleName = (middleName) =>
	Invite.find({ name: { middle: caseInsensitiveRegex(middleName) } });
const getInvitesByPreferredName = (preferredName) =>
	Invite.find({ name: { preferred: caseInsensitiveRegex(preferredName) } });

const queryInvites = (filter) => Invite.find(filter);

// get invites that are registered; or can pass in `false` to get unregistered invites
const getInvitesByIsRegistered = (isRegistered = true) =>
	Invite.find({ isRegistered: isRegistered });

const getInvitesByFullName = async (fullName) => {
	const names = fullName.split(' '); // fullName = 'John Doe'

	const filter = {
		$or: [
			{ name: { first: { $or: names } } },
			{ name: { last: { $or: names } } },
			{ name: { middle: { $or: names } } },
			{ name: { preferred: { $or: names } } },
		],
	};

	return queryInvites(filter);
};

// when an HR person creates an invite, the email should be unique.
// (Afterwards, when the user registers using the link, they need to use (this email or ) a unique email, and also a unique username)
// const createFacilityReport = async (data) => {
// 	// 
// 	return FacilityReport.create(data);
// }



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

const putIsRegisteredToInviteId = async (id) => {
	const invite = getInviteById(id);
	invite.isRegistered = true;
	await invite.save();
	return invite;
};

module.exports = {
	getInviteById,
	getInviteByEmail,
	getInviteByToken,
	getInviteByLink,

	getInvitesByFirstName,
	getInvitesByLastName,
	getInvitesByMiddleName,
	getInvitesByPreferredName,
	queryInvites,
	getInvitesByIsRegistered,
	getInvitesByFullName,
	createInvite,
	putIsRegisteredToInviteId,
};
