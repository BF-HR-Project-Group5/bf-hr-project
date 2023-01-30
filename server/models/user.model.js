const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
// const House = require('./house.model');
const bcrypt = require('../utils/bcrypt');
const { config } = require('../config/constants');
const { roles } = require( '../config/roles' );


// When created, token will automatically create the expiresAt date
const UserSchema = new Schema(
	{
		name: {
			first: { type: String, required: true },
			last: { type: String, required: true },
			middle: { type: String},
			preferred: { type: String },
		},



		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		// profile
		// invite
		// house
		// role



		
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
		license: {
			number: {type: String},
			expiration: {type: Date},
			link: {type: refType, ref: 'Document'},
		},
		phone: {
			mobile: { type: Number, required: true },
			work: { type: Number },
		},
		role: {type: String, enum: roles, default: 'user', required: true},

		documents: [{type: refType, ref: 'Document'}],

		applicationStatus: { type: String, enum: config.documentStatus, default: 'PENDING' },

		invite: { type: refType, ref: 'Invite' },
		house: { type: refType, ref: 'House' },
	},
	{ timestamps: true } // createdAt
);

// before saving, hash password if it's changed
UserSchema.pre('save', async function (next) {
	const user = this;

	//only hash password if it's modified/new
	if (!user.isModified('password')) return next();
	console.log('middleware to hash password');

	// hash password
	try {
		const hashResult = await bcrypt.hashPassword(user.password);
		console.log('just before saving the password:', { hashResult });

		// save the password
		user.password = hashResult;
		next();
	} catch (error) {
		console.log('hashPassword error:', { error });
		return next(error);
	}
});

// used on the document, i.e. foundUser.isPasswordMatch(inputPassword)
UserSchema.methods.isPasswordMatch = async function (password) {
	console.log('~~running isPasswordMatch function:', {
		currentPass: this.password,
		submittedPass: password,
	});

	try {
		// compare old password with hashed submitted password:
		const isMatching = await bcrypt.comparePassword(this.password, password);
		console.log({ isMatching });
		return Promise.resolve(isMatching);
	} catch (error) {
		console.log('Error comparing hashes:', { error });
		return Promise.reject(error);
	}
};

UserSchema.methods.isHr = async function() {
	return this.role === 'hr'
}

// used on the schema i.e. User.isEmailTaken()
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
	return !!user;
};

UserSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
	const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
	return !!user;
};

const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;
