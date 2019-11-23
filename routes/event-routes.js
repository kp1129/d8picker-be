const router = require("express").Router();

const authenticateUser = require("../auth/authenticate-middleware");
const verifyUser = require("../auth/verify-user-middleware");
const verifyEvent = require("../middleware/verify-event-uuid-middleware");

const Events = require("./event-model");

router.delete(
	"/:event_uuid",
	[authenticateUser, verifyUser, verifyEvent],
	async (req, res) => {
		try {
			const response = await Events.remove(req.eventId);

			res.status(200).json(response);
		} catch (err) {
			console.log("events/cannot delete event", err);
			res
				.status(500)
				.json({ message: "events/cannot delete event", error: `${err}` });
		}
	}
);

router.put(
	"/:event_uuid",
	[authenticateUser, verifyUser, verifyEvent],
	async (req, res) => {
		try {
			const response = await Events.update(req.eventId, req.body);

			res.status(200).json(response);
		} catch (err) {
			console.log("events/cannot update event", err);
			res
				.status(500)
				.json({ message: "events/cannot update event", error: `${err}` });
		}
	}
);
module.exports = router;
