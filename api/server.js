require("../config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerDoc = require("../swaggerDoc");
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
const colorRouter = require("../routes/color-routes");

//routes
server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/api/calendars/", calendarRouter);
server.use("/api/events/", eventRouter);
server.use("/api/invitations/", invitationRouter);
server.use("/api/colors", colorRouter);

swaggerDoc(server);

//testing server
server.get("/", (req, res) => {
	res.send("api is running");
});

module.exports = server;
