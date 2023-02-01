const router = require('express').Router();
const  facilityRouter = require('./facilityRouter');
const controllers = require('../controllers/houseController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createHouse } = require('../validations/house.validation');
// console.log("house router")

// user routes (for req.user)
// from req.user, get user by _id, get houseId, and fetch the houseId so it can be returned // checked
// should also get facility reports for this house (populate facilityReports)
// router.get('/house', controllers.getHouseForUser); 


// HR routes
router.post( // checked
	'/houses/createHouse', 
// validate(createHouse), 
controllers.createHouse
);
router.get( // checked
	'/houses/all',
controllers.getAllHouses
);
router.get( // checked
	'/houses/:id', 
	controllers.getHouse
	);
router.put( // checked
	'/houses/:id',
	controllers.updateHouse
	);
router.delete( // checked
	'/houses/:id',
	controllers.deleteHouse
	);
module.exports = router;