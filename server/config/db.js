const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

// should return 0 documents if the query string was incorrect?
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URL, (error) => {
	if (error) console.log(error);
	else console.log('Connected to MongoDB!');
});

module.exports = mongoose.connection;