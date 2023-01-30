//pass {mergeParams: true} to the child router if you want to access the params from the parent router
const router = require('express').Router({ mergeParams: true });
const controllers = require('../controllers/facilityController');
const auth = require('../middlewares/auth');

router.get('/', controllers.getFacilityReports);
// router.get('/house/123/:ud', controllers.getTest);
router.get('/:facilityId/comment', controllers.getFacilityReportsComments);
router.post('/', controllers.postFacility);
router.post('/:facilityId/comment', controllers.postComment);
router.delete('/:commentId/comment', controllers.deleteComment);
router.put('/:commentId/comment',controllers.putComment);

module.exports = router;