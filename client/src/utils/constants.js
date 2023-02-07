export const config = {

		// types: [ 'F1(CPT/OPT)', 'H1-B', 'L2', 'H4', 'OTHER'],
	optDocuments: [
		'F1(CPT/OPT)', 
		'OPT EAD', 
		'I-983',
		'I-20',
	],


	nextStepsObj: {
		// should have 1 document minimum, so the first phase is waiting for HR approval
		OPT_RECEIPT_WAIT: {
			user: 'Please wait for HR to approve your OPT receipt.',
			hr: 'OPT receipt needs approval.',
			doc: 'F1(CPT/OPT)',
		},
		OPT_EAD_UPLOAD: {
			user: 'Please upload your OPT EAD.',
			hr: 'Waiting on OPT EAD upload.',
			doc: 'OPT EAD',
		},
		OPT_EAD_WAIT: {
			user: 'Please wait for HR to approve your OPT EAD.',
			hr: 'OPT EAD needs approval.',
			doc: 'OPT EAD',
		},
		'I-983_UPLOAD': {
			user: 'Please upload your I-983.',
			hr: 'Waiting on I-983 upload.',
			doc: 'I-983',
		},
		'I-983_WAIT': {
			user: 'Please wait for HR to approve your I-983.',
			hr: 'I-983 needs approval.',
			doc: 'I-983',
		},
		'I-20_UPLOAD': {
			user: 'Please upload your I-20.',
			hr: 'Waiting on I-20 upload.',
			doc: 'I-20',
		},
		'I-20_WAIT': {
			user: 'Please wait for HR to approve your I-20.',
			hr: 'I-20 needs approval.',
			doc: 'I-20',
		},
		COMPLETED: {
			user: 'You are all done!',
			hr: 'Document upload complete.',
			doc: 'No documents left',
		},
	},
};
