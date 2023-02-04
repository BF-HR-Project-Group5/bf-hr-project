const { config } = require('../config/constants');
const Profile = require('../models/profile.model');
const { caseInsensitiveRegex } = require('../utils/regexHelpers');

const getProfileById = async (id) => Profile.findById(id);

const createProfile = async (profileBody) => {
	const isNotVisa = profileBody.workAuth.title !== 'VISA';
	if (isNotVisa) {
		// is citizen or green card
		// complete with documents
		const completedStepInt = config.application.nextStepCode.length - 1;
		const stepString = config.application.steps[completedStepInt];
		profileBody.currentStepInt = completedStepInt;
		profileBody.currentStep = stepString;
	} else {
		const isNotOPT = profileBody?.document?.type === config.document.types[0];
		if (isNotOPT) {
			// they uploaded something other than OPT receipt
			// complete with documents
			const stepInt = config.application.steps.length - 1;
			const stepString = config.application.steps[stepInt];
			profileBody.currentStepInt = stepInt;
			profileBody.currentStep = stepString;
		} else {
			// they uploaded an OPT receipt
			profileBody.currentStepInt = 0;
			profileBody.currentStep = config.application.steps[0];
		}
	}
	return Profile.create(profileBody);
};

// can update the entire body, including adding a license or document.
const updateProfileById = async (profileId, updateBody) => {
	const profile = await getProfileById(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'updateProfileById: Profile not found' };
	}

	Object.assign(profile, updateBody);
	await profile.save();
	return profile;
};

// for when visa status employees need to add more documents later on
const addDocumentIdToProfileId = async (docId, profileId) => {
	const profile = await getProfileById(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'addDocumentIdToProfileId: Profile not found' };
	}

	profile.documents.push(docId);
	await profile.save();
	return profile;
};

// not really needed? can happen in the updateProfileById or createProfile
const addLicenseIdToProfileId = async (licenseId, profileId) => {
	const profile = await getProfileById(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'addDocumentIdToProfileId: Profile not found' };
	}

	profile.license.link = licenseId;
	await profile.save();
	return profile;
};

const approveProfileId = async (profileId) => {
	const profile = await getProfileById(profileId);
	// should prevent approving a rejected application
	if (profile.status === 'REJECTED') throw {statusCode: 403, message: 'Profile must be updated before approving'}
	// should prevent approving an approved application
	if (profile.status === 'APPROVED') throw {statusCode: 403, message: 'Profile already approved'}

	return updateProfileById(profileId, { status: 'APPROVED' });
}

const rejectProfileIdWithFeedback = async (profileId, feedback) =>{
	const profile = await getProfileById(profileId);
	// should prevent rejecting a rejected application
	if (profile.status === 'REJECTED') throw {statusCode: 403, message: 'Profile already rejected'}
	// should prevent rejecting an approved application
	if (profile.status === 'APPROVED') throw {statusCode: 403, message: 'Profile already approved'}

	return updateProfileById(profileId, { status: 'REJECTED', feedback });
}

// can get user and populate 'Documents', etc.
const getProfileByIdAndPopulate = async (profileId) => {
	const profile = await getProfileById(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'getProfileByIdAndPopulate: Profile not found' };
	}

	return profile.populate({
		path: 'documents',
		model: 'Document',
	});
};

const putStepToNextForProfileId = async (profileId) => {
	const profile = await getProfileById(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'putStepToNextForProfileId: Profile not found' };
	}

	const isAlreadyComplete = profile.currentStepInt === config.application.nextStepCode.length - 1;
	if (isAlreadyComplete) return profile;

	// if NOT already complete...
	// get next int, get next step string
	const nextStepInt = profile.currentStepInt++;
	const nextStepCode = config.application.nextStepCode[nextStepInt];

	// save next int and string
	profile.nextStep = nextStepCode;
	profile.currentStepInt = nextStepInt;
	await profile.save();
	return profile;
};

module.exports = {
	getProfileById,
	getProfileByIdAndPopulate,
	createProfile,
	updateProfileById,
	addLicenseIdToProfileId,
	addDocumentIdToProfileId,
	approveProfileId,
	rejectProfileIdWithFeedback,
	putStepToNextForProfileId,
};
