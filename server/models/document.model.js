
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
		link: { type: String },
		feedback: { type: String, maxlength: 256 },
		status: { type: String, enum: documentStatus, default: 'PENDING' },
		type: { type: String, enum: documentTypes, default: 'OPT' },
});

const Document = mongoose.model('Document', DocumentSchema, 'Document');

module.exports = Document;