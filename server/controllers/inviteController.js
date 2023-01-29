const inviteService = require('../services/inviteService');
const catchAsync = require('../utils/catchAsync');

const inviteNewEmployee = catchAsync(async (req, res) => {
	console.log('invite new employee, should require user and should require role: hr');

	const userId = req.user._id; // get id from req.user
	
	
	
	// hr person will...
	// input the data, it's sent and validated...
	
	// so here we should check if email is taken
	//if not, we should create a token, create an invite, and send an email with the invite link


})