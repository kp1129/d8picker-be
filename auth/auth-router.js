const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");

const Users = require("../routes/user-model.js");
const Calendars = require("../routes/calendar-model");
const secrets = require("../config/secrets.js");
const {
	validateRegistration,
	validateLogin
} = require("../auth/auth-router-middleware");

const verifyCalendarSubscriptionOnboarding = require("../middleware/verify-calendar-subscription-onboard");
/**
 * @swagger
 * definitions:
 *
 * 	NewUser:
 * 		type: object
 * 		required:
 * 			- firstName
 * 			- lastName
 * 			- email
 * 			- username
 * 			- password
 * 		properties:
 * 			firstName:
 * 				type:string
 * 			lastName:
 * 				type:string
 * 			email:
 * 				type:string
 * 			username:
 * 				type:string
 * 			password:
 * 				type:string
 *
 */
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
				email: user.email
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
							email: user.email
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
		expiresIn: "1d"
	};
	return jwt.sign(payload, secrets.jwtSecrets, options);
}

module.exports = router;
