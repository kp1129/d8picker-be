const router = require("express").Router();

const authenticateUser = require("../auth/authenticate-middleware");
const verifyUser = require("../auth/verify-user-middleware");
const verifyEvent = require("../middleware/verify-event-uuid-middleware");

const Calendars = require("./calendar-model");
const Events = require("./event-model");

router.get("/upcoming", [authenticateUser, verifyUser], async (req, res) => {
	let defaultLimit = 10;

	if (Object.keys(req.query).length > 0) {
		const { limit } = req.query;
		if (limit) {
			defaultLimit = limit;
		}
	}
	const userId = req.user.userId;
	const events = await Events.getUpcoming(userId, defaultLimit);

	res.status(200).json(events);

	try {
	} catch (error) {
		console.log("events/cannot get events", err);
		res.status(500).json({ message: "events/cannot get events" });
	}
});
router.delete(
	"/:event_uuid",
	[authenticateUser, verifyUser, verifyEvent],
	async (req, res) => {
		try {
			const response = await Events.remove(req.eventId);

			res.status(200).json(response);
		} catch (err) {
			console.log("events/cannot delete event", err);
			res.status(500).json({ message: "events/cannot delete event" });
		}
	}
);

router.put(
	"/:event_uuid",
	[authenticateUser, verifyUser, verifyEvent],

	async (req, res) => {
		const uuid = req.body.calendarUuid;

		delete req.body.calendarUuid;
		try {
			const calendar = await Calendars.getByUuid(uuid);

			const response = await Events.update(
				req.eventId,
				req.body,
				calendar.calendarId
			);

			res.status(200).json(response);
		} catch (err) {
			console.log("events/cannot update event", err);
			res.status(500).json({ message: "events/cannot update event" });
		}
	}
);
module.exports = router;
