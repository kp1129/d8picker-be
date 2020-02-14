//Setup middleware
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const authRoute = require('../routes/auth');
const eventsRoute = require('../routes/events');

//Require env variables
require('dotenv').config();
const server = express();

//Invoke middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
	session({
		name: 'sid',
		saveUninitialized: false,
		resave: false,
		secret: process.env.SESSION_SECRET,
		cookie: {
			httpOnly: false,
			maxAge: 1000 * 60 * 60 * 2,
			sameSite: true,
			secure: process.env.COOKIE_SECURE 
		}
	})
);

//Invoke routes
server.use('/api/auth', authRoute);
server.use('/api/events', eventsRoute);

//GET endpoint for checking app
server.get('/', (req, res) => {
	res.send({ api: 'Ok', dbenv: process.env.DB_ENV });
});

module.exports = server;
