const houseService = require('../services/houseService')
const catchAsync = require( '../utils/catchAsync' );
// const pick = require('../utils/pick' );

// console.log('house controller')

const index = (req, res) => {
    console.log('res', res)
    res.json({
        message: "Hello"
    });
}

// CREATE house
const createHouse = catchAsync(async (req, res) => {
    console.log('create house controller:', { reqUser: req.user }, { reqHouse: req.body })
    const houseBody = await houseService.createHouse(req.body);
    res.status(200).json({houseBody})
})

// GET ALL houses - view existing houses
const getAllHouses = catchAsync(async (req, res) => {
    console.log('get list of houses controller:, ', { reqUser: req.user });   
    // const options = pick(req.query, ['sortBy']);
    const allHouses = await houseService.queryHouses();
    console.log('all Houses', allHouses);
    return res.status(200).json({allHouses});
})

// GET ONE house - view summary view of each house
const getHouse = catchAsync(async (req, res) => {
    console.log('get one house controller:', { reqUser: req.user }, { _id: req.params.id });
    //get house ids
    const houseId = req.params.id;
    const house = await houseService.getHouseByIdAndPopulateFields(houseId,  ['facilityReports', 'roommates']);
    console.log('house', house);
    
    res.status(200).json({house});
})

// UPDATE house
const updateHouse = catchAsync(async (req, res) => {
    console.log('update house controller:', { reqUser: req.user }, { reqHouse: req.params });
    const houseId = req.params.id;
    const houseBody = req.body;
    console.log('houseBody', houseBody);
    const house = await houseService.updateHouse(houseId, houseBody);
    res.status(200).json({house});
})

// DELETE house
const deleteHouse = catchAsync(async (req, res) => {
    console.log('delete house controller:', { reqUser: req.user }, { reqHouse: req.params.id });
    const houseId = req.params.id;
    const house = await houseService.deleteHouseById(houseId);
    res.status(200).json({ house });
})


module.exports = {
    index,
    createHouse,
    getAllHouses,
    getHouse, 
    updateHouse,
    deleteHouse
}
