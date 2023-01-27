const passwordMixed = (type) => (value, helpers) => {
	if (!value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/)) {
		return helpers.message(
			`"${type}" must contain one upper and lowercase letter, one number, and one special character`
		);
	}
	return value;
};

const username = (value, helpers) => {
	if (!value.match(/^\w+$/)) {
		return helpers.message('"username" can only contain word characters, and no spaces');
	}
	return value;
};

module.exports = {
	username,
	passwordMixed,
};
