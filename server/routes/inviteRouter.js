const router = require('express').Router();
const controllers = require('../controllers/inviteController');

// HR will submit user data to this path
router.post(
	'/invites/send',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.inviteNewEmployee
);

router.get(
	'/invites/all',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.getAllInvites
);

module.exports = router;