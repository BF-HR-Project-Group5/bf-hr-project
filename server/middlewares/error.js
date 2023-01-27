exports.errorHandler = (err, req, res, next) => {
	let {statusCode, message} = err;

	// could be read on the client?
	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		stack: err.stack
	};

	console.log('errorHandler:', {err});

	res.status(statusCode).send(response);
}