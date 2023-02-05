// const House = require('../models/house.model');
const { House } = require('../models');
// CREATE house
const createHouse = async (houseBody) => {
	const promises = [];
	const messages = [];

	// keep logic - future enhancement: put more logic to check if house exists.
	if (houseBody.address) {
		promises.push(House.isAddressTaken(houseBody.address));
		messages.push({ statusCode: 409, message: 'createHouse: House already exists' });
	}

	const results = await Promise.all(promises);
	// console.log({ results });

	results.forEach((isTaken, index) => {
		if (isTaken == true) {
			console.log('createHouse: promise failed:', messages[index]);
			throw messages[index];
		}
	});

	return House.create(houseBody);
};

// GET ALL houses
const queryHouses = async () => {
	const houses = await House.find();
	return houses;
};

// /**
//  * Query for houses
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
// const queryUsers = async (options) => {
//     const houses = await House.paginate(options);
//     return houses;
// };

// GET ONE house
const getHouseById = (id) => House.findById(id);

const getHouseByIdAndPopulateFields = async (houseId) => {
	const house = await getHouseById(houseId);
	if (!house) {
		throw { statusCode: 404, message: 'getHouseByIdAndPopulateFields: House not found' };
	}

	await house.populate([
		{
			path: 'roommates',
			model: 'User',
		},
		{
			path: 'reports',
			model: 'Report',
			populate: [
				{
					path: 'comments',
					model: 'Comment',
					populate: { path: 'createdBy', model: 'User' },
				},
				{ path: 'createdBy', model: 'User' },
			],
		},
	]);

	return house;
};

const getHouseByIdAndPopulateUsers = async (houseId) => {
	const house = await getHouseById(houseId);
	if (!house) {
		throw { statusCode: 404, message: 'getHouseByIdAndPopulateUsers: House not found' };
	}
	// populate EVERYTHING
	await house.populate([
		{
			path: 'roommates',
			model: 'User',
			populate: [
				{
					path: 'profile',
					model: 'Profile',
					populate: {
						path: 'documents',
						model: 'Document',
					},
				},
				{ path: 'invite', model: 'Invite' },
			],
		},
		{
			path: 'reports',
			populate: [
				{
					path: 'comments',
					model: 'Comment',
					populate: {
						path: 'createdBy',
						model: 'User',
					},
				},
				{
					path: 'createdBy',
					model: 'User',
				},
			],
		},
	]);

	return house;
};

// GET HOUSE BY ADDRESS
const getHouseByAddressLine1 = async (address) => House.findOne({ address });

// UPDATE house
const updateHouse = async (houseId, updateBody) => {
	// const house = await getHouseById(houseId);
	const house = await House.findOneAndUpdate({ _id: houseId }, updateBody, {
		new: true,
		runValidators: true,
	});
	// console.log({ house });

	if (!house) {
		throw { statusCode: 404, message: 'updateHouse: House not found' };
	}
	// updates to the roommates should be handled on the user form
	// updates to the facility report should be handled on the facility reports

	// Object.assign(house, updateBody);
	// await house.save();
	return house;
};

const addReportIdToHouseId = async (reportId, houseId) => {
	const foundHouse = await getHouseById(houseId);
	foundHouse.reports.push(reportId);
	await foundHouse.save();
	return foundHouse;
}

// DELETE house
const deleteHouseById = async (houseId) => {
	const house = await getHouseById(houseId);
	if (!house) {
		throw { statusCode: 404, message: 'deleteHouse: House not found' };
	}
	await house.remove();
	return house;
};

const addUserIdToHouseId = (userId, houseId) =>
	updateHouse(houseId, {
		$push: { roommates: userId },
		$inc: { numResidents: 1 },
	});

const getHousesWithVacancies = () => House.find({numResidents: {$lt: 4}});

// NEW SERVICE: add user id to random house
// + NEW SERVICE: UPDATE numResidents
// ADD THIS TO REGISTRATION CONTROLLER
const assignUserIdToHouse = async (userId) => {
	// get houses with < 4 numResidents
	const houses = await getHousesWithVacancies();
	console.log('houses', houses);
	
	const houseIds = houses.map(h => h._id);

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max-min) + min);	
	}

	// get random index of the found houses
	let min = 0;
	let max = houses.length - 1;
	const randomIndex = randomNumber(min, max);
	console.log({randomIndex});
	
	// get the house
	const randomId = houseIds[randomIndex];
	console.log('randomId', randomId);

	return addUserIdToHouseId(userId, randomId);
};

module.exports = {
	getHouseById,
	getHouseByIdAndPopulateFields,
	queryHouses,
	getHouseByAddressLine1,
	createHouse,
	updateHouse,
	deleteHouseById,
	assignUserIdToHouse,
	addUserIdToHouseId,
	getHouseByIdAndPopulateUsers,
	addReportIdToHouseId,
};
