const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/error');
const connection = require('./config/db');

require('dotenv').config();

// use cors
// app.use(cors({origin: true, credentials: true }))

app.use(cookieParser());
app.use('/', express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
	console.log('new request:', req.url, req.body, req.method);
	next();
});
// routes
// console.log('server router')
app.use('/', routes.authRouter);
app.use('/', routes.artistsRouter);
app.use('/', routes.songsRouter);
app.use('/', routes.userRouter);
app.use('/', routes.houseRouter);


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
