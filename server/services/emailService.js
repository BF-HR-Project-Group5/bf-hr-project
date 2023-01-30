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
const sendInvite = async ({name: {first, last}, email, link}) => {
	await noReplyEmailTransporter.sendMail({
		from: process.env.NOREPLY_EMAIL_USERNAME, // sender address
		to: email, // string list of receiver(s)
		replyTo: process.env.NOREPLY_EMAIL_USERNAME,
		// subject line
		subject: ``,
		// plain text body
		text: `${link}`,
		//html version of the message
		html: ``,
	
		// html example: `<h1>Hello, Northport Butcher Shoppe,</h1><br><h3>You received a new message from ${null}:</h3><p><i>"</i><br>${null}<br><i>"</i></p><br><i>(Replies get sent to ${null} at ${null})</i>`,
	});

	console.log('invite sent!');
	return data; // ? not sure what to return
};

// send the reminder message:
// tells the user what their next step is
// data === {name: {first, last}, email, nextStep: string}
const sendReminder = async (data) => {
	// send mail

	// return some success message or the data
	console.log('notification sent!');
	return data;
}

module.exports = {
	sendReminder,
	sendInvite
}