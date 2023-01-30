const router = require('express').Router();
const controllers = require('../controllers/inviteController');

router.post(
	'/sendInvite',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.inviteNewEmployee
);

// router.post(
	// '/sendNotification/:user',
// 	// auth, // require user
// 	// authHr, // require user.role === 'hr'
// 	controllers.sendNot
// );

module.exports = router;