const router = require("express").Router();
const Calendars = require("./calendar-model");
const Events = require("../routes/event-model");
const uuidv1 = require("uuid/v1");

const authenticateUser = require("../auth/authenticate-middleware");
const verifyUser = require("../auth/verify-user-middleware");
const verifyCalendar = require("../middleware/verify-calendar-uuid-middleware");
const verifyCalendarIsPublic = require("../middleware/verify-calendar-public-middleware");

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

router.get(
	"/:cal_uuid/events/",
	[authenticateUser, verifyUser, verifyCalendar],
	async (req, res) => {
		try {
			const events = await Events.get(req.calendarId);

			const response = {
				calendarUuid: req.calendarUuid,
				events
			};

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

router.get(
	"/:cal_uuid/",
	[authenticateUser, verifyUser, verifyCalendar, verifyCalendarIsPublic],
	async (req, res) => {
		const { subscribableLink } = req.query;
		const { cal_uuid } = req.params;

		let url = process.env.URL;

		if (subscribableLink) {
			try {
				const link = `${url}/subscribe/?calendar=true&id=${cal_uuid}`;
				res.status(200).json(link);
			} catch (error) {
				console.log("calendars/cannot create subscribable calendar link");
				res.status(500).json({
					message: "calendars/cannot create subscribable calendar link"
				});
			}
		}

		res.status(200).json("no link");
	}
);

router.put(
	"/:cal_uuid/",
	[authenticateUser, verifyUser, verifyCalendar],

	async (req, res) => {
		if (Object.keys(req.query).length > 0) {
			const subscribe = req.query.subscribe;

			if (subscribe == "true") {
				const subscribed = await Calendars.subscribe(
					req.calendarId,
					req.user.userId
				);

				res.status(200).json(subscribed);
			} else if (subscribe == "false") {
				const unsubscribed = await Calendars.unsubscribe(
					req.calendarId,
					req.user.userId
				);
				res.status(200).json(unsubscribed);
			} else {
				res.status(400).json({ message: "calendars/invalid request" });
			}
		} else {
			try {
				const updated = await Calendars.update(req.calendarId, req.body);

				res.status(200).json(updated);
			} catch (error) {
				console.log("calendars/cannot update calendar");
				res.status(500).json({ message: "calendars/cannot update calendar" });
			}
		}
	}
);

module.exports = router;
