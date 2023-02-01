const router = require('express').Router();
const controllers = require('../controllers/inviteController');

// HR will submit user data to this path
router.post( // checked
	'/invites/send',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.inviteNewEmployee
);

router.get( // checked
	'/invites',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.getAllInvites
);

module.exports = router;