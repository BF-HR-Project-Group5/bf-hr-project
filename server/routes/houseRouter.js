const router = require('express').Router();
const controllers = require('../controllers/houseController');
const auth = require('../middlewares/auth');

router.post('/house/createHouse', auth, controllers.createHouse);
router.get('/house/allHouses', auth, controllers.getAllHouses);
router.get('/house/getHouse', auth, controllers.getHouse);
router.get('/house/updateHouse', auth, controllers.updateHouse);
router.get('/house/deleteHouse', auth, controllers.deleteHouse);