const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passportSetup = require('../config/passport-setup');
const authRoute = require("../routes/auth");
const profileRoute = require("../routes/profile");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRoute);
server.use("/api/user", profileRoute);

// set up view engine
server.set('view engine', 'ejs');

server.get("/", (req, res) => {
  res.send({ api: "Ok", dbenv: process.env.DB_ENV  });
});


module.exports = server;
