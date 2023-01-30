const Facility = require('../models/FacilityReport.model')
const Comment = require('../models/comment.model')
const House = require('../models/house.model')


//create facility
const createFacility = async (data) => {
    return Facility.create(data)
}
// create Comment
const createComment = async(comment) => {
    return Comment.create(comment)
}
//read
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/facility/
const getFacilityById = async(id) => Facility.findById(id)
// const getFacilityByDescription = async(description) => Facility.find({description})
// const getFacilityByTitle = async(title) => Facility.find({title})
const getCommentById = async(id) => Comment.findById(id)
const getHouseById = async(id) => House.findById(id)


// get house and populate fileds of facilityreports
const getHouseByIdAndPopulateFields = async (houseId)=>{
    //get HouseById not write
    const house = await House.findById(houseId).populate([{ path: 'facilityReports', strictPopulate: false }]).populate([{ path: 'comment', strictPopulate: false }]);
    // const house = await House.findById(houseId).populate('facilityReports')
	return house;

}

// get facility and populate fields of comments 
//first facility 63d80ed7cbe3476841d3ea35
const getFacilityByIdAndPopulateFields = async (faciltyId)=>{
    //get HouseById not write
    const facility = await Facility.findById(faciltyId).populate('comment');
  
	return facility;

}
 
//update

//update status for faciltyreport
const updateFaciltyStatusByID = async(id, updateBody) =>{
    const facilityReport = getFacilityById(id)
    if(!facilityReport)throw {statusCode: 404, message: 'Facilty not found'};
    Object.assign(facilityReport, updateBody);
    await facilityReport.save();
    return facilityReport;
}

//update the comment 63d8191e79b969073a624e0c
//http://localhost:3000/house/63d7f0930f7ade2b7b6c5f68/facility/63d8191e79b969073a624e0c/comment
const updateCommentByID = async(id, updateBody) =>{
    const comment = await Comment.findById(id)
    if(!comment)throw {statusCode: 404, message: 'Comment not found'};
    Object.assign(comment, updateBody);
    await comment.save();
    return comment;
}

//delete facility report
const deleteFacilityById = async(id) => Facility.findByIdAndDelete(id)
const deleteCommentById = async(id) => Comment.findByIdAndDelete(id)



module.exports = {
    createFacility,
    createComment,
    getFacilityById,
    // getFacilityByTitle,
    // getFacilityByDescription,
    getCommentById,
    getHouseById,
    getHouseByIdAndPopulateFields,
    getFacilityByIdAndPopulateFields,
    updateFaciltyStatusByID,
    updateCommentByID,
    deleteFacilityById,
    deleteCommentById
};