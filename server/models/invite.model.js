const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { config } = require('../config/constants');
const crypto = require('node:crypto');

// created upon HR sending an invite email
// minimum amount of data for inviting a potential employee
const InviteSchema = new Schema(
	{
		email: { type: String, required: true },
		token: { type: String },
		name: {
			first: { type: String, required: true },
			last: { type: String, required: true },
			middle: { type: String },
			preferred: { type: String },
		},
		link: { type: String },
		isRegistered: { type: Boolean, required: true, default: false },

		expiresAt: {
			type: Number, // Date.now() returns number of ms since jan 1 1970
			default: Date.now() + config.invite.expiresAfterMinutes * 1000 * 60, // convert minutes to ms
		},
	},

	{ timestamps: true }
);

InviteSchema.pre('save', async function(next) {

	// generate token and link
	const token = crypto.randomBytes(16).toString('hex');
	const link = `${config.frontendBaseUrl}/signup/${token}`;
	console.log('inviteSchema generated randomHex token:', token);

	// save token and link
	this.token = token;
	this.link = link;
	next();
})

// returns boolean
InviteSchema.methods.isTokenExpired = async function() {
	return Date.now() >= this.expiresAt;
}

// when registering a new potential employee, just need to check if email doesn't exist
InviteSchema.statics.isEmailTaken = async function(email) {
	const invite = await this.findOne({ email });
	return !!invite; // return true or false
};

// // returns boolean;
// InviteSchema.statics.isTokenExpired = async function(token) {
// 	const foundInvite = await this.findOne({token});
// 	return foundInvite.isTokenExpired();
// }

const Invite = mongoose.model('Invite', InviteSchema, 'Invite');

module.exports = Invite;
