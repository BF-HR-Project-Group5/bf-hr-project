//pass {mergeParams: true} to the child router if you want to access the params from the parent router
const router = require('express').Router({ mergeParams: true });
const controllers = require('../controllers/facilityController');
const auth = require('../middlewares/auth');

// user routes (for current req.user or req.user.house._id)
// all user routes assume we are getting the house and reports from req.user
// router.get( // don't think we need this, because we're always getting from a house or from a user
// 	'/', 
// 	auth,
// 	controllers.getFacilityReports
// );
router.post( // checked // for current user, for current house, create a report in that house
	'/report/create', 
	// auth,
	controllers.postFacility
);
// router.put( // not needed?? // for current user, for current house, for given facilityId, edit the facility report
	// '/report/:facilityId/edit', 
	//auth,
	// controllers.putEditFacilityReport
// )
router.post( // checked // for current user, for current house, for given facilityId, post a comment
	'/report/:facilityId/comment', 
	// auth,
	controllers.postComment
);
router.put( // checked // for current user, for current house, for given commentId, edit the comment // should check that the owner of the comment is the current user
	'/comment/:commentId/edit', 
	// auth,
	controllers.putComment
);



// HR routes
// hr routes: the facility id and house depends on which house they've clicked on or which report they've clicked on
// router.put( // checked // edit the report 
// 	'/report/:facilityId', 
	// auth, authHr,
// 	controllers.putEditFacilityReport
// );
router.get( // checked // get comments of a report
	'/report/:facilityId/comments', 
	// auth, authHr,
	controllers.getFacilityReportsComments
);
// router.post( // checked // post a comment to a report
	// '/report/:facilityId/comments', 
	// auth, authHr,
	// controllers.addCommentToReportId
// );
// router.put( // checked // edit a comment
	// 'comments/:commentId',
	// auth, authHr,
	// controllers.putEditCommentToReportId
// );
router.delete( // checked // delete a comment
	'/comments/:commentId', 
	// auth, authHr,
	controllers.deleteComment
);

module.exports = router;