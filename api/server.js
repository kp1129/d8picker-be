const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const templateRouter = require('../routes/templateRouter');

//Require env variables
require('dotenv').config();
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/template', templateRouter);

server.get('/', (req, res) => {
  res.send({ api: 'Ok', dbenv: process.env.DB_ENV });
});

module.exports = server;
