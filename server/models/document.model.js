
const mongoose = require('mongoose');
const { config } = require( '../config/constants' );
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
		link: { type: String },
		feedback: { type: String, maxlength: 256 },
		status: { type: String, enum: config.documentStatus, default: 'PENDING' },
		type: { type: String, enum: config.documentTypes, default: 'F1(CPT/OPT)' },
},
{timestamps: true});

const Document = mongoose.model('Document', DocumentSchema, 'Document');

module.exports = Document;