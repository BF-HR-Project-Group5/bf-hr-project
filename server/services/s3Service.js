// const path = require('path');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();

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
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	const uploadPromise = await s3.upload(uploadParams).promise();
	console.log({uploadPromise});
	return uploadPromise;
};

const getFileStream = (fileKey) => {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return s3.getObject(downloadParams).createReadStream();
};

// file = {name, type, content}
const uploadFileFromBuffer = async (file) => {
	const {name, type, content} = file;
	// split around the base64 starting indicator
	const base64FileSplit = content.split(';base64,');
	// index 1 is the actual base64 file content
	const base64File = base64FileSplit[1];
	// create a buffer so we can upload to s3
	const base64Data = new Buffer.from(base64File);

	const params = {
    Bucket: bucketName,
    Key: name, // type is not required
    Body: base64Data,
    ACL: 'public-read',
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
