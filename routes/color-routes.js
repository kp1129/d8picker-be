const router = require("express").Router();
const Colors = require("./color-models");

const authenticateUser = require("../auth/authenticate-middleware");
const verifyUser = require("../auth/verify-user-middleware");

router.get("/", [authenticateUser, verifyUser], async (req, res) => {
	try {
		const colors = await Colors.getAll();

		res.status(200).json(colors);
	} catch (error) {
		console.log("colors/cannot get calendar colors ", error);
		res.status(500).json({ message: "colors/cannot get calendar colors" });
	}
});

module.exports = router;
