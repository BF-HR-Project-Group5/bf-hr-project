const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const { config } = require('../config/constants');

const ReportSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		createdBy: { type: String, required: true},
		status: { type: String, enum: config.reportStatus, default: 'OPEN' },
		comments: [{ type: refType, ref: 'Comment' }],
	},
	{ timestamps: true }
);

const Report = mongoose.model('Report', ReportSchema, 'Report');

module.exports = Report;
