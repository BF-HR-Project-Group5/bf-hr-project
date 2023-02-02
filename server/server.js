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
	// user 1: role: 'hr'{}
	// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RjNDBhMmY2MTc5NTg1ZmZhYmE1YzUiLCJ1c2VybmFtZSI6InVzZXJuYW1lMSIsImVtYWlsIjoiZW1haWwxQGVtYWlsLmNvbSIsInJvbGUiOiJociIsImlhdCI6MTY3NTM3ODk1NzQwNSwiZXhwIjoxNjc1Mzc5NTU3NDA1fQ.bYvwKpfZQfvvi0o_eA-8M3sk6s0g6iu1K6zLFCaWL9M';

	// user 0: role: 'user'
	const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RjNDBhMmY2MTc5NTg1ZmZhYmE1YzIiLCJ1c2VybmFtZSI6InVzZXJuYW1lMCIsImVtYWlsIjoiZW1haWwwQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1Mzc4ODYzMjA0LCJleHAiOjE2NzUzNzk0NjMyMDR9.PbUOQOD0aB9SAGOoEsbVe51JgXzVVrZ0BZIdwNFP-LU'; 
	res.set('Set-Cookie', `jwt=${jwt}; Path=/;`); // removed httponly
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
