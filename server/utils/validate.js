exports.validatePasswordsMatch = ({password, repeatPassword}) => {
	if (!password === repeatPassword) throw `Changes NOT saved. New passwords do not match`;
	return true;
}

// verify old password exists
exports.isOldPasswordExists = (data) => {
	if (!data.oldPassword) throw 'Changes NOT saved. Old password is required!';
	return true;
}

exports.pruneDataForPutInfo = (data) => {
	// remove out nulls/empties
	const filteredData = Object.fromEntries(Object.entries(data).filter((entry) => !!entry[1] && entry[0] !== data.repeatPassword));
	console.log('should have no nulls or empties, no repeatPassword:', {filteredData});

	return filteredData;
}