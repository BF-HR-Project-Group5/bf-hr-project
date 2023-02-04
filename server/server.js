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

// app.use('/', (req, res, next) => {
// 	// user 2: role: 'user'
// 	const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkYTY3NTlhZGY0MDAyNGUwYzFhMmIiLCJ1c2VybmFtZSI6InVzZXJuYW1lMiIsImVtYWlsIjoiZW1haWwyQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1NDcwNjQ1NDk5LCJleHAiOjE2NzU0NzEyNDU0OTl9.J38QuyCWaYF82EaGN2TKykHcHpRBYZzNQqLLh8o0x0E';

// 	// user 1: role: 'hr'{}
// 	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkYTY3NTlhZGY0MDAyNGUwYzFhMmYiLCJ1c2VybmFtZSI6InVzZXJuYW1lMSIsImVtYWlsIjoiZW1haWwxQGVtYWlsLmNvbSIsInJvbGUiOiJociIsImlhdCI6MTY3NTQ3MDU4ODY5NiwiZXhwIjoxNjc1NDcxMTg4Njk2fQ.nwYHP6OuHYORcqwD0mBPqJijcZ2dEERS0ceaxte504Q';

// 	// user 0: role: 'user'
// 	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkYTY3NTlhZGY0MDAyNGUwYzFhMmUiLCJ1c2VybmFtZSI6InVzZXJuYW1lMCIsImVtYWlsIjoiZW1haWwwQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1NDcwNjE4NDc2LCJleHAiOjE2NzU0NzEyMTg0NzZ9.wlPVXb77vkby3-dTSfk0TUbcUBCztmVaCRfhwB4X2A8'; 
// 	res.set('Set-Cookie', `jwt=${jwt}; Path=/;`); // removed httponly
// 	next();
// })

// routes
// console.log('server router')
app.use('/', routes.authRouter);
app.use('/', routes.houseRouter);
app.use('/', routes.inviteRouter);
// app.use('/', routes.userRouter);
app.use('/', routes.reportRouter);
app.use('/', routes.documentRouter);
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
