const router = require("express").Router();

const authenticateUser = require("../auth/authenticate-middleware");
const verifyUser = require("../auth/verify-user-middleware");
const verifyCalendar = require("../middleware/verify-calendar-uuid-middleware");
const verifyEvent = require("../middleware/verify-event-uuid-middleware");

const Events = require("./event-model");

router.get(
	"/:cal_uuid/events/",
	[authenticateUser, verifyUser, verifyCalendar],
	async (req, res) => {
		try {
			const response = await Events.get(req.calendarId);

			res.status(200).json(response);
		} catch (err) {
			console.log("event GET error", err);
			res
				.status(400)
				.json({ message: "error fetching events", error: `${err}` });
		}
	}
);

router.get("/:cal_id/events/:id", async (req, res) => {
	try {
		const { cal_id, id } = req.params;
		const response = await Events.getById(cal_id, id);

		res.status(200).json(response);
	} catch (err) {
		console.log("event GET BY ID error", err);
		res.status(400).json({ message: "error fetching event", error: `${err}` });
	}
});

router.post(
	"/:cal_uuid/events/",
	[authenticateUser, verifyUser, verifyCalendar],
	async (req, res) => {
		try {
			const response = await Events.add(req.calendarId, req.body);

			res.status(200).json(response);
		} catch (err) {
			console.log("event POST error", err);
			res.status(400).json({ message: "error adding event", error: `${err}` });
		}
	}
);

router.delete(
	"/events/:event_uuid",
	[authenticateUser, verifyUser, verifyEvent],
	async (req, res) => {
		try {
			const response = await Events.remove(req.eventId);

			res.status(200).json(response);
		} catch (err) {
			console.log("event DELETE error", err);
			res
				.status(400)
				.json({ message: "error deleting event", error: `${err}` });
		}
	}
);

router.put(
	"/events/:event_uuid",
	[authenticateUser, verifyUser, verifyEvent],
	async (req, res) => {
		try {
			const response = await Events.update(req.eventId, req.body);

			res.status(200).json(response);
		} catch (err) {
			console.log("event PUT error", err);
			res
				.status(400)
				.json({ message: "error updating event", error: `${err}` });
		}
	}
);
module.exports = router;
