module.exports = {
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
        'COMPLETE': {
            user: 'You are all done!',
            hr: 'Document upload complete.'
        },
        'COMPLETED': {
            user: 'You are all done!',
            hr: 'Document upload complete.'
        },
    },
}
