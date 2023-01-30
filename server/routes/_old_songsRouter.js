const router = require('express').Router();
const controllers = require('../controllers/_old_songsController');
const auth = require('../middlewares/auth');

router.get('/songs/all', controllers.getAllSongs);
router.get('/songs', auth, controllers.getSongsQuery);
router.put('/songs/:songId', auth, controllers.putSongsLike);

module.exports = router;
