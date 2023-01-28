const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { config } = require('../config/constants');

// created upon HR sending an invite email
// minimum amount of data for inviting a potential employee
const InviteSchema = new Schema(
	{
		email: { type: String, required: true },
		token: { type: String, required: true },
		name: {
			first: { type: String, required: true },
			last: { type: String, required: true },
			middle: { type: String },
			preferred: { type: String },
		},
		link: { type: String, required: true },
		isRegistered: { type: Boolean, required: true },

		expiresAt: {
			type: Number, // Date.now() returns number of ms since jan 1 1970
			default: Date.now() + config.registration.expiresAfterMinutes * 1000 * 60, // convert minutes to ms
		},
	},

	{ timestamps: true }
);

// when registering a new potential employee, just need to check if email doesn't exist
InviteSchema.statics.isEmailTaken = async function (email) {
	const invite = await this.findOne({ email });
	return !!invite; // return true or false
};

const Invite = mongoose.model('Invite', InviteSchema, 'Invite');

module.exports = Invite;
