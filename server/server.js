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
	// user 2: role: 'user'
	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkZDc3MjY1MmYyMWExNjlhMmE5ZTIiLCJ1c2VybmFtZSI6InVzZXJuYW1lMiIsImVtYWlsIjoiZW1haWwyQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1NDgzMDY5NTI5LCJleHAiOjE2NzU0ODM2Njk1Mjl9.vBD2AUwJSdjq905bME11O4VOwvfNuYsimyxhvn32-jo';

	// user 1: role: 'hr'{}
	const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkZDc3MjY1MmYyMWExNjlhMmE5ZTAiLCJ1c2VybmFtZSI6InVzZXJuYW1lMSIsImVtYWlsIjoiZW1haWwxQGVtYWlsLmNvbSIsInJvbGUiOiJociIsImlhdCI6MTY3NTQ4MzA1MzU5NiwiZXhwIjoxNjc1NDgzNjUzNTk2fQ.kMt-z2tWHdTqUil2V6naBRQX5kps0bPDg7twRaTF7uI';

// 	// user 0: role: 'user'
// 	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkZDc3MjY1MmYyMWExNjlhMmE5ZTEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMCIsImVtYWlsIjoiZW1haWwwQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1NDgzMDMyMDQ3LCJleHAiOjE2NzU0ODM2MzIwNDd9.HYZgRAJSokCGJ0nx9nd-KeibLVvZinfxaZtxkhLj4Fk'; 
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
