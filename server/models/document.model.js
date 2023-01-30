const mongoose = require('mongoose');
const { config } = require('../config/constants');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema(
	{
		link: { type: String },
		feedback: { type: String, maxlength: 256 },
		status: { type: String, enum: config.document.statuses, default: 'PENDING'},
		type: { type: String, enum: config.document.types, default: 'F1(CPT/OPT)' },
	},
	{ timestamps: true }
);


// could add a 'isLinkTaken' function if we want to guarantee one link cannot be used for multiple documents ?

const Document = mongoose.model('Document', DocumentSchema, 'Document');

module.exports = Document;
