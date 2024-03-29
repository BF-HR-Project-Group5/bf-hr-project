const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
// const Facility = require('./facility.model');
const { config } = require('../config/constants')

const HouseSchema = new Schema({
    address: {
        line1: { type: String, required: true },
        line2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
    },
    landlord: {
        legalFullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true }
    },
    numResidents: { type: Number, default: 0 },
    roommates: [{ type: refType, ref: "User" }], // array of roommates
    houseInfo: {
        bedCount: { type: Number, required: true },
        mattressCount: { type: Number, required: true },
        tableCount: { type: Number, required: true },
        chairCount: { type: Number, required: true },
    },
    reports: [{ type: refType, ref: 'Report' }]
}, { timestamps: true });

/**
 * Check if email is taken
 * @param {string} address - The house's address
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
*/
HouseSchema.statics.isAddressTaken = async function (address, excludeUserId) {
    const house = await this.findOne({ address, _id: { $ne: excludeUserId } });
    return !!house;
}

const House = mongoose.model("House", HouseSchema, 'House');

module.exports = House;