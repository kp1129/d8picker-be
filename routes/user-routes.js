const router = require("express").Router();

const authenticateUser = require("../auth/authenticate-middleware.js");
const verifyUser = require("../auth/verify-user-middleware");

const Users = require("./user-model.js");

// get user calendars with user id
router.get("/calendars", [authenticateUser, verifyUser], async (req, res) => {
	const { userId } = req.user;

	try {
		const calendars = await Users.getCalendars(userId);

		res.status(200).json({ calendars });
	} catch (error) {
		console.log("users/could not get user calendar ", error);
		res.status(500).json({
			message: "users/could not get user calendar",
			error: err
		});
	}
});

module.exports = router;
