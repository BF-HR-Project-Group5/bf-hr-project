// handles saving Document objects to Mongoose
const Document = require('../models/document.model');

// find one
const getDocumentById = async (id) => Document.findById(id);
const getDocumentByLink = async (link) => Document.findOne({link});

// find multiple
const getDocumentsByStatus = async (status) => Document.find({status});
const getDocumentsByType = async (type) => Document.find({type});


module.exports = {
	getDocumentById,
	getDocumentByLink,
	getDocumentsByStatus,
	getDocumentsByType,
};