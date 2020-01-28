const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoute = require("../routes/auth");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/user", authRoute);

server.get("/", (req, res) => {
  res.send({ api: "Ok" });
});

module.exports = server;
