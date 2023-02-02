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
app.use(cors({origin: true, credentials: true }))

app.use(cookieParser());
app.use('/', express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
	console.log('new request:', req.url, req.body, req.method);
	next();
});

app.use('/', (req, res, next) => {
	const payload = {
		_id: '63dbe9c938f739b6bc7a9711',
		username: 'username2',
		email: 'email2@email.com',
		role: 'user',
		// invite: user.invite,
		iat: Date.now(),
		// exp: Date.now() + config.tokenExpirationMinutes * 60 * 1000,
		exp: Date.now() + 999999999 * 60 * 1000,
	};
	req.user = payload;
	next();
})

// routes
// console.log('server router')
app.use('/', routes.authRouter);
app.use('/', routes.houseRouter);
app.use('/', routes.inviteRouter);
// app.use('/', routes.userRouter);
app.use('/', routes.reportRouter);
// app.use('/', routes.documentRouter);
app.use('/', routes.profileRouter);


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
