//Setup middleware
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Pull in routes
const authRoute = require("../routes/auth");
const profileRoute = require("../routes/profile");

//Outside libraries
const cookieSession = require('cookie-session');
const passport = require('passport');

//Require env variables
require("dotenv").config();
const server = express();

//Invoke middleware
server.use(helmet());
server.use(cors());
server.use(express.json()); 

// Set cookie with 24hr session
server.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[process.env.SESSION_KEYS]
}))

//Initialize passport session
server.use(passport.initialize());
server.use(passport.session())

//Invoke routes
server.use("/api/auth", authRoute);
server.use("/api/user", profileRoute);

//GET endpoint for checking app
server.get("/", (req, res) => {
  res.send({ api: "Ok", dbenv: process.env.DB_ENV });
});

module.exports = server;
