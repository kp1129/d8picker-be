const Events = require("../routes/event-model");

const verifyEventUuid = async (req, res, next) => {
	const { event_uuid } = req.params;

	if (!event_uuid) {
		res
			.status(400)
			.json({ message: "verify/missing event uuid in the request." });
	}
	try {
		const event = await Events.getByUuid(event_uuid);
		if (!event) {
			res.status(200).json({ message: "verify/invalid event uuid." });
		}

		req.eventId = event.eventId;

		next();
	} catch (err) {
		console.log("verify/verify event uuid error", err);
		res
			.status(400)
			.json({ message: "verify/verify event uuid error", error: `${err}` });
	}
};

module.exports = verifyEventUuid;
