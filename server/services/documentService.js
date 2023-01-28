// handles saving Document objects to Mongoose
const Document = require('../models/document.model');

const getDocumentById = async (id) => Document.findById(id);
const getDocumentByLink = async (link) => Document.findOne({link});
const getDocumentsByStatus = async (status) => Document.find({status});
const getDocumentsByType = async (type) => Document.find({type});


module.exports = {
	getDocumentById,
	getDocumentByLink,
	getDocumentsByStatus,
	getDocumentsByType,
};