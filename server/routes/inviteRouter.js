const router = require('express').Router();
const controllers = require('../controllers/inviteController');

router.post(
	'/sendInvite',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.inviteNewEmployee
);


module.exports = router;