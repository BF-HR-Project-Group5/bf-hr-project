const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const bcrypt = require('../utils/bcrypt');
const { config } = require('../config/constants');
const { roles } = require( '../config/roles' );


// When created, token will automatically create the expiresAt date
const UserSchema = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },

		// need name here so we can search by name when getting profiles
		// not required because we initialize this with ONLY username, password, email
		name: {
			first: { type: String},
			last: { type: String},
			middle: { type: String},
			preferred: { type: String },
		},

		role: {type: String, enum: roles, default: 'user', required: true},

		profile: {type: refType, ref: 'Profile'},
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
	// console.log('middleware to hash password');

	// hash password
	try {
		const hashResult = await bcrypt.hashPassword(user.password);
		// console.log('just before saving the password:', { hashResult });

		// save the password
		user.password = hashResult;
		next();

	} catch (error) {
		// console.log('hashPassword error:', { error });
		return next(error);
	}
});

// used on the document, i.e. foundUser.isPasswordMatch(inputPassword)
UserSchema.methods.isPasswordMatch = async function (password) {
	// console.log('~~running isPasswordMatch function:', {
	// 	currentPass: this.password,
	// 	submittedPass: password,
	// });

	try {
		// compare old password with hashed submitted password:
		const isMatching = await bcrypt.comparePassword(this.password, password);
		// console.log({ isMatching });
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
