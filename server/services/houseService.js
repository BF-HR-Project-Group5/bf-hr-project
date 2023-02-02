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

const getHouseByIdAndPopulateFields = async (houseId, fieldNames) => {
	const house = await getHouseById(houseId);
	if (!house) {
		throw { statusCode: 404, message: 'getUserByIdAndPopulateFields: House not found' };
	}
	const promises = [];
	for (let i = 0; i < fieldNames.length; i++) {
		promises.push(house.populate(fieldNames[i]));
		// console.log('getHouseByIdAndPopulate', promises);
	}
	await Promise.allSettled(promises);
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

// NEW SERVICE: add user id to random house
// + NEW SERVICE: UPDATE numResidents
// ADD THIS TO REGISTRATION CONTROLLER
const assignUserIdToHouse = async (userId) => {
	const houses = await queryHouses();
	console.log('houses', houses);

	let min = 0;
	let max = houses.length;
	// get random number
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	// if there are more than 4 residents find another house.
	// if(roommatesArr.length < 4) {
	// randomly assign house by id
	const randomId = randomNumber(houses[min], houses[max]);
	console.log('randomId', randomId);

	// const houseId = getHouseById(randomId);
	// console.log('houseId', houseId);

	// const roommatesArr = House.findOne({ _id: houseId }).populate(roommates);
	// console.log('roommatesArr', roommatesArr)
	// const house = await updateHouse(houseId, { roommates: roommatesArr.push(userId), numResidents: roommatesArr.length })
	// }

	const foundHouse = await getHouseById(randomId);
	console.log('foundHouse', foundHouse);

	return addUserIdToHouseId(userId, foundHouse._id);
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
};
