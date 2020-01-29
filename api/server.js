const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoute = require("../routes/auth");
const eventRoute = require("../routes/events");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/user", authRoute);
server.use("/api/event", eventRoute);

server.get("/", (req, res) => {
  res.send({ api: "Ok" });
});

module.exports = server;
