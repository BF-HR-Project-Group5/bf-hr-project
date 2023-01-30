const router = require('express').Router();
const controllers = require('../controllers/houseController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

// console.log("house router")

// router.get('/house', controllers.index);
router.post('/house/createHouse', controllers.createHouse);
router.get('/house/allHouses', controllers.getAllHouses);
router.get('/house/:id', controllers.getHouse);
router.put('/house/:id',controllers.updateHouse);
router.delete('/house/:id',controllers.deleteHouse);

module.exports = router;