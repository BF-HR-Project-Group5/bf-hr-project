const router = require('express').Router();
const controllers = require('../controllers/profileController');


// user routes
router.get(
	'/profile',
	// auth // require user
	controllers.getProfile
	);
router.post(
	'/profile/create',
	// auth // require user
	controllers.createProfile
	);
router.put(
	'/profile/update',
	// auth // require user
	controllers.putUpdateProfile
	);

// 	// not needed? just get the profile and look inside for the status?
router.get(
	'/profile/nextStep',
	// auth // require user
	controllers.getProfileNextStep
)


router.get(
	'/profiles/visa/all',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.getAllVisaProfiles
);
// router.get(
// 	'/profiles/visa/',
// 	// auth, // require user
// 	// authHr, // require user.role === 'hr'
// 	controllers.queryVisaProfiles
// );
// no data needs to be sent through body, so doing GET
router.get(
	'/profiles/:userId/sendReminder',
	controllers.sendReminderToProfile
)

router.get(
	'/profiles/all',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.getAllProfiles
);

// HR will submit user data to this path
router.get(
	'/profiles/:userId',
	// auth, // require user
	// authHr, // require user.role === 'hr'
	controllers.getProfileById
);

// query profiles
// router.get(
// 	'/profiles/',
// 	// auth, // require user
// 	// authHr, // require user.role === 'hr'
// 	controllers.queryProfiles
// );




module.exports = router;