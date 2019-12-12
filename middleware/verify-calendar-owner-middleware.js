const Calendars = require("../routes/calendar-model");
// the middleware must place after verify-user and verify-calendar middleware

const verifyCalendarOwner = async (req, res, next) => {
	try {
		const calendar = await Calendars.getByCalendarIdAndUserId(
			req.calendarId,
			req.user.userId
		);

		if (Boolean(calendar.isOwner)) {
			next();
		} else {
			res.status(401).json({
				message: "The action can only be performed by a calendar owner"
			});
		}
	} catch (error) {
		console.log("calendars/cannot get user calendar ", error);
		res.status(500).json({
			message: "calendars/cannot get user calendar"
		});
	}
};

module.exports = verifyCalendarOwner;
