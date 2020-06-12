const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const cors = require('cors');
const helmet = require('helmet');
const templateRouter = require('../routes/templateRouter');
const contactsRouter = require('../routes/contactsRouter');
const adminRouter = require('../routes/adminRouter');
const groupsRouter = require('../routes/groupsRouter');
const hashRouter = require('../routes/hashRouter');
const axios = require('axios');

// middleware function for OAuth
const {validateUser} = require('./middleware/authenticator');

//Require env variables
require('dotenv').config();
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/admin', validateUser, adminRouter);
server.use('/api/template', validateUser, templateRouter);
server.use('/api/contacts', validateUser, contactsRouter);
server.use('/api/groups', validateUser, groupsRouter);
server.use('/api/inviteToGroup', hashRouter);

server.get('/', (req, res) => {
  res.send({ api: 'Ok', dbenv: process.env.DB_ENV });
});


module.exports = server;
