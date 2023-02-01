const nodemailer = require("nodemailer");

const noReplyEmailTransporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	//secure: false, // true for port 465, false for other ports?
	secure: true,
	auth: {
		user: process.env.NOREPLY_EMAIL_USERNAME,
		pass: process.env.NOREPLY_EMAIL_PASSWORD,
	},
});

// data === {name: {first, last}, email, link} ?
const sendInvite = async (data) => {
	const {name: {first, last}, email, link} = data;
	console.log({first, last, email, link});
	await noReplyEmailTransporter.sendMail({
		from: process.env.NOREPLY_EMAIL_USERNAME, // sender address
		to: email, // string list of receiver(s)
		replyTo: process.env.NOREPLY_EMAIL_USERNAME,
		// subject line
		subject: `Welcome to BeaconFire!`,
		// plain text body
		text: `Hello, ${first} ${last}, and welcome!\n\nWe're happy you're joining our team. The first step is to register on our employee platform and fill out your profile information. Please click the link below and register an account, and then follow the instructions to complete your onboarding.\n\n${link}\n\nQuestions? Please contact us in Slack!`,
		//html version of the message
		html: `<h1>Hello, ${first} ${last}, and welcome!</h1><br><p>We're happy you're joining our team. The first step is to register on our employee platform and fill out your profile information. Please click the link below and register an account, and then follow the instructions to complete your onboarding.</p><br><ul><li>${link}</li></ul><br><i>Questions? Please contact us in Slack!</i>`,
	
		// html example: `<h1>Hello, Northport Butcher Shoppe,</h1><br><h3>You received a new message from ${null}:</h3><p><i>"</i><br>${null}<br><i>"</i></p><br><i>(Replies get sent to ${null} at ${null})</i>`,
	});

	console.log(`invite sent to ${first} ${last} (${email})!`);
	return data; // ? not sure what to return
};

// send the reminder message:
// tells the user what their next step is
// data === {name: {first, last}, email, nextStep: string}
const sendReminder = async (data) => {
	const {name: {first, last}, email, nextStep} = data;
	// send mail
	await noReplyEmailTransporter.sendMail({
		from: process.env.NOREPLY_EMAIL_USERNAME, // sender address
		to: email, // string list of receiver(s)
		replyTo: process.env.NOREPLY_EMAIL_USERNAME,
		// subject line
		subject: `Your Next Step - BeaconFire Onboarding`,
		// plain text body
		text: `Hello, ${first} ${last}!\n\nThanks for getting started on your onboarding. You're partially done. Your next step is:\n\n${nextStep}\n\nPlease complete that step for us and we can continue the process.\n\nQuestions? Please contact us in Slack!`,
		//html version of the message
		html: `<h1>Hello, ${first} ${last}!</h1><br><p>Thanks for getting started on your onboarding. You're partially done. Your next step is:</p><br><ul><li>${nextStep}</li></ul><br><p>Please complete that step for us and we can continue the process.</p><br><i>Questions? Please contact us in Slack!</i>`,
	
		// html example: `<h1>Hello, Northport Butcher Shoppe,</h1><br><h3>You received a new message from ${null}:</h3><p><i>"</i><br>${null}<br><i>"</i></p><br><i>(Replies get sent to ${null} at ${null})</i>`,
	});

	// return some success message or the data
	console.log(`Reminder (${nextStep}) sent to${first} ${last} (${email})!`);
	return data; // ? not sure what to return
}


module.exports = {
	sendReminder,
	sendInvite
}