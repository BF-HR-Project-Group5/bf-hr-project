const router = require('express').Router();
const  facilityRouter = require('./facilityRouter');
const controllers = require('../controllers/houseController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createHouse } = require('../validations/house.validation');
// console.log("house router")

// router.get('/house', controllers.index);
router.post('/house/create', 
// validate(createHouse), 
controllers.createHouse);
router.get('/house/all', controllers.getAllHouses);
router.get('/house/:id', controllers.getHouse);
router.put('/house/:id/edit',controllers.updateHouse);
router.delete('/house/:id/delete',controllers.deleteHouse);
// NOT TESTED
router.use('/house/:houseId/facilityReport._id', facilityRouter);
module.exports = router;