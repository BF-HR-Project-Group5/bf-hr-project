const router = require('express').Router();
const controllers = require('../controllers/houseController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createHouse } = require('../validations/house.validation');
const authHr = require('../middlewares/authHr');
// console.log("house router")

// user routes (for req.user)
// from req.user, get user by _id, get houseId, and fetch the houseId so it can be returned // checked
router.get( // should also get facility reports for this house (populate facilityReports)
	'/house',
	auth,
	controllers.getHouseForUser
);

// HR routes
router.post(
	// checked
	'/houses/createHouse',
	// validate(createHouse),
	auth, authHr,
	controllers.createHouse
);
router.get(
	// checked
	'/houses/all',
	auth, authHr,
	controllers.getAllHouses
);
router.get(
	// checked
	'/houses/:id',
	auth, authHr,
	controllers.getHouse
);
router.put(
	// checked
	'/houses/:id',
	auth, authHr,
	controllers.updateHouse
);
router.delete(
	// checked
	'/houses/:id',
	auth, authHr,
	controllers.deleteHouse
);
module.exports = router;
