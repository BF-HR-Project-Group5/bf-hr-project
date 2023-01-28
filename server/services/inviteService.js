const Invite = require('../models/invite.model');
const { caseInsensitiveRegex } = require( '../utils/regexHelpers' );

const getInviteById = (id) => Invite.findById(id);
const getInviteByEmail = (email) => Invite.findOne({email});

const getInvitesByFirstName = (firstName) => Invite.find({name: {first: caseInsensitiveRegex(firstName)}});
const getInvitesByLastName = (lastName) => Invite.find({name: {last: caseInsensitiveRegex(lastName)}});
const getInvitesByMiddleName = (middleName) => Invite.find({name: {middle: caseInsensitiveRegex(middleName)}});
const getInvitesByPreferredName = (preferredName) => Invite.find({name: {preferred: caseInsensitiveRegex(preferredName)}});