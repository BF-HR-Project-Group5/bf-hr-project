const nodemailer = require("nodemailer");

// const noReplyEmailTransporter = nodemailer.createTransport({
// 	service:"gmail",
// 	host: "smtp.gmail.com",
// 	// defaults to 587 if is secure is false or 465 if true
// 	// port: process.env.EMAIL_PORT,
// 	secure: false,
// 	auth: {
// 		user: "testbeaconfilre@gmail.com",
// 		pass: "jgrpynznzqjtwkdv",
// 	},
// 	tls:{
// 		rejectUnauthorized: false
// 	}
// });

const noReplyEmailTransporter = nodemailer.createTransport({
	service:"gmail",
	host:  process.env.EMAIL_HOST,
	// defaults to 587 if is secure is false or 465 if true
	// port: process.env.EMAIL_PORT,
	secure: false,
	auth: {
		user: process.env.NOREPLY_EMAIL_USERNAME,
		pass: process.env.NOREPLY_EMAIL_PASSWORD,
	},
	tls:{
		rejectUnauthorized: false
	}
});

// data === {name: {first, last}, email, link} ?
const sendInvite = async (data) => {
	 await noReplyEmailTransporter.sendMail( {
		from: process.env.NOREPLY_EMAIL_USERNAME, // sender address
		to: data.email, // string list of receiver(s)
		// subject line
		subject: `Testing`,
		// plain text body
		text: `cilck this link to acess your registration page, ${data.link}`,
		//html version of the message
		// html: `<h1>Please click the link to register, ${data.link}</h1>`,
	
	}
	, function(err, success){
		if(err){
			return err
		
		}else{
			console.log("Message sent: %s", success.messageId)
		}

	});
	
	return "Email has been sent"
	
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