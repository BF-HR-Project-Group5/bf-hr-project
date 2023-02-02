const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const {config} = require('../config/constants')

// const commentSchema = new Schema({
//     description: {type:String, required:true}, 
//     createdBy: {type:refType, ref: 'User'},
// },{ timestamps: true })

const facilityReportSchema = new Schema({
    title:{type: String, required: true},
    description: {type: String, required:true},
    createdBy: {type:refType, ref: 'User'},
    status: {type: String, enum: config.facilityStatus, default: 'IN_PROGRESS'},
    comments: [{type: refType, ref:'Comment'}]
    
}, { timestamps: true });


const Facility = mongoose.model('Facility', facilityReportSchema, 'Facility');

module.exports = Facility