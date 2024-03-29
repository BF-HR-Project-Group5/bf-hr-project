const userService = require('../services/userService');
const profileService = require('../services/profileService');
const documentService = require('../services/documentService');
const s3Service = require('../services/s3Service');
const catchAsync = require('../utils/catchAsync');
const { config } = require( '../config/constants' );

// already logged in
// 1. get user from id, get profile from user
// 2. take body document/file and upload to s3
// 3. take link and type and create a document
// 4. add document to profile
// 5. return document

// body: { document: fileToUpload, type: nameTypeOfFile (string) }
const createDocument = catchAsync(async (req, res) => {
	console.log('createDocument controller:', { reqUser: req.user, reqBody: req.body });
	const userId = req.user._id;

	const user = await userService.getUserById(userId);
	if (!user) throw { statusCode: 404, message: 'User not found' };

	const profile = await profileService.getProfileById(user.profile);
	if (!profile) throw { statusCode: 404, message: 'Profile not found' };

	// upload the file, and get the response
	console.log('make sure we have a file in here', { file: req.file  });
	const file = req.file;
	if (!file) throw { statusCode: 400, message: 'Please include a file' };
	const response = await s3Service.uploadFile(file);

	const link = response.Location;
	if (!link) throw { statusCode: 500, message: 'Error uploading document to S3' };
	const thisDocType = config.document.types2[
Math.floor(profile.currentStepInt/2)
	] ;

	// save document
	const document = await documentService.createDocument({
		link, // link to the s3 url for this document
		feedback: '',
		// type: req.body.type,
		type: thisDocType,
	});

	// add the document to the profile
	profile.documents.push(document._id);

	// save the profile
	await profile.save();

	// increase the step???
	const freshProfile = await profileService.putStepToNextForProfileId(profile._id);
	const freshUser = await userService.getUserByIdAndPopulate(userId);

	return res.status(202).send({ document, profile: freshProfile, user: freshUser });
});

// get all documents from logged-in user
// get user,
// get profile and populate
//return documents array
const getAllDocumentsFromUser = catchAsync(async (req, res) => {
	console.log('getAllDocumentsForUser controller:', { reqUser: req.user, reqBody: req.body });
	const userId = req.user._id;

	const user = await userService.getUserById(userId);
	if (!user) throw { statusCode: 404, message: 'User not found' };

	const profile = await profileService.getProfileByIdAndPopulate(user.profile);
	if (!profile) throw { statusCode: 404, message: 'Profile not found' };

	return res.status(202).send({ user, profile, documents: profile.documents });
});

// replaceDocument ???

// /documents/:documentId/approve (GET or POST)
// do I update the user's nextStep?
const approveDocument = catchAsync(async (req, res) => {
	const docId = req.params.documentId;
	const document = await documentService.approveDocumentId(docId);

	// should step forward the profile's currentStep???
	const userProfile = await profileService.putStepToNextForProfileWithDocumentId(docId);

	return res.status(200).send({ document, profile: userProfile });
});

// /documents/:documentId/reject POST
const rejectDocument = catchAsync(async (req, res) => {
	const docId = req.params.documentId;
	const feedback = req.body.feedback;
	const document = await documentService.rejectDocumentIdWithFeedback(docId, feedback);
	return res.status(200).send({ document });
});

module.exports = {
	createDocument,
	getAllDocumentsFromUser,
	approveDocument,
	rejectDocument,
};
