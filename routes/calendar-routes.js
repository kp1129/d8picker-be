const router = require("express").Router();
const Calendar = require("./calendar-model");
const AdminCalendars = require("./calAdmin-model");
const uuidv1 = require("uuid/v1");

const authenticate = require("../auth/authenticate-middleware");
const verify = require("../auth/verify-user-middleware");

router.get("/", (req, res) => {
	Calendar.get()
		.then(cal => {
			res.status(200).json({ cal });
		})
		.catch(error => {
			res.status(500).json({ message: "Could not get Calendar" });
		});
});
router.get("/:id", (req, res) => {
	var id = req.params.id;
	Calendar.getById(id)
		.then(cal => {
			res.status(200).json({ cal });
		})
		.catch(error => {
			res.status(500).json({ message: "Could not get Calendar" });
		});
});
router.post("/", [authenticate, verify], async (req, res) => {
	let cal = req.body;
	cal.uuid = uuidv1();
	try {
		const calendar = await Calendar.add(cal);

		const adminCalendar = await AdminCalendars.add(calendar.id, req.user.id);
		if (adminCalendar) {
			res.status(200).json(calendar);
		}
	} catch (err) {
		console.log("calendar ADD error", err);
		res.status(400).json({ message: "error adding calendar", error: `${err}` });
	}
});
router.delete("/:id", (req, res) => {
	var id = req.params.id;
	Calendar.remove(id)
		.then(deleted => {
			res.json({ deleted });
		})
		.catch(error => {
			res.status(500).json({ message: error });
		});
});
router.put("/:id", (req, res) => {
	var updated = req.body;
	var id = req.params.id;

	Calendar.update(id, updated)
		.then(response => {
			if (response > 0) {
				Calendar.getById(id).then(result => {
					res.status(200).json({ result });
				});
			} else {
				res.status(404).json({ message: "server error" });
			}
		})
		.catch(error => {
			res.status(500).json({ message: error });
		});
});
module.exports = router;
