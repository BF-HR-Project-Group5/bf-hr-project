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
	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RjODUzMDMwMWQzNDA3MDU1MGViNGUiLCJ1c2VybmFtZSI6InVzZXJuYW1lMiIsImVtYWlsIjoiZW1haWwyQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1Mzk2NDgzNTMyLCJleHAiOjE2NzUzOTcwODM1MzJ9._Rj60rKAReQ_emdrRBUkhemVtFNbr7NCrxY3iryzAXo';

	// user 1: role: 'hr'{}
	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RjODUzMDMwMWQzNDA3MDU1MGViNGYiLCJ1c2VybmFtZSI6InVzZXJuYW1lMSIsImVtYWlsIjoiZW1haWwxQGVtYWlsLmNvbSIsInJvbGUiOiJociIsImlhdCI6MTY3NTM5NjQ1MjM2NSwiZXhwIjoxNjc1Mzk3MDUyMzY1fQ.MTeqpnVKIoEzk745XcvXHBOY4g-wGWwUCLoM0qdxxno';

	// user 0: role: 'user'
	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RjODUzMDMwMWQzNDA3MDU1MGViNTAiLCJ1c2VybmFtZSI6InVzZXJuYW1lMCIsImVtYWlsIjoiZW1haWwwQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1Mzk2NDEzOTU4LCJleHAiOjE2NzUzOTcwMTM5NTh9.dn5KzJt3e7sQ4IdtItVgmW77MHb7dNtn3kpmTGDKedI'; 
	// res.set('Set-Cookie', `jwt=${jwt}; Path=/;`); // removed httponly
	next();
})

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
