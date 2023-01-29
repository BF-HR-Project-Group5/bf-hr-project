// type === title || name (for song || artist)
const pick = (
	object,
	keys,
	//  searchType = 'search'
) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			// obj[(key === 'search') ? searchType : key] = object[key];

			obj[key] = object[key];
		}
		return obj;
	}, {});
};

module.exports = pick;