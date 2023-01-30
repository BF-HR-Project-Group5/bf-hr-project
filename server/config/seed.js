const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));

const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

const inviteService = require('../services/inviteService');
const Invite = require('../models/invite.model');
const userService = require('../services/userService');
const User = require( '../models/user.model' );

const seedInvites = async (count) => {
	// create a handful of invites
	// save them...
	const invites = [];
	for (let i = 0; i < count; i++) {
		const data = {
			email: `email${i}@email.com`,
			name: {
				first: `first${i}`,
				middle: `middle${i}`,
				last: `last${i}`,
				preferred: `preferred${i}`,
			},
			isRegistered: false,
		};
		invites.push(inviteService.createInvite(data));
		console.log('pushing invite:', data);
	}
	const results = await Promise.all(invites);
	console.log('inviteResults:', { results });
	return results;
};

const seedInvitedUsers = async (count, invites, role = 'user') => {
	// create a user for each invite

	const users = [];
	for (let i = 0; i < count; i++) {
		const data = {
			name: {
				first: `first${i}`,
				middle: `middle${i}`,
				last: `last${i}`,
				preferred: `preferred${i}`,
			},
			email: `email${i}@email.com`,
			username: `username${i}`,
			password: `password${i}`, // not pass validation once implemented
			// password: `P4$$w0rd${i}`, // passes validation
			ssn: Number(`99999999${i}`),
			address: {
				line1: `addressLine1_${i}`,
				line2: `addressLine2_${i}`,
				city: `city_${i}`,
				state: `state_${i}`,
				zipcode: `55555(-5555)${i}`,
			},
			/// workAuth
			/// license
			phone: {
				mobile: Number(`999999999${i}`),
				// work
			},
			role,
			invite: invites[i]._id, // add the created invite
		};
		users.push(userService.createUser(data));
		console.log('pushing user:', data);
	}
	const results = await Promise.all(invites);
	console.log('userResults:', { results });
	// now should have users and invites!
	return results;
};

const clearInvites = () => Invite.deleteMany({});
const clearUsers = () => User.deleteMany({_id: {$ne: '63d6da694ba462d927745b7e'}});



async function run() {
	try {
		// connect mongoose
		mongoose.set('strictQuery', false);
		await mongoose.connect(MONGO_URL);
		console.log('Seed - Connected to DB');

		await clearInvites();
		await clearUsers();

		// seed invites/users
		const invites = await seedInvites(5);

		const users = await seedInvitedUsers(5, invites);
		console.log('final users:', users);

	} catch (e) {
		console.log('error seeding invites and users:', e);

	} finally {
		console.log('~~ seed completed');
		// mongoose.connection.close();
	}
}

run().catch(console.dir);
