const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/error');
const connection = require('./config/db');

require('dotenv').config();

app.use(cookieParser());
app.use('/', express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
	console.log('neww request:', req.url, req.body, req.method);
	next();
});
// routes
app.use('/', routes.authRouter);
app.use('/', routes.artistsRouter);
app.use('/', routes.songsRouter);
app.use('/', routes.userRouter);


// 404 handler
app.use((req, res, next) => {
	const err = {
		statusCode: 404,
		message: 'Not found',
	};
	next(err);
});

app.use(errorHandler);

module.exports = { app, connection };
