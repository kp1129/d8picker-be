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
<<<<<<< HEAD
const colorRouter = require("../routes/color-routes");
const twilioRouter = require("../routes/twilio-routes");
const googleCalRouter = require("../routes/google-cal-api-routes");
=======
const twilioRouter = require("../routes/twilioMessage");

>>>>>>> ca10fa706030b0d552bb8deefb00df86023ca474
//routes
server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/api/calendars/", calendarRouter);
server.use("/api/events/", eventRouter);
server.use("/api/invitations/", invitationRouter);
<<<<<<< HEAD
server.use("/api/colors", colorRouter);
server.use("/api/twilio/", twilioRouter);
server.use("/api/google/", googleCalRouter);
swaggerDoc(server);
=======
server.use("/api/twilio/", twilioRouter);
>>>>>>> ca10fa706030b0d552bb8deefb00df86023ca474

//testing server
server.get("/", (req, res) => {
	res.send("api is running");
});

module.exports = server;
