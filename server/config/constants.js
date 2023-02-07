const allStatuses = {
	PENDING: 'PENDING',
	APPROVED: 'APPROVED',
	REJECTED: 'REJECTED',
}
// exports.allStatuses = allStatuses;
const statusEnum = Object.keys(allStatuses);
// exports.statusEnum = statusEnum;

exports.config = {
	tokenExpirationMinutes: 15, // login token
	invite: {
		expiresAfterMinutes: 180,
	},
	reportStatus: ['OPEN', 'IN_PROGRESS', 'CLOSED'],

	// document model: status, doctype
	document: {
		statuses: statusEnum,
		allTypes:[ 'F1(CPT/OPT)', 'H1-B', 'L2', 'H4', 'OTHER', 'OPT_EAD', 'I-983', 'I-20',],
		types: [ 'F1(CPT/OPT)', 'H1-B', 'L2', 'H4', 'OTHER'],
		types2: [ 'F1(CPT/OPT)', 'OPT_EAD', 'I-983', 'I-20',],
	},

	// profile or application: status, steps
	application: {
		statuses: statusEnum,
		citizenType: ['CITIZEN' , 'GREEN_CARD' , 'VISA'],

		genders: ['MALE' , 'FEMALE' , 'NO_RESPONSE'],


		nextStepCode: [
			'OPT_RECEIPT_WAIT', // uploaded, next step is wait for approval
			'OPT_EAD_UPLOAD', // doc is accepted, next step is upload next doc
			'OPT_EAD_WAIT',
			'I-983_UPLOAD',
			'I-983_WAIT',
			'I-20_UPLOAD',
			'I-20_WAIT',
			'COMPLETED'
		],
		
		nextStepsObj: {
			// should have 1 document minimum, so the first phase is waiting for HR approval
			OPT_RECEIPT_WAIT: {
				user: 'Please wait for HR to approve your OPT receipt.',
				hr: 'OPT receipt needs approval.'
			},
			OPT_EAD_UPLOAD: {
				user: 'Please upload your OPT EAD.',
				hr: 'Waiting on OPT EAD upload.'
			},
			OPT_EAD_WAIT: {
				user: 'Please wait for HR to approve your OPT EAD.',
				hr: 'OPT EAD needs approval.'
			},
			'I-983_UPLOAD': {
				user: 'Please upload your I-983.',
				hr: 'Waiting on I-983 upload.'
			},
			'I-983_WAIT': {
				user: 'Please wait for HR to approve your I-983.',
				hr: 'I-983 needs approval.'
			},
			'I-20_UPLOAD': {
				user: 'Please upload your I-20.',
				hr: 'Waiting on I-20 upload.'
			},
			'I-20_WAIT': {
				user: 'Please wait for HR to approve your I-20.',
				hr: 'I-20 needs approval.'
			},
			'COMPLETED': {
				user: 'You are all done!',
				hr: 'Document upload complete.'
			},
		},
	},

	// visaStatus: ,

	// set whatever port we need
	frontendBaseUrl: `http://localhost:3001`, // for the react origin/port
};
