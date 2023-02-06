// const path = require('path');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const crypto = require('node:crypto');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// uploads a file to s3

const uploadFile = async (file) => {
	// const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: file.buffer,
		Key: file.originalname,
		ContentType: file.mimetype,
		ContentEncoding: 'base64',
	};

	const uploadPromise = await s3.upload(uploadParams).promise();
	console.log({uploadPromise});
	return uploadPromise;
};
// const uploadFile = async (file) => {
// 	const fileStream = fs.createReadStream(file.path);

// 	const uploadParams = {
// 		Bucket: bucketName,
// 		Body: fileStream,
// 		Key: file.filename,
// 	};

// 	const uploadPromise = await s3.upload(uploadParams).promise();
// 	console.log({uploadPromise});
// 	return uploadPromise;
// };

const getFileStream = (fileKey) => {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return s3.getObject(downloadParams).createReadStream();
};

// file = {name, type, content}
const uploadFileFromBuffer = async (file, userId) => {
	const {name, type, content} = file;
	console.log('uploadFileFromBuffer:', {name, type, content});
	// split around the base64 starting indicator
	// const base64FileSplit = content.split(';base64,');
	// index 1 is the actual base64 file content
	// const base64File = base64FileSplit[1];

	// create a buffer so we can upload to s3
	// const buffer = new Buffer.from(base64File);
	const buffer = Buffer.from(content.replace(/^data:.+;base64,/, ""), "base64");

	// so we want to add some extra "salt" / identifiers to the url, to make sure they stay unique and maybe are more easy to tell apart. 3 bytes => 6 hex characters
	const randomChars = crypto.randomBytes(3).toString('hex');
	const Key = `${userId}.${randomChars}.${name}`;

	const params = {
    Bucket: bucketName,
    Key: Key, 
    Body: buffer,
    ContentEncoding: 'base64', // required
    ContentType: type // required. Notice the back ticks
  }
	const uploadPromise = await s3.upload(params).promise();
	console.log({uploadPromise});
	return uploadPromise;
}


module.exports = {
	uploadFile,
	getFileStream,
	uploadFileFromBuffer,
};
