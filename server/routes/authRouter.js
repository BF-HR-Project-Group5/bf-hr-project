const router = require('express').Router();
const controllers = require('../controllers/authController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { loginUser, registerUser } = require('../validations/user.validation');

router.post('/user/login', validate(loginUser), controllers.login);
router.post('/user/register', validate(registerUser), controllers.register);
router.get('/user/logout', controllers.logout);

module.exports = router;
