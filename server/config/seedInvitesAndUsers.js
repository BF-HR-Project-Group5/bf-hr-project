const inviteService = require('../services/inviteService');
const User = require('../models/user.model');

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
		};
		invites.push(inviteService.createInvite(data));
	}
	const results = await Promise.all(invites);
	console.log({results});
};

const seedUsers = (count) => {
	// create a user for each invite
};
