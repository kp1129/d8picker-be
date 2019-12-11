const Calendars = require("../routes/calendar-model");
// the middleware must place after verify-user and verify-calendar middleware

const verifyCalendarSubscriber = async (req, res, next) => {
	try {
		const calendar = await Calendars.getByCalendarIdAndUserId(
			req.calendarId,
			req.user.userId
		);

		if (calendar) {
			next();
		} else {
			res.status(401).json({
				message:
					"The action can only be performed by a calendar subscriber or owner"
			});
		}
	} catch (error) {
		console.log("calendars/cannot get a user calendar ", error);
		res.status(500).json({
			message: "calendars/cannot get a user calendar"
		});
	}
};

module.exports = verifyCalendarSubscriber;
