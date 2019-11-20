const router = require("express").Router();

const authenticate = require("../auth/authenticate-middleware.js");
const verify = require("../auth/verify-user-middleware");

const Users = require("./user-model.js");

// get user calendars with user id
router.get("/calendars", [authenticate, verify], async (req, res) => {
	const { id } = req.user;
	try {
		const calendars = await Users.getCalendars(id);

		res.status(200).json({ calendars });
	} catch (error) {
		console.log("user calendar/could not get user calendar ", error);
		res.status(500).json({
			message: "user calendar/could not get user calendar",
			error: err
		});
	}
});

module.exports = router;
