exports.dateMongoToSimple = (date) => date.split('T')[0].replaceAll('-', '/');
exports.dateSimpleToMongo = (date) => {
	const newDate = new Date(date).toISOString();
	console.log('dateSimpleToMongo:', { date, newDate });

	return newDate.split('T')[0].replaceAll('-', '/');
};

exports.genderNiceString = (gender) =>
	gender !== 'NO_RESPONSE'
		? gender.slice(0, 1) + gender.slice(1).toLowerCase()
		: 'Prefer not to answer';

exports.genderUglyString = (gender) =>
	gender !== 'Prefer not to answer' ? gender.toUpperCase() : 'NO_RESPONSE';

exports.daysRemaining = (endDate) =>{
	const days = (Math.floor((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
	return days < 0 ? 'Expired' : days;
}

exports.citizenTypeNice = (type) =>
	type
		.replaceAll('_', ' ')
		.split(' ')
		.map((w) => w[0] + w.slice(1).toLowerCase())
		.join(' ');

exports.citizenTypeUgly = (type) => type.replaceAll(' ', '_').toUpperCase();

exports.workAuthNice = (title) =>
	title === 'OTHER' ? `${title[0]}${title.slice(1).toLowerCase()}` : title;

exports.workAuthUgly = (title) =>title.toUpperCase();