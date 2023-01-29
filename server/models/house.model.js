const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
// const Facility = require('./facility.model');
const { config } = require('../config/constants')

const HouseSchema = new Schema({
    address: { type: String, required: true },
    landlord: {
        legalFullName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        email: { type: String, required: true }
    },
    numResidents: {type: Number},
    roommates: {
        preferredName: { type: String },
        legalFullName: { type: String },
        phoneNumber: { type: Number }
    },
    facilityInfo: {
        beds: { type: Number, required: true },
        mattresses: { type: Number, required: true },
        tables: { type: Number, required: true },
        chairs: { type: Number, required: true }
    },
    facilityReports: { type: refType, ref: 'Facility'}
})