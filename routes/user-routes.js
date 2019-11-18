const router = require("express").Router();

const authenticate = require("../auth/authenticate-middleware.js");
const verify = require("../auth/verify-user-middleware");

const Users = require("./user-model.js");

router.get("/", (req, res) => {
	Users.get()
		.then(users => {
			res.json({ users });
		})
		.catch(err => {
			nsole.log(err);
			res.status(500).json({ message: `server 500 error` });
		});
});

// get user calendars with user id
router.get("/calendars", [authenticate, verify], async (req, res) => {
	const { id } = req.user;
	try {
		const calendars = await Users.getCalendars(id);

		res.status(200).json({ calendars });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Could not get Calendar", error: err });
	}
});

module.exports = router;
