const express = require('express')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFileImg, getFileStream } = require('./s3')

const cors = require('cors')
const app = express()
// use cors
app.use(cors({ origin: true, credentials: true }))

app.get('/images/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

// upload.single('image'), upload.single('doc1')
// upload.fields([{ name: 'image', maxCount: 1 }, { name: 'doc1', maxCount: 1 }])
app.post('/images', upload.fields([{ name: 'image', maxCount: 1 },{ name: 'doc1', maxCount: 1 },{ name: 'doc2', maxCount: 1 }]), async (req, res) => {
    
    // console.log("req.body", req.body);
    // console.log("req.files",req.files.image[0], req.files.doc1[0], req.files.doc2[0])

    const fileImg = req.files.image[0]
    const file1 = req.files.doc1[0]
    const file2 = req.files.doc2[0]

    const resultImg = await uploadFileImg(fileImg)
    const result1 = await uploadFileImg(file1)
    const result2 = await uploadFileImg(file2)

    // await unlinkFile(file.path)
    console.log('result',resultImg, result1, result2)
    const description = req.body.description
    // res.send({ imagePath: `/images/${result.Key}` })
    res.send({resultImg, result1, result2})
})

/* EXPECT RESULTS FOR POST
file {
  fieldname: 'image',
  originalname: 'ny-real-id.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: 'ca5f8273c03aafe029bec2a5a5727cd2',
  path: 'uploads/ca5f8273c03aafe029bec2a5a5727cd2',
  size: 150669
}
fp uploads/ca5f8273c03aafe029bec2a5a5727cd2
file {
  fieldname: 'doc1',
  originalname: 'BeaconFire Final Project Requirements.pdf',
  encoding: '7bit',
  mimetype: 'application/pdf',
  destination: 'uploads/',
  filename: '335dc1317c2a1088dc1ae5929c0506ea',
  path: 'uploads/335dc1317c2a1088dc1ae5929c0506ea',
  size: 32861
}
fp uploads/335dc1317c2a1088dc1ae5929c0506ea
file {
  fieldname: 'doc2',
  originalname: 'git-command-line.docx',
  encoding: '7bit',
  mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  destination: 'uploads/',
  filename: '307151c67f8301522529b8a03074c01e',
  path: 'uploads/307151c67f8301522529b8a03074c01e',
  size: 6653
}
fp uploads/307151c67f8301522529b8a03074c01e
result {
  ETag: '"39c2c5d821d0fac99b8bcfe89fe5d626"',
  ServerSideEncryption: 'AES256',
  Location: 'https://bf-hr-project.s3.us-west-2.amazonaws.com/ca5f8273c03aafe029bec2a5a5727cd2',
  key: 'ca5f8273c03aafe029bec2a5a5727cd2',
  Key: 'ca5f8273c03aafe029bec2a5a5727cd2',
  Bucket: 'bf-hr-project'
} {
  ETag: '"5cfdc1b80adc75a4e8c16d7e2058cd08"',
  ServerSideEncryption: 'AES256',
  Location: 'https://bf-hr-project.s3.us-west-2.amazonaws.com/335dc1317c2a1088dc1ae5929c0506ea',
  key: '335dc1317c2a1088dc1ae5929c0506ea',
  Key: '335dc1317c2a1088dc1ae5929c0506ea',
  Bucket: 'bf-hr-project'
} {
  ETag: '"839c8a621fcd372c5e59e009384e0b87"',
  ServerSideEncryption: 'AES256',
  Location: 'https://bf-hr-project.s3.us-west-2.amazonaws.com/307151c67f8301522529b8a03074c01e',
  key: '307151c67f8301522529b8a03074c01e',
  Key: '307151c67f8301522529b8a03074c01e',
  Bucket: 'bf-hr-project'
}
*/

app.listen(5000, () => console.log("listening on port 5000"))