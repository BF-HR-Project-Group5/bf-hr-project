const catchAsync = require( '../utils/catchAsync' );
const facilitySerice = require('../services/facilityService')
const Comment = require('../models/document.model');
const Facility = require('../models/FacilityReport.model')


//get all facilityReport by houseid // only show comment_id, not full infomation
const getFacilityReports = catchAsync((async (req, res)=>{
    const houseId = req.params.houseId
    const house = await facilitySerice.getHouseByIdAndPopulateFields(houseId)

    res.status(200).json({facilityReports : house.facilityReports})
}))
const getTest = catchAsync((async (req, res)=>{
  //just test
    res.send('200')
}))

// get all comments // no need houseId, need faicilty_id 
// first facilityId is 63d80ed7cbe3476841d3ea35
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/facility/63d80ed7cbe3476841d3ea35/comment
const getFacilityReportsComments = catchAsync((async (req, res)=>{
    const facilityId = req.params.facilityId
    // console.log("this is" + facilityId)
    const facility = await facilitySerice.getFacilityByIdAndPopulateFields(facilityId)
    res.status(200).json({comment : facility.comment})

}))


// create a faclity report // done
const postFacility = catchAsync((async (req, res)=>{
    const houseId = req.params.houseId;
    const facility = await facilitySerice.createFacility(req.body);
    // //push the new facility to the house
    const house = await facilitySerice.getHouseById(houseId);
    house.facilityReports.push(facility._id);
    house.save();
    res.status(200).json({house})
  
}))

// create comment //done
//63d7f0930f7ade2b7b6c5f68 => first house
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/facility/63d80ed7cbe3476841d3ea35/comment
const postComment = catchAsync((async (req, res)=>{
    const facility_Id = req.params.facilityId
    const comment = await facilitySerice.createComment(req.body);
    // // how to get facility_id
    const facility = await facilitySerice.getFacilityById(facility_Id);
    facility.comment.push(comment._id);
    facility.save();
    res.status(200).json({facility})

}))

// modify comment
//modify comment1 63d8191e79b969073a624e0c

const putComment = catchAsync((async (req, res)=>{
    const commentId = req.params.commentId
   
    const comment = await facilitySerice.updateCommentByID(commentId, req.body);


    res.status(200).json({comment})
    
}))

// delete comment by comment_id
// comment2 63d81dafc3761cf57adad194
const deleteComment = catchAsync((async (req, res)=>{
    // get comment by ID
    const commentId = req.params.commentId
    console.log(commentId)
   const deleteComment = await facilitySerice.deleteCommentById(commentId)
    res.status(200).json({deleteComment})
    

}))

module.exports ={
    getTest,
    getFacilityReports,
    getFacilityReportsComments,
    postFacility,
    postComment,
    deleteComment,
    putComment
    
}