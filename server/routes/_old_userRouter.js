const router = require('express').Router();
const controllers = require('../controllers/userController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { editUser } = require('../validations/user.validation');

router.get('/user/songs', auth, controllers.getLikedSongs);
router.put('/user/info', auth, validate(editUser), controllers.putEditInfo);
router.get('/user', auth, controllers.getUser);

module.exports = router;
