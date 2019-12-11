const router = require("express").Router();
const Calendars = require("./calendar-model");
const Events = require("../routes/event-model");

const authenticateUser = require("../auth/authenticate-middleware");
const verifyUser = require("../auth/verify-user-middleware");
const verifyCalendar = require("../middleware/verify-calendar-uuid-middleware");
const isCalendarPublic = require("../middleware/verify-calendar-public-middleware");
const isCalendarOwner = require("../middleware/verify-calendar-owner-middleware");
const isCalendarSubscriber = require("../middleware/verify-calendar-subscriber-middleware");

router.post("/", [authenticateUser, verifyUser], async (req, res) => {
	try {
		const calendar = await Calendars.add(req.user.userId, req.body);
		if (calendar) {
			res.status(200).json(calendar);
		}
	} catch (err) {
		console.log("calendars/error adding calendar", err);
		res.status(400).json({ message: "calendars/error adding calendar" });
	}
});
router.get(
	"/:cal_uuid",
	[authenticateUser, verifyUser, verifyCalendar],
	async (req, res) => {
		try {
			const calendar = await Calendars.getByCalendarId(req.calendarId);

			res.status(200).json(calendar);
		} catch (error) {
			console.log("calendars/error getting calendar detail", err);
			res
				.status(400)
				.json({ message: "calendars/error getting calendar detail" });
		}
	}
);
router.get(
	"/:cal_uuid/events/",
	[authenticateUser, verifyUser, verifyCalendar, isCalendarSubscriber],
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
	[authenticateUser, verifyUser, verifyCalendar, isCalendarOwner],
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
	[
		authenticateUser,
		verifyUser,
		verifyCalendar,
		isCalendarPublic,
		isCalendarOwner
	],
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

router.get(
	"/:cal_uuid/subscribers",
	[
		authenticateUser,
		verifyUser,
		verifyCalendar,
		isCalendarPublic,
		isCalendarOwner
	],
	async (req, res) => {
		try {
			const subscribers = await Calendars.getSubscribers(
				req.calendarId,
				req.user.userId
			);

			res.status(200).json(subscribers);
		} catch (error) {
			console.log("calendars/cannot get calendar subscribers ", error);
			res.status(500).json({
				message: "calendars/cannot get calendar subscribers"
			});
		}
	}
);

router.put(
	"/:cal_uuid/",
	[authenticateUser, verifyUser, verifyCalendar, isCalendarOwner],

	async (req, res) => {
		try {
			const updated = await Calendars.update(req.calendarId, req.body);
			if (updated) {
				res.status(200).json(updated);
			}
		} catch (error) {
			console.log("calendars/cannot update calendar");
			res.status(500).json({ message: "calendars/cannot update calendar" });
		}
	}
);

router.put(
	"/:cal_uuid/privacy",
	[authenticateUser, verifyUser, verifyCalendar, isCalendarOwner],
	async (req, res) => {
		const { isPrivate } = req.body;

		try {
			const calendar = await Calendars.update(req.calendarId, req.body);
			if (calendar) {
				if (isPrivate) {
					await Calendars.removeCalendarSubscribers(req.calendarId);
				}
				res.status(200).json(calendar);
			}
		} catch (error) {
			console.log("calendars/cannot update calendar privacy ", error);
			res
				.status(500)
				.json({ message: "calendars/cannot update calendar privacy" });
		}
	}
);

router.put(
	"/:cal_uuid/subscriptions",
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
				res
					.status(400)
					.json({ message: "calendar-subscriptions/invalid request" });
			}
		} else {
			res
				.status(400)
				.json({ message: "calendar-subscriptions/invalid request" });
		}
	}
);
router.delete(
	"/:cal_uuid",
	[authenticateUser, verifyUser, verifyCalendar, isCalendarOwner],
	async (req, res) => {
		try {
			const deleted = await Calendars.remove(req.calendarId);
			if (deleted) {
				res.status(200).json(deleted);
			}
		} catch (error) {
			console.log("calendars/cannot delete calendar ", error);
			res.status(500).json({ message: "calendars/cannot delete calendar" });
		}
	}
);

module.exports = router;
