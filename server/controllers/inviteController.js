const inviteService = require('../services/inviteService');
const catchAsync = require('../utils/catchAsync');

const inviteNewEmployee = catchAsync(async (req, res) => {
	console.log('invite new employee, should require user and should require role: hr');

	const userId = req.user._id; // get id from req.user
	
	// hr person will...


})