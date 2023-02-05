const router = require('express').Router();
const controllers = require('../controllers/profileController');
const auth = require('../middlewares/auth');
const authHr = require('../middlewares/authHr');
const {upload} = require('../utils/fileUtils');

// user routes
router.get(
	// checked
	'/profile',
	auth, // require user
	controllers.getProfile
);
router.post(
	// checked
	'/profile/create',
	auth, // require user
	upload.fields([
		{ name: 'photoFile', maxCount: 1 }, // profile photo
		{ name: 'licenseFile', maxCount: 1 }, // license photo
		{ name: 'workAuthFile', maxCount: 1 }, // work auth if needed
	]),
	controllers.createProfile
);
router.put(
	// checked
	'/profile/update',
	auth, // require user
	controllers.putUpdateProfile
);


// HR routes below:
router.get(
	// checked
	'/profiles/visa',
	auth,
	authHr,
	controllers.getAllVisaProfiles
);
router.get(
	// checked
	'/profiles/visa/',
	auth,
	authHr,
	controllers.queryVisaProfiles
);
// no data needs to be sent through body, so doing GET
router.get(
	// checked
	'/profiles/:userId/sendReminder',
	auth,
	authHr,
	controllers.sendReminderToProfile
);

// get all users, populate profiles, send users with profiles
router.get(
	// checked
	'/profiles/all',
	auth,
	authHr,
	controllers.getAllProfiles
);

// HR will submit user data to this path
router.get(
	// checked
	'/profiles/:userId',
	auth,
	authHr,
	controllers.getProfileById
);

// query profiles
router.get(
	// checked
	'/profiles/',
	auth,
	authHr,
	controllers.queryProfiles
);


// profiles/:userId/approve
router.get(
	'/profiles/:userId/approve',
	auth,
	authHr,
	controllers.approveProfile,
)

// profiles/:userId/reject //
router.post(
	'/profiles/:userId/reject',
	auth,
	authHr,
	controllers.rejectProfile,
)


module.exports = router;
