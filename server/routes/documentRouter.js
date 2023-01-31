const router = require('express').Router();
const controllers = require('../controllers/documentController');

// user routes
// user create document
router.post(
	'/documents/create',
	// auth // require user
	controllers.createDocument
	);
	// user get their documents
router.get(
	'/documents',
	// auth // require user
	controllers.getAllDocumentsFromUser
	);





	// hr routes
// router.get(
// 	'/documents/from/:userId',
// 	// auth // require user
// 	controllers.putUpdateProfile
// 	);
router.get(
	'/documents/:documentId/approve',
	// auth // require user
	controllers.approveDocument
	);
router.post(
	'/documents/:documentId/reject',
	// auth // require user
	controllers.rejectDocument
	);

module.exports = router;