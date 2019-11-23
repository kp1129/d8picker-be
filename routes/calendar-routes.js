const router = require("express").Router();
const Calendars = require("./calendar-model");
const Events = require("../routes/event-model");
const uuidv1 = require("uuid/v1");

const authenticateUser = require("../auth/authenticate-middleware");
const verifyUser = require("../auth/verify-user-middleware");
const verifyCalendar = require("../middleware/verify-calendar-uuid-middleware");
router.post("/", [authenticateUser, verifyUser], async (req, res) => {
	let cal = req.body;
	cal.uuid = uuidv1();
	try {
		const calendar = await Calendars.add(cal);

		if (calendar) {
			res.status(200).json(calendar);
		}
	} catch (err) {
		console.log("calendar ADD error", err);
		res.status(400).json({ message: "error adding calendar", error: `${err}` });
	}
});

router.delete("/:id", (req, res) => {
	var id = req.params.id;
	Calendars.remove(id)
		.then(deleted => {
			res.json({ deleted });
		})
		.catch(error => {
			res.status(500).json({ message: error });
		});
});
router.put("/:id", (req, res) => {
	var updated = req.body;
	var id = req.params.id;

	Calendars.update(id, updated)
		.then(response => {
			if (response > 0) {
				Calendars.getById(id).then(result => {
					res.status(200).json({ result });
				});
			} else {
				res.status(404).json({ message: "server error" });
			}
		})
		.catch(error => {
			res.status(500).json({ message: error });
		});
});
router.get(
	"/:cal_uuid/events/",
	[authenticateUser, verifyUser, verifyCalendar],
	async (req, res) => {
		try {
			const response = await Events.get(req.calendarId);

			res.status(200).json(response);
		} catch (err) {
			console.log("event GET error", err);
			res.status(500).json({
				message: "calendars/cannot get calendar events",
				error: `${err}`
			});
		}
	}
);
router.post(
	"/:cal_uuid/events/",
	[authenticateUser, verifyUser, verifyCalendar],
	async (req, res) => {
		try {
			const eventId = await Events.add(req.body);
			const calendarEvent = await Events.addCalendarsEvents(
				req.calendarId,
				eventId
			);

			res.status(200).json(calendarEvent);
		} catch (err) {
			console.log("event POST error", err);
			res.status(500).json({
				message: "calendars/cannot create new event",
				error: `${err}`
			});
		}
	}
);
module.exports = router;
