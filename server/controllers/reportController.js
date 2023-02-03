const catchAsync = require('../utils/catchAsync');
const reportService = require('../services/reportService');
const userService = require('../services/userService');
const houseService = require('../services/houseService');

//get all facilityReport by houseid // only show comment_id, not full information
const getReports = catchAsync(async (req, res) => {
	const houseId = req.params.houseId;
	const house = await houseService.getHouseByIdAndPopulateFields(houseId);

	res.status(200).json({ reports: house.facilityReports });
});

// get all comments // no need houseId, need faicilty_id
// first reportId is 63d80ed7cbe3476841d3ea35
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/report/63d80ed7cbe3476841d3ea35/comment
const getReportsComments = catchAsync(async (req, res) => {
	const reportId = req.params.reportId;
	// console.log("this is" + reportId)
	const report = await reportService.getReportByIdAndPopulateFields(reportId);
	res.status(200).json({ comment: report.comments });
});

// create a facility report // done
const postCreateReport = catchAsync(async (req, res) => {
	const userId = req.user._id; // get logged-in user id
	const user = await userService.getUserById(userId);
	const report = await reportService.createReport(req.body);
	// //push the new report to the house
	const foundHouse = await houseService.getHouseById(user.house._id);
	foundHouse.reports.push(report);
	await foundHouse.save();

	const newHouse = await houseService.getHouseByIdAndPopulateFields(user.house._id);
	res.status(200).json({ reports: newHouse.reports, house: newHouse });
});

// create comment //done
//63d7f0930f7ade2b7b6c5f68 => first house
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/report/63d80ed7cbe3476841d3ea35/comment
const postComment = catchAsync(async (req, res) => {
	const reportId = req.params.reportId;
	const comment = await reportService.createComment(req.body);
	// // how to get facility_id
	const report = await reportService.getReportById(reportId);
	report.comments.push(comment._id);
	report.save();
	res.status(200).json({ report });
});

// modify comment
//modify comment1 63d8191e79b969073a624e0c

const putEditToComment = catchAsync(async (req, res) => {
	const commentId = req.params.commentId;
	const comment = await reportService.updateCommentById(commentId, req.body);
	res.status(200).json({ comment });
});

// delete comment by comment_id
// comment2 63d81dafc3761cf57adad194
const deleteComment = catchAsync(async (req, res) => {
	// get comment by ID
	const commentId = req.params.commentId;
	console.log(commentId);
	const deleteComment = await reportService.deleteCommentById(commentId);
	res.status(200).json({ deleteComment });
});

const putUpdateToReportId = catchAsync(async (req, res) => {
	const reportId = req.params.reportId;
	const report = await reportService.updateReportById(reportId, req.body);
	res.status(202).json({report});
})

const postCommentToReport = catchAsync(async(req, res) => {
	const reportId = req.params.reportId;
	const userId = req.user._id;
	const commentData = {
		description: req.body.description,
		createdBy: userId,
	};
	const {report, comment} = await reportService.addCommentToReportId(reportId, commentData);
	res.status(202).json({report, comment});
})


module.exports = {
	getReports,
	getReportsComments,
	postCreateReport,
	postComment,
	deleteComment,
	putEditToComment,
	putUpdateToReportId,
	postCommentToReport,
};
