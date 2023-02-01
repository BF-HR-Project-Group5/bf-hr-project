const router = require('express').Router();
const controllers = require('../controllers/s3Controller')
const auth = require('../middlewares/auth')

console.log('s3 router')

router.post('/images', controllers.uploads)
router.get('/images/:key', controllers.downloads)

module.exports = router;