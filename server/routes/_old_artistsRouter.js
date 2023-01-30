const router = require('express').Router();
const controllers = require('../controllers/_old_artistsController');
const auth = require('../middlewares/auth');

router.put('/artists/:artistId', auth, controllers.putArtistsFollow);

module.exports = router;
