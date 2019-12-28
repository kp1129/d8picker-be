const Calendars = require("../routes/calendar-model");

const verifyCalendarIsPublic = async (req, res, next) => {
	const calendarId = req.calendarId;

	const calendar = await Calendars.getByCalendarId(calendarId);

	if (calendar.isPrivate === 1 || calendar.isPrivate) {
		res.status(400).json({
			message: "calendars/the action cannot be performed on a private calendar"
		});
	} else {
		next();
	}
};

module.exports = verifyCalendarIsPublic;
