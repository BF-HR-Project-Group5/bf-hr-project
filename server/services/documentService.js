// handles saving Document objects to Mongoose
const Document = require('../models/document.model');
const removeEmptyFields = require( '../utils/removeEmptyFields' );

// find one
const getDocumentById = async (id) => Document.findById(id);
const getDocumentByLink = async (link) => Document.findOne({ link });

// find multiple
const getDocumentsByStatus = async (status) => Document.find({ status });
const getDocumentsByType = async (type) => Document.find({ type });

// create a document when the user submits a document file.
// Separately, we have the s3Service upload and provide us the link for this function
const createDocument = async (
	data = {
		link: '',
		feedback: '',
		status: 'PENDING',
		type: 'F1(CPT/OPT)',
	}
) => Document.create(data);

// takes id and updateBody, and only updates non-empty fields
const updateDocumentById = async (
	id,
	updateBody = { link: '', feedback: '', status: '', type: '' }
) => {
	const document = getDocumentById(id);

	if (!document) throw { statusCode: 404, message: 'Document not found' };

	// remove fields that have value of ''
	const nonEmptyUpdateObj = removeEmptyFields(updateBody);

	Object.assign(document, nonEmptyUpdateObj);
	await document.save();
	return document;
};

// const updateFieldById = async (id, field, value) => updateDocumentById(id, { [field]: value });
const rejectDocumentIdWithFeedback = async (id, feedback) => updateDocumentById(id, {feedback, status: 'REJECTED'});

const updateStatusById = async (id, status) => updateDocumentById(id, {status});

const approveDocumentId = async (id) => updateStatusById(id, 'APPROVED');
const pendingDocumentId = async (id) => updateStatusById(id, 'PENDING');
const rejectDocumentId = async (id) => updateStatusById(id, 'REJECTED');


// types and links should not need to be updated ??
// maybe if user  wants to replace a file, find and delete  one and then create a new one
// so here we delete, and in a different function we do the rest
const deleteDocumentById = async (id) => Document.findByIdAndDelete(id);

const replaceDocumentById = async (
	id,
	newDocumentBody = {
		link: '',
		feedback: '',
		status: 'PENDING',
		type: 'F1(CPT/OPT)',
	}
) => {
	await deleteDocumentById(id);
	return createDocument(newDocumentBody);
};

module.exports = {
	getDocumentById,
	getDocumentByLink,
	getDocumentsByStatus,
	getDocumentsByType,
	createDocument,
	updateDocumentById,
	rejectDocumentIdWithFeedback,
	approveDocumentId,
	rejectDocumentId,
	pendingDocumentId,
	deleteDocumentById,
	replaceDocumentById,
};
