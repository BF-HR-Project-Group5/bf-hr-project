const Joi = require('joi');
const { User, House, Facility } = require('../models');
// const createHouse = {

//     // 1ST WAY
//     body: Joi.object().keys({
//         address: {
//             line1: Joi.string().min(4).max(64).required(),
//             line2: Joi.string().min(4).max(64),
//             city: Joi.string().min(2).max(32).required(),
//             state: Joi.string().min(2).max(32).required(),
//             zipcode: Joi.string().regex(/^[0-9]{5}$/).messages({ 'string.pattern.base': `Zipcode must have 5 digits.` }).required(),
//         },
//         landlord: {
//             legalFullName: Joi.string().alphanum().min(2).max(16).required(),
//             phone:
//                 Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
//             // Joi.number().minlength(11).maxlength(15).required(),
//             email: Joi.string().email().required(),
//         },
//         numResidents: Joi.number().integer().max(6),
//         roommates: Joi.array().items(Joi.object({ User })),
//         houseInfo: {
//             bedCount: Joi.number().required(),
//             mattressCount: Joi.number().required(),
//             tableCount: Joi.number().required(),
//             chairCount: Joi.number().required(),
//         },
//         facilityReports: Joi.array().items(Joi.object({ Facility }))
//     }),
// };

// ERROR 1ST WAY: 
// errorHandler: {
//     err: {
//       statusCode: 400,
//       message: '"address.line1" is not allowed, "address.line2" is not allowed, "address.city" is not allowed, "address.state" is not allowed, "address.zipcode" is not allowed, "landlord.legalFullName" is not allowed, "landlord.phone" is not allowed, "landlord.email" is not allowed, "houseInfo.bedCount" is not allowed, "houseInfo.mattressCount" is not allowed, "houseInfo.tableCount" is not allowed, "houseInfo.chairCount" is not allowed'
//     }
//   }

/* 2ND WAY
const createHouse = {
    body: Joi.object(House.address).keys({
        line1: Joi.string().min(4).max(64).required(),
        line2: Joi.string().min(4).max(64),
        city: Joi.string().min(2).max(32).required(),
        state: Joi.string().min(2).max(32).required(),
        zipcode: Joi.string().regex(/^[0-9]{5}$/).messages({ 'string.pattern.base': `Zipcode must have 5 digits.` }).required(),
    }),
    body: Joi.object(House.landlord).keys({
        legalFullName: Joi.string().alphanum().min(2).max(16).required(),
        phone:
            Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        // Joi.number().minlength(11).maxlength(15).required(),
        email: Joi.string().email().required(),
    }),
    body: Joi.object().keys({
        numResidents: Joi.number().integer().max(6),
        roommates: Joi.array().items(Joi.object({ User })),
        facilityReports: Joi.array().items(Joi.object({ Facility }))
    }),
    body: Joi.object(House.houseInfo).keys({
        bedCount: Joi.number().required(),
        mattressCount: Joi.number().required(),
        tableCount: Joi.number().required(),
        chairCount: Joi.number().required(),
    }),
}
ERROR: errorHandler: {
  err: {
    statusCode: 400,
    message: '"bedCount" is required, "mattressCount" is required, "tableCount" is required, "chairCount" is required, "address.line1" is not allowed, "address.line2" is not allowed, "address.city" is not allowed, "address.state" is not allowed, "address.zipcode" is not allowed, "landlord.legalFullName" is not allowed, "landlord.phone" is not allowed, "landlord.email" is not allowed, "houseInfo.bedCount" is not allowed, "houseInfo.mattressCount" is not allowed, "houseInfo.tableCount" is not allowed, "houseInfo.chairCount" is not allowed'
  }
}
*/

const createHouse = {

    // 3RD WAY
    body: Joi.object().keys({
        address: Joi.object().keys({
            line1: Joi.string().alphanum().min(4).max(64).required(),
            line2: Joi.string().min(4).max(64),
            city: Joi.string().min(2).max(32).required(),
            state: Joi.string().min(2).max(32).required(),
            zipcode: Joi.string().regex(/^[0-9]{5}$/).messages({ 'string.pattern.base': `Zipcode must have 5 digits.` }).required(),
        }),
        landlord: Joi.object().keys({
            legalFullName: Joi.string().alphanum().min(2).max(16).required(),
            phone:
                Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
            // Joi.number().minlength(11).maxlength(15).required(),
            email: Joi.string().email().required(),
        }),
        numResidents: Joi.number().integer().max(6),
        roommates: Joi.array().items(Joi.object({ User })),
        houseInfo: Joi.object().keys({
            bedCount: Joi.number().required(),
            mattressCount: Joi.number().required(),
            tableCount: Joi.number().required(),
            chairCount: Joi.number().required(),
        }),
        facilityReports: Joi.array().items(Joi.object({ Facility }))
    }),
};

/*ERROR:
errorHandler: {
  err: {
    statusCode: 400,
    message: '"address.line1" is not allowed, "address.line2" is not allowed, "address.city" is not allowed, "address.state" is not allowed, "address.zipcode" is not allowed, "landlord.legalFullName" is not allowed, "landlord.phone" is not allowed, "landlord.email" is not allowed, "houseInfo.bedCount" is not allowed, "houseInfo.mattressCount" is not allowed, "houseInfo.tableCount" is not allowed, "houseInfo.chairCount" is not allowed'
  }
}

*/

// console.log('createHouse', createHouse);


module.exports = { createHouse };