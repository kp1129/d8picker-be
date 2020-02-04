const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const {
	registerValidation,
	loginValidation
} = require('../helpers/validation');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
	// validate data before creating user
	const { error } = registerValidation(req.body);
	if (error) {
		const { details } = error;
		const message = details.map(detail => detail.message).join(',');
		res.status(422).json({ error: message });
	}

	const { name, email, password } = req.body;

	try {
		// check if user already exists
		const userExist = await User.findOne({ email });
		if (userExist)
			return res.status(400).json({ message: 'User is already registered' });

		// hash passwords
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user
		const user = new User({
			name,
			email,
			password: hashedPassword
		});

		const newUser = await user.save();
		res.send({
			id: newUser._id,
			name: newUser.name,
			email: newUser.email
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

// Login
router.post('/login', async (req, res) => {
	// validate data before logging in user
	const { error } = loginValidation(req.body);
	if (error) {
		const { details } = error;
		const message = details.map(detail => detail.message).join(',');
		res.status(422).json({ error: message });
	}

	const { email, password } = req.body;

	try {
		// check if user exists
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User doesn't exist" });

		// check if password is correct
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(400).json({ message: 'Invalid Password' });

		//  create token
		const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
		res
			.header('authorization', token)
			.status(201)
			.json({
				user: {
					id: user._id,
					name: user.name,
					email: user.email
				},
				token
			});
	} catch (error) {
		res.status(400).json(error);
	}
});

// auth with google
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile']
	})
);
// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.status(200).json({ message: 'You reached the callback URI' });
});
module.exports = router;
