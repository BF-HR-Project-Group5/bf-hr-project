const { config } = require( '../config/constants' );
const Profile = require('../models/profile.model');
const { caseInsensitiveRegex } = require('../utils/regexHelpers');

const getProfileById = async (id) => Profile.findById(id);

const createProfile = async (profileBody) => {
	const isNotVisa = profileBody.workAuth.title !== 'VISA'
	if (isNotVisa) {
		// is citizen or green card
		// complete with documents
		const stepInt = config.application.steps.length - 1;
		const stepString = config.application.steps[nextStepInt];
		profileBody.currentStepInt = stepInt;
		profileBody.currentStep = stepString;
	} else {
		const isNotOPT = profileBody?.document?.type === config.document.types[0];
		if (isNotOPT) {
			// they uploaded something other than OPT receipt
			// complete with documents
			const stepInt = config.application.steps.length - 1;
			const stepString = config.application.steps[nextStepInt];
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
}

// not really needed? can happen in the updateProfileById or createProfile
const addLicenseIdToProfileId = async (licenseId, profileId) => {
	const profile = await getProfileById(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'addDocumentIdToProfileId: Profile not found' };
	}

	profile.license.link = licenseId;
	await profile.save();
	return profile;
}



// // no need to export this one
// const changeStatusOfProfileId = async (profileId, status) => {
// 	const profile = await getProfileById(profileId);
// 	if (!profile) {
// 		throw { statusCode: 404, message: 'changeStatusOfProfileId: Profile not found' };
// 	}

// 	profile.status = status;
// 	await profile.save();
// 	return profile;
// }

const approveProfileId = async (profileId) => updateProfileById(profileId, {status: 'APPROVED'});
const rejectProfileId = async (profileId) => updateProfileById(profileId, {status: 'REJECTED'});
const rejectProfileIdWithFeedback = async (profileId, feedback) => updateProfileById(profileId, {status:'REJECTED', feedback});




// can get user and populate 'Documents', etc.
const getProfileByIdAndPopulate = async (profileId) => {
	const profile = await getProfileById(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'getProfileByIdAndPopulate: Profile not found' };
	}

	const promises = [];
	promises.push(profile.populate('documents'));
	promises.push(profile.license.populate('link'));

	await Promise.allSettled(promises);
	return profile;
};


// figure out what the "next step" is for documents
const getNextStepForProfileId = async (profileId) => {
	const profile = await getProfileByIdAndPopulate(profileId);
	if (!profile) {
		throw { statusCode: 404, message: 'getNextStepForProfileId: Profile not found' };
	}
	
	// return the nextStep for the profile.currentStep
	const currentStep = profile.currentStep;
	return config.application.nextSteps[currentStep];
}


module.exports = {
	getProfileById,
	getProfileByIdAndPopulate,
	createProfile,
	updateProfileById,
	addLicenseIdToProfileId,
	addDocumentIdToProfileId,
	approveProfileId,
	rejectProfileId,
	rejectProfileIdWithFeedback,
};
