const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const authRoute = require('../routes/auth');
const eventsRoute = require('../routes/events');
const { db } = require('../db');

//Require env variables
require('dotenv').config();
const server = express();

let corsOptions = {
  origin: [process.env.STAGING_FRONTEND_URL, process.env.PRODUCTION_FRONTEND_URL ],
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
};

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());
server.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: db })
  })
);

server.use('/api/auth', authRoute);
server.use('/api/events', eventsRoute);

server.get('/', (req, res) => {
  res.send({ api: 'Ok', dbenv: process.env.DB_ENV });
});

module.exports = server;
