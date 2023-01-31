const router = require('express').Router();
const controllers = require('../controllers/profileController');

// HR will submit user data to this path
router.get(
	'/profile/all',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.getAllProfiles
);

// router.get(
// 	'/invites/all',
// 	// auth, // require user
// 	// authHr, // require user.role === 'hr'
// 	controllers.getAllInvites
// );

module.exports = router;