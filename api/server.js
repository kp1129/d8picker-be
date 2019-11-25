const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//setting up routes
const userRouter = require("../routes/user-routes");
const authRouter = require("../auth/auth-router");
const calendarRouter = require("../routes/calendar-routes");
const eventRouter = require("../routes/event-routes");
const invitationRouter = require("../routes/invitation-routes");

//routes
server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/api/calendars/", calendarRouter);
server.use("/api/events/", eventRouter);
server.use("/api/invitations/", invitationRouter);

//testing server
server.get("/", (req, res) => {
	res.send("api is running");
});

module.exports = server;
