const s3Service = require('../services/s3Service')
const catchAsync = require('../utils/catchAsync')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../services/s3Service')

// const { generateUploadURL } = require('./s3Service');

// app.get('/s3Url', async (req, res) => {
// 	const url = await s3.generateUploadURL()
// 	res.send({url})
// })

const downloads = (req, res) => {
	console.log(req.params)
	const key = req.params.key
	const readStream = getFileStream(key)

	readStream.pipe(res)
}

const uploads = (upload.single('image'), async (req, res) => {
	const file = req.file
	console.log(file)

	// apply filter
	// resize 

	const result = await uploadFile(file)
	await unlinkFile(file.path)
	console.log(result)
	const description = req.body.description
	res.send({ imagePath: `/images/${result.Key}` })
})

module.exports = {
    downloads,
    uploads
}