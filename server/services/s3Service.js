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

module.exports = {
	uploadFile,
	getFileStream,
};
