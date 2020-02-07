const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// require("../middleware/passport");
const authRoute = require("../routes/auth");
const profileRoute = require("../routes/profile");
const cookieSession = require('cookie-session');
require("dotenv").config();
const passport = require('passport');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[process.env.SESSION_KEYS]
}))

server.use(passport.initialize());
server.use(passport.session())


server.use("/api/auth", authRoute);
server.use("/api/user", profileRoute);

server.get("/", (req, res) => {
  res.send({ api: "Ok", dbenv: process.env.DB_ENV });
});

module.exports = server;
