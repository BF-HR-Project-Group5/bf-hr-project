const router = require('express').Router();
const auth = require('../middlewares/auth')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// console.log('s3 router')

// upload.fields([{ name: 'image', maxCount: 1 },{ name: 'doc1', maxCount: 1 },{ name: 'doc2', maxCount: 1 }])
// router.post('/images', controllers.uploads)
// router.get('/images/:key', controllers.downloads)

module.exports = router;