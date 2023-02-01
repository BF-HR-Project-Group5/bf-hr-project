exports.users = [
	'63bc961c4c418933398d858a',
	'63bc96204c418933398d8595',
	'63bc96224c418933398d85a0',
	'63bc96244c418933398d85ab',
	'63bc96254c418933398d85b6',
	'error',
];

const allStatuses = {
	PENDING: 'PENDING',
	APPROVED: 'APPROVED',
	REJECTED: 'REJECTED',
}
// exports.allStatuses = allStatuses;
const statusEnum = Object.keys(allStatuses);
// exports.statusEnum = statusEnum;

exports.config = {
	tokenExpirationMinutes: 10,
	invite: {
		expiresAfterMinutes: 180,
	},

	// document model: status, doctype
	document: {
		statuses: statusEnum,
		types: [ 'F1(CPT/OPT)', 'H1-B', 'L2', 'H4', 'OTHER', 'LICENSE'],
	},

	// profile or application: status, steps
	application: {
		statuses: statusEnum,

		genders: ['MALE' , 'FEMALE' , 'NO_RESPONSE'],

		// for "Next Step"
		steps: [
			'OPT_RECEIPT_WAITING', // uploaded, next step is wait for approval
			'OPT_RECEIPT_APPROVED', // next step is upload next doc
			'OPT_EAD_WAITING',
			'OPT_EAD_APPROVED',
			'I-983_WAITING',
			'I-983_APPROVED',
			'I-20_WAITING',
			'I-20_APPROVED', // i-20 is approved? all done
		],

		nextSteps: {
			// should have 1 document minimum, so the first phase is waiting for HR approval
			OPT_RECEIPT_WAITING: {
				user: 'Please wait for HR to approve your OPT receipt.',
				hr: 'OPT receipt needs approval.'
			},
			OPT_RECEIPT_APPROVED: {
				user: 'Please upload your OPT EAD.',
				hr: 'Waiting on OPT EAD upload.'
			},
			OPT_EAD_WAITING: {
				user: 'Please wait for HR to approve your OPT EAD.',
				hr: 'OPT EAD needs approval.'
			},
			OPT_EAD_APPROVED: {
				user: 'Please upload your I-983.',
				hr: 'Waiting on I-983 upload.'
			},
			'I-983_WAITING': {
				user: 'Please wait for HR to approve your I-983.',
				hr: 'I-983 needs approval.'
			},
			'I-983_APPROVED': {
				user: 'Please upload your I-20.',
				hr: 'Waiting on I-20 upload.'
			},
			'I-20_WAITING': {
				user: 'Please wait for HR to approve your I-20.',
				hr: 'I-20 needs approval.'
			},
			'I-20_APPROVED': {
				user: 'You are all done!',
				hr: 'Document upload complete.'
			},
		
		}

	},

	// visaStatus: ,

	// set whatever port we need
	frontendBaseUrl: `http://localhost:3001`, // for the react origin/port
};
