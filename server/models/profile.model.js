const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const { config } = require('../config/constants');
const { roles } = require( '../config/roles' );


// When created, token will automatically create the expiresAt date
const ProfileSchema = new Schema(
	{
		ssn: { type: Number, required: true },
		address: {
			line1: { type: String, required: true },
			line2: { type: String },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zipcode: { type: String, required: true },
		},
		workAuth: {
			title: { type: String},
			startDate: { type: Number},
			endDate: { type: Number},
			daysRemaining: { type: Number}, // could also use -1 for infinite if needed
		},
		car: {
			make: {type: String},
			model: {type: String},
			color: {type: String},
		},
		license: {
			number: {type: String},
			expiration: {type: Date},
			link: {type: refType, ref: 'Document'},
		},
		phone: {
			mobile: { type: Number, required: true },
			work: { type: Number },
		},
		documents: [{type: refType, ref: 'Document'}],

		// overall application status
		status: { type: String, enum: config.document.statuses, default: 'PENDING' },
	},
	{ timestamps: true } // createdAt
);

const Profile = mongoose.model('Profile', ProfileSchema, 'Profile');

module.exports = Profile;
