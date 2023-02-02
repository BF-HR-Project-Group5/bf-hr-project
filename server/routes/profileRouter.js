const router = require('express').Router();
const controllers = require('../controllers/profileController');


// user routes
router.get( // checked
	'/profile',
	// auth // require user
	controllers.getProfile
	);
router.post( // checked
	'/profile/create',
	// auth // require user
	controllers.createProfile
	);
router.put( // checked
	'/profile/update',
	// auth // require user
	controllers.putUpdateProfile
	);

// 	// not needed? just get the profile and look inside for the status?
router.get( // checked
	'/profile/nextStep',
// auth, 
	controllers.getProfileNextStep
)


router.get( // checked
	'/profiles/visa',
// auth, authHr,
	controllers.getAllVisaProfiles
);
router.get( // checked
	'/profiles/visa/',
	// auth, authHr,
	controllers.queryVisaProfiles
);
// no data needs to be sent through body, so doing GET
router.get( // checked
	'/profiles/:userId/sendReminder',
	// auth, authHr,
	controllers.sendReminderToProfile
)

// get all users, populate profiles, send users with profiles
router.get( // checked
	'/profiles/all',
	// auth, authHr,
	controllers.getAllProfiles
);

// HR will submit user data to this path
router.get( // checked
	'/profiles/:userId',
	// auth, authHr,
	controllers.getProfileById
);

// query profiles
router.get( // checked
	'/profiles/',
	// auth, authHr,
	controllers.queryProfiles
);




module.exports = router;