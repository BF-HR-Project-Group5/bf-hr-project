const router = require('express').Router();
const controllers = require('../controllers/documentController');

// user routes
// user create document
router.post(  // checked
	'/document/create',
	// auth // require user
	controllers.createDocument
	);
	// user get their documents
router.get( // checked
	'/document',
	// auth // require user
	controllers.getAllDocumentsFromUser
	);





	// hr routes
// router.get(
// 	'/documents/from/:userId',
// 	// auth // require user
// 	controllers.putUpdateProfile
// 	);
router.get( // checked
	'/documents/:documentId/approve',
	// auth // require user
	controllers.approveDocument
	);
router.post( // checked
	'/documents/:documentId/reject',
	// auth // require user
	controllers.rejectDocument
	);

module.exports = router;