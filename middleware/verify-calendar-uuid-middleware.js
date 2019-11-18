const Calendars = require("../routes/calendar-model");

const verifyCalendarUuid = async (req, res, next) => {
	const { cal_uuid } = req.params;

	if (!cal_uuid) {
		res.status(400).json({ message: "Missing calendar uuid in the request." });
	}
	try {
		const calendar = await Calendars.getByUuid(cal_uuid);
		if (!calendar) {
			res.status(200).json({ message: "Invalid calendar uuid." });
		}

		req.calendarId = calendar.id;

		next();
	} catch (err) {
		console.log("verify calendar uuid error", err);
		res
			.status(400)
			.json({ message: "error verifying calendar", error: `${err}` });
	}
};

module.exports = verifyCalendarUuid;
