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
const adminRouter = require("../routes/calAdmin-routes");
const subscriberRouter = require("../routes/calSubs-routes");
const invitationRouter = require("../routes/invitation-routes");

//routes
server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/api/calendars/", calendarRouter);
server.use("/api/calendars/", eventRouter);
server.use("/api/calendars/", adminRouter);
server.use("/api/calendars/", subscriberRouter);
server.use("/api/invitations/", invitationRouter);

//testing server
server.get("/", (req, res) => {
	res.send("api is running");
});

module.exports = server;
