const Events = require("../routes/event-model");

const verifyEventUuid = async (req, res, next) => {
	const { event_uuid } = req.params;

	if (!event_uuid) {
		res.status(400).json({ message: "Missing event uuid in the request." });
	}
	try {
		const event = await Events.getByUuid(event_uuid);
		if (!event) {
			res.status(200).json({ message: "Invalid event uuid." });
		}

		req.eventId = event.id;

		next();
	} catch (err) {
		console.log("verify event uuid error", err);
		res
			.status(400)
			.json({ message: "verify event uuid error", error: `${err}` });
	}
};

module.exports = verifyEventUuid;
