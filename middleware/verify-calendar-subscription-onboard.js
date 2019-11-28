const moment = require("moment");
const Invitations = require("../routes/invitation-model");
const Calendars = require("../routes/calendar-model");
const verifyCalendarSubcriptionOnboarding = async (req, res, next) => {
	const { subscribe, invitationCode, cuuid } = req.query;

	if (subscribe && invitationCode && cuuid) {
		try {
			const invitation = await Invitations.getBy({ invitationCode });
			const calendar = await Calendars.getByUuid(cuuid);

			console.log("Invitation", invitation);

			console.log("Calendar", calendar);

			if (
				invitation &&
				invitation.isUsed === 0 &&
				moment().isBefore(invitation.expired_at)
			) {
				if (calendar) {
					req.subscription = {
						invitationCode,
						cuuid
					};
					next();
				} else {
					res
						.status(400)
						.json({ message: "subscriptions/invalid calendar uuid" });
				}
			} else {
				res
					.status(400)
					.json({ message: "subscriptions/invalid invitation code" });
			}
		} catch (error) {
			console.log({
				message: `subscriptions/unable to subscribe to the calendar ${error}`
			});
			res.status(401).json({
				message: "subscriptions/unable to subscribe to the calendar"
			});
		}
	} else {
		next();
	}
};

module.exports = verifyCalendarSubcriptionOnboarding;
