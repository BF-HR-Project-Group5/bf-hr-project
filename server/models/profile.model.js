const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const { config } = require('../config/constants');
const { roles } = require('../config/roles');

// When created, token will automatically create the expiresAt date
const ProfileSchema = new Schema(
	{
		ssn: { type: Number, required: true },
		dateOfBirth: { type: Date },
		gender: { type: String, enum: config.application.genders },
		photo: { type: String },
		address: {
			line1: { type: String, required: true },
			line2: { type: String },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zipcode: { type: String, required: true },
		},
		citizenType: { type: String, enum: config.application.citizenType, default: 'CITIZEN' }, // CITIZEN | "GREEN CARD" | "VISA" ???
		workAuth: {
			title: { type: String, enum: config.document.types, default: 'F1(CPT/OPT)' },
			startDate: { type: Date },
			endDate: { type: Date },
			daysRemaining: { type: Number }, // could also use -1 for infinite if needed
		},
		car: {
			make: { type: String },
			model: { type: String },
			color: { type: String },
		},
		license: {
			number: { type: String },
			expiration: { type: Date },
			link: { type: String, required: true},
		},
		phone: {
			mobile: { type: Number, required: true },
			work: { type: Number },
		},
		documents: [{ type: refType, ref: 'Document' }],
		feedback: { type: String },
		currentStepInt: { type: Number, default: 0 },
		currentStep: {
			type: String,
			enum: config.application.steps,
			default: config.application.steps[0],
		},
		emergencyContact: [
			{
				name: {
					first: { type: String, required: true },
					last: { type: String, required: true },
					middle: { type: String },
				},
				phone: { type: String },
				email: { type: String },
				relationship: { type: String },
			},
		],

		// overall application status
		status: { type: String, enum: config.document.statuses, default: 'PENDING' },
	},
	{ timestamps: true } // createdAt
);

const Profile = mongoose.model('Profile', ProfileSchema, 'Profile');

module.exports = Profile;
