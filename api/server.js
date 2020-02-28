const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const authRoute = require('../routes/auth');
const eventsRoute = require('../routes/events');
const profileRoute = require('../routes/profile');
const templateRoute = require('../routes/template');
const { db } = require('../db');

//Require env variables
require('dotenv').config();
const server = express();

let corsOptions = {
  origin: (process.env.NODE_ENV !== 'development') ? `${process.env.PRODUCTION_FRONTEND_URL}` : `${process.env.FRONTEND_URL}` ,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
};

server.use(helmet());
server.use(cors());
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
server.use('/api/profile', profileRoute);
server.use('/api/template', templateRoute);

server.get('/', (req, res) => {
  res.send({ api: 'Ok', dbenv: process.env.DB_ENV });
});

module.exports = server;
