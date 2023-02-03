//pass {mergeParams: true} to the child router if you want to access the params from the parent router
const router = require('express').Router({ mergeParams: true });
const controllers = require('../controllers/reportController');
const auth = require('../middlewares/auth');
const authHr = require('../middlewares/authHr');

// router.get( // don't think we need this, because we're always getting from a house or from a user
// 	'/', 
// //	auth,
// 	controllers.getFacilityReports
// );

// user routes (for current req.user or req.user.house._id)
// all user routes assume we are getting the house and reports from req.user
router.post( // checked // for current user, for current house, create a report in that house
	'/report/create', 
	auth,
	controllers.postCreateReport
);
router.put( // not needed?? // for current user, for current house, for given facilityId, edit the facility report
	'/report/:reportId', 
	auth,
	controllers.putUpdateToReportId
)
router.post( // checked // for current user, for current house, for given facilityId, post a comment
	'/report/:reportId/comment', 
	auth,
	controllers.postComment
);
router.put( // checked // for current user, for current house, for given commentId, edit the comment // should check that the owner of the comment is the current user
	'/comment/:commentId', 
	auth,
	controllers.putEditToComment
);



// HR routes
// hr routes: the facility id and house depends on which house they've clicked on or which report they've clicked on
router.put( // checked // edit the report 
	'/reports/:reportId', 
	auth, authHr,
	controllers.putUpdateToReportId
);
router.get( // checked // get comments of a report
	'/reports/:reportId/comments', 
	auth, authHr,
	controllers.getReportsComments
);
router.post( // checked // post a comment to a report
	'/reports/:reportId/comments', 
	auth, authHr,
	controllers.postCommentToReport,
);
router.put( // checked // edit a comment
	'/comments/:commentId',
	auth, authHr,
	controllers.putEditToComment
);
router.delete( // checked // delete a comment
	'/comments/:commentId', 
	auth, authHr,
	controllers.deleteComment
);

module.exports = router;