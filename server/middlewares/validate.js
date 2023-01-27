const Joi = require('joi');
const pick = require('../utils/pick');

const validate = (schema) => (req, res, next) => {
	const validSchema = pick(schema, ['body']);
	const objectToValidate = pick(req, Object.keys(validSchema));
	console.log('validate middleware: ', objectToValidate);

	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(objectToValidate);

	if (error) {
		const errorMessage = error.details.map((detail) => detail.message).join(', ');
		throw { statusCode: 400, message: errorMessage };
		// return next()
	}

	Object.assign(req, value);
	return next();
};

module.exports = validate;
