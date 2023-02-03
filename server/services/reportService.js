const Report = require('../models/report.model');
const Comment = require('../models/comment.model');

//create report
const createReport = async (data) => {
	return Report.create(data);
};
// create Comment
const createComment = async (comment) => {
	return Comment.create(comment);
};
//read
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/report/
const getReportById = async (id) => Report.findById(id);
// const getFacilityByDescription = async(description) => report.find({description})
// const getFacilityByTitle = async(title) => report.find({title})
const getCommentById = async (id) => Comment.findById(id);

// get report and populate fields of comments
//first report 63d80ed7cbe3476841d3ea35
const getReportByIdAndPopulateFields = async (reportId) => {
	//get HouseById not write
	const report = await Report.findById(reportId).populate('comments');

	return report;
};

//update

//update status for report
const updateReportById = async (id, updateBody) => {
	const report = await getReportById(id);
	if (!report) throw { statusCode: 404, message: 'Report not found' };
	Object.assign(report, updateBody);
	await report.save();
	return report;
};

//update the comment 63d8191e79b969073a624e0c
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/report/63d8191e79b969073a624e0c/comment
const updateCommentById = async (id, updateBody) => {
	const comment = await Comment.findById(id);
	if (!comment) throw { statusCode: 404, message: 'Comment not found' };
	Object.assign(comment, updateBody);
	await comment.save();
	return comment;
};

const addCommentToReportId = async (reportId, data) => {
	// create comment
	const comment = await createComment(data)
	// find report
	const report = await getReportById(reportId);
	// add comment to report
	report.comments.push(comment);
	// save
	await report.save();
	return {report, comment};
}

//delete report report
const deleteReportById = async (id) => Report.findByIdAndDelete(id);
const deleteCommentById = async (id) => Comment.findByIdAndDelete(id);

module.exports = {
	createReport,
	createComment,
	getReportById,
	// getFacilityByTitle,
	// getFacilityByDescription,
	getCommentById,
	getReportByIdAndPopulateFields,
	updateReportById,
	updateCommentById,
	deleteReportById,
	deleteCommentById,
	addCommentToReportId,
};
