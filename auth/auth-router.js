const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");

const Users = require("../routes/user-model.js");
const secrets = require("../config/secrets.js");
const {
	validateRegistration,
	validateLogin,
	validateInvitationCode
} = require("../auth/auth-router-middleware");
// post register
router.post(
	"/register",
	[validateRegistration, validateInvitationCode],
	(req, res) => {
		// implement registration
		const { firstName, lastName, username, email, password, code } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 10);
		console.log("Code ", code);
		// const newUser = {
		// 	firstName,
		// 	lastName,
		// 	username,
		// 	email,
		// 	password: hashedPassword,
		// 	uuid: uuidv1()
		// };
		// Users.add(newUser)
		// 	.then(saved => {
		// 		const token = generateToken(saved.uuid);
		// 		res.status(201).json({ accessToken: token });
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 		res.status(500).json(err);
		// 	});
	}
);

//post login
router.post("/login", validateLogin, (req, res) => {
	// implement login
	let { username, email, password } = req.body;

	Users.find(username, email, password)
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ accessToken: token });
			} else {
				res.status(401).json({ message: "invalid credentials" });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: `server 500 error ${err}` });
		});
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
		expiresIn: "1d"
	};
	return jwt.sign(payload, secrets.jwtSecrets, options);
}

module.exports = router;
