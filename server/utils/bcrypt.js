const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// returns error or hash of the password
const hashPassword = (password) => bcrypt.hash(password, SALT_WORK_FACTOR);


// takes two hashed passwords and compares them
const comparePassword = (currentPassword, plaintextPassword) => {
	console.log('~~running comparePassword function:', {currentPassword, plaintextPassword});

	return bcrypt.compare(plaintextPassword, currentPassword);
	}


module.exports = {hashPassword, comparePassword};