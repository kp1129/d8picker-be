const config = require("../config");
const { secrets } = config;
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");
const shortId = require("shortid");
const Users = require("../routes/user-model.js");
const Calendars = require("../routes/calendar-model");

const {
	validateRegistration,
	validateLogin
} = require("../auth/auth-router-middleware");

const verifyCalendarSubscriptionOnboarding = require("../middleware/verify-calendar-subscription-onboard");
const verifyExistingGoogleUser = require("./verify-existing-google-user-middleware");
router.post("/register", validateRegistration, async (req, res) => {
	// implement registration
	const { firstName, lastName, username, email, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);

	const newUser = {
		firstName,
		lastName,
		username,
		email,
		password: hashedPassword,
		uuid: uuidv1()
	};

	try {
		const user = await Users.add(newUser);

		const token = generateToken({
			username: user.username,
			uuid: user.uuid
		});
		await Calendars.addDefaultCalendar(user.userId);

		res.status(201).json({
			profile: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				externalType: user.externalType
			},
			accessToken: token
		});
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ message: "users/cannot create new user at this time" });
	}
});

//post login
router.post(
	"/login",
	[validateLogin, verifyCalendarSubscriptionOnboarding],
	(req, res) => {
		// implement login
		let { userId, password } = req.body;

		Users.find(userId)
			.then(user => {
				if (user && bcrypt.compareSync(password, user.password)) {
					const token = generateToken({
						username: user.username,
						uuid: user.uuid
					});
					res.status(200).json({
						profile: {
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
							externalType: user.externalType
						},

						accessToken: token
					});
				} else {
					res.status(401).json({ message: "invalid credentials" });
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ message: `server 500 error ${err}` });
			});
	}
);

router.post("/google-log-in", [verifyExistingGoogleUser], async (req, res) => {
	try {
		if (req.existingAccount) {
			const { firstName, lastName, email, username, uuid } = req.body;
			const token = generateToken({
				username,
				uuid
			});
			res.status(200).json({
				profile: {
					firstName,
					lastName,
					email
				},

				accessToken: token
			});
		} else {
			const { displayName, email, externalId } = req.body;
			const newUser = {
				firstName: "Makata",
				lastName: "User",
				username: shortId.generate(),
				email,
				uuid: uuidv1(),
				externalId,
				externalType: "google"
			};
			const user = await Users.add(newUser);
			const token = generateToken({
				username: user.username,
				uuid: user.uuid
			});
			await Calendars.addDefaultCalendar(user.userId);
			res.status(201).json({
				profile: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					externalType: user.externalType
				},
				accessToken: token
			});
		}
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ message: "users/cannot create new user at this time" });
	}
});

//get logout
router.get("/logout", (req, res) => {
	req.session.destroy(err => {
		console.log(err);
		res.status(200).json({ message: "goodbye" });
	});
});

//generate token @login
function generateToken(user) {
	const payload = {
		username: user.username,
		uuid: user.uuid
	};
	const options = {
		expiresIn: secrets.jwtExp
	};
	return jwt.sign(payload, secrets.jwt, options);
}

module.exports = router;
