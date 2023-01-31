const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));

const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

const inviteService = require('../services/inviteService');
const Invite = require('../models/invite.model');
const userService = require('../services/userService');
const User = require('../models/user.model');
const houseService = require('../services/houseService');
const House = require('../models/house.model');
const profileService = require('../services/profileService');
const Profile = require('../models/profile.model');
const documentService = require('../services/documentService');
const Document = require('../models/document.model');

const seedInvites = async (count) => {
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
	}
	const results = await Promise.all(invites);
	return results;
};

const seedInvitedUsers = async (count, invites, houses, profiles, role = 'user') => {
	const users = [];
	for (let i = 0; i < count; i++) {
		const data = {
			email: `email${i}@email.com`,
			username: `username${i}`,
			password: `password${i}`, // not pass validation once implemented
			// password: `P4$$w0rd${i}`, // passes validation

			name: {
				first: `first${i}`,
				middle: `middle${i}`,
				last: `last${i}`,
				preferred: `preferred${i}`,
			},

			role,
			invite: invites[i]._id, // add the created invite
			profile: profiles[i]._id,
			house: houses[i]._id,
		};
		users.push(userService.createUser(data));
	}
	const results = await Promise.all(users);
	return results;
};

const seedHouses = async (count) => {
	const houses = [];
	for (let i = 0; i < count; i++) {
		const data = {
			address: {
				line1: `addressLine1_${i}`,
				line2: `addressLine2_${i}`,
				city: `city_${i}`,
				state: `state_${i}`,
				zipcode: `55555(-5555)${i}`,
			},
			landlord: {
				legalFullName: `John Doe`,
				phone: Number(`999999999${i}`),
				email: `email${i}@email.com`,
			},
			roommates: [],
			houseInfo: {
				bedCount: 4,
				mattressCount: 4,
				tableCount: 1,
				chairCount: 4,
			},
			facilityReports: [],
		};
		houses.push(houseService.createHouse(data));
	}
	const results = await Promise.all(houses);
	return results;
};

const seedProfiles = async (count, documents) => {
	const profiles = [];
	for (let i = 0; i < count; i++) {
		const data = {
			ssn: Number(`99999999${i}`),
			address: {
				line1: `addressLine1_${i}`,
				line2: `addressLine2_${i}`,
				city: `city_${i}`,
				state: `state_${i}`,
				zipcode: `55555(-5555)${i}`,
			},
			workAuth: {
				title: (i % 2 === 0) ? 'VISA' : 'CITIZEN',
				startDate: '',
				endDate: '',
				daysRemaining: 99,
			},
			car: {
				make: 'Tesla',
				model: 'Roadster',
				color: 'Silver',
			},
			license: {
				number: `${i}abcde12345`,
				expiration: new Date(),
				document: documents[i+count],
			},
			phone: {
				mobile: Number(`999999999${i}`),
				// work
			},
			documents: [documents[i]],
			feedback: 'overall feedback on profile',
			emergencyContact: [
				{
					name: {
						first: `first${i}`,
						last: `last${i}`,
						middle: `middle${i}`,
					},
					phone: `999999999${i}`,
					email: `email${i}@email.com`,
					relationship: `BFF`,
				},
			],
			status: `PENDING`,
		};
		profiles.push(profileService.createProfile(data));
	}
	const results = await Promise.all(profiles);
	return results;
};

const seedDocuments = async (count) => {
	const documents = [];
	for (let i = 0; i < count; i++) {
		const data = {
			link: `www.some.aws.link.com`,
			feedback: 'feedback on document',
			status: `PENDING`,
			type: `F1(CPT/OPT)`,
		};
		documents.push(documentService.createDocument(data));
	}
	return Promise.all(documents);
};

const updateHouseRoommates = async (count, users, houses) => {
	const houseUpdates = [];
	for (let i = 0; i < count; i++){
		houseUpdates.push(houseService.addUserIdToHouseId(users[i]._id, houses[i]._id));
	}
	return Promise.all(houseUpdates);
}

const clearInvites = () => Invite.deleteMany({});
const clearUsers = () => User.deleteMany({ _id: { $ne: '63d6da694ba462d927745b7e' } });
const clearHouses = () => House.deleteMany({});
const clearProfiles = () => Profile.deleteMany({});
const clearDocuments = () => Document.deleteMany({});

async function run() {
	try {
		// connect mongoose
		const count = 5; // how many of each to make
		const documentCount = count * 2 // one license doc, one work auth doc
		mongoose.set('strictQuery', false);
		await mongoose.connect(MONGO_URL);
		console.log('Seed - Connected to DB');

		await Promise.allSettled([clearInvites(), clearUsers(), clearHouses(), clearProfiles(), clearDocuments()])

		// seed documents, houses, invites
		// const documents = await seedDocuments(5);
		// const houses = await seedHouses(5);
		// const invites = await seedInvites(5);
		const [documents, houses, invites] = (await Promise.allSettled([seedDocuments(documentCount), seedHouses(count), seedInvites(count)])).map(result => result.value);

		console.log({documents, houses, invites});

		// seed profiles and add a document
		const profiles = await seedProfiles(count, documents);

		// seed users and add invites, houses, profiles
		const users = await seedInvitedUsers(count, invites, houses, profiles);

		// update house roommates
		await updateHouseRoommates(count, users, houses);

		console.log('final users:', users);
	} catch (e) {
		console.log('error running seed:', e);
	} finally {
		console.log('~~ seed completed');
		mongoose.connection.close();
	}
}

run().catch(console.dir);
