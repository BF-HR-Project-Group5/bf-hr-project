const {app, connection} = require('./server');

const SERVER_PORT = process.env.SERVER_PORT || 3000;

connection.once('open', () => {
	app.listen(SERVER_PORT, () => {
		console.log('App started on port ' + SERVER_PORT);
	})
})