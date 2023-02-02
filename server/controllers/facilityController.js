const catchAsync = require('../utils/catchAsync');
const facilityService = require('../services/facilityService');
const Comment = require('../models/document.model');
const Facility = require('../models/FacilityReport.model');

//get all facilityReport by houseid // only show comment_id, not full infomation
const getFacilityReports = catchAsync(async (req, res) => {
	const houseId = req.params.houseId;
	const house = await facilityService.getHouseByIdAndPopulateFields(houseId);

	res.status(200).json({ facilityReports: house.facilityReports });
});

// get all comments // no need houseId, need faicilty_id
// first facilityId is 63d80ed7cbe3476841d3ea35
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/facility/63d80ed7cbe3476841d3ea35/comment
const getFacilityReportsComments = catchAsync(async (req, res) => {
	const facilityId = req.params.facilityId;
	// console.log("this is" + facilityId)
	const facility = await facilityService.getFacilityByIdAndPopulateFields(facilityId);
	res.status(200).json({ comment: facility.comments });
});

// create a faclity report // done
const postFacility = catchAsync(async (req, res) => {
	const houseId = req.params.houseId;
	const facility = await facilitySerice.createFacility(req.body);
	// //push the new facility to the house
	const house = await facilityService.getHouseById(houseId);
	house.facilityReports.push(facility._id);
	house.save();
	res.status(200).json({ house });
});

// create comment //done
//63d7f0930f7ade2b7b6c5f68 => first house
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/facility/63d80ed7cbe3476841d3ea35/comment
const postComment = catchAsync(async (req, res) => {
	const facility_Id = req.params.facilityId;
	const comment = await facilityService.createComment(req.body);
	// // how to get facility_id
	const facility = await facilityService.getFacilityById(facility_Id);
	facility.comments.push(comment._id);
	facility.save();
	res.status(200).json({ facility });
});

// modify comment
//modify comment1 63d8191e79b969073a624e0c

const putEditToComment = catchAsync(async (req, res) => {
	const commentId = req.params.commentId;
	const comment = await facilityService.updateCommentById(commentId, req.body);
	res.status(200).json({ comment });
});

// delete comment by comment_id
// comment2 63d81dafc3761cf57adad194
const deleteComment = catchAsync(async (req, res) => {
	// get comment by ID
	const commentId = req.params.commentId;
	console.log(commentId);
	const deleteComment = await facilityService.deleteCommentById(commentId);
	res.status(200).json({ deleteComment });
});

const putUpdateToFacilityId = catchAsync(async (req, res) => {
	const facilityId = req.params.facilityId;
	const facility = await facilityService.updateFacilityById(facilityId, req.body);
	res.status(202).json({facility});
})

const postCommentToFacilityReport = catchAsync(async(req, res) => {
	const facilityId = req.params.facilityId;
	const userId = req.user._id;
	const commentData = {
		description: req.body.description,
		createdBy: userId,
	};
	const {facility, comment} = await facilityService.addCommentToFacilityId(facilityId, commentData);
	res.status(202).json({facility, comment});
})


module.exports = {
	getFacilityReports,
	getFacilityReportsComments,
	postFacility,
	postComment,
	deleteComment,
	putEditToComment,
	putUpdateToFacilityId,
postCommentToFacilityReport,
};
