exports.users = [
	'63bc961c4c418933398d858a',
	'63bc96204c418933398d8595',
	'63bc96224c418933398d85a0',
	'63bc96244c418933398d85ab',
	'63bc96254c418933398d85b6',
	'error',
];

exports.config = {
	tokenExpirationMinutes: 10,
	invite: {
		expiresAfterMinutes: 180,
	},

	statusTypes: [
		'OPT_RECEIPT',
		'OPT_RECEIPT_APPROVED',
		'OPT_EAD',
		'OPT_EAD_APPROVED',
		'I-983',
		'I-983_APPROVED',
		'I-20',
		'I-20_APPROVED',
	],

	documentStatus: ['PENDING', 'APPROVED', 'REJECTED'],
	documentTypes: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'OTHER', 'LICENSE'], // ...all document types

	frontendBaseUrl: `http://localhost:3001`, // for the react origin/port
};