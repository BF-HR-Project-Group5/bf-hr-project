const router = require('express').Router();
const controllers = require('../controllers/artistsController');
const auth = require('../middlewares/auth');

router.put('/artists/:artistId', auth, controllers.putArtistsFollow);

module.exports = router;
