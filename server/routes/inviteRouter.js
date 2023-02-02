const router = require('express').Router();
const controllers = require('../controllers/inviteController');
const authHr = require('../middlewares/authHr');

// HR will submit user data to this path
router.post( // checked
	'/invites/send',
	auth, authHr,
	controllers.inviteNewEmployee
);

router.get( // checked
	'/invites',
	auth, authHr,
	controllers.getAllInvites
);

module.exports = router;