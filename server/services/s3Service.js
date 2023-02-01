require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

// const crypto = require('crypto');
// const promisify = require('promisify');
// const randomBytes = require(crypto.randombytes);

// app.raw()
// import aws from 'aws-sdk';
// import crypto from 'crypto';
// import { promisify } from 'util';
// import { app } from '../server';
// import { raw } from 'express';

// dotenv.config()

const region = "us-west-2"
const bucketName = "bf-hr-project"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

// uploads a file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
