const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const authRoute = require("../routes/auth");
const profileRoute = require("../routes/profile");
const eventsRoute = require("../routes/events");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    name: "sid",
    saveUninitialized: false,
    resave: false,
    secret: "super super secret phrase",
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === "production"
    }
  })
);

server.use("/api/auth", authRoute);
server.use("/api/user", profileRoute);
server.use("/api/events", eventsRoute);

server.get("/", (req, res) => {
  res.send({ api: "Ok", dbenv: process.env.DB_ENV });
});

module.exports = server;
