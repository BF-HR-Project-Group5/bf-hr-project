exports.dateMongoToSimple = (date) => date.split('T')[0].replace('-', '/');

exports.genderNiceString = (gender) =>
	gender !== 'NO_RESPONSE'
		? gender.slice(0, 1) + gender.slice(1).toLowerCase()
		: 'Prefer not to answer';

exports.daysRemaining = (endDate) =>
	Math.floor((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
