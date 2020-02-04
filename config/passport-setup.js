const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const User = require('../model/User');

passport.use(
	new GoogleStategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/auth/google/redirect'
		},
		(accessToken, refreshToken, profile, done) => {
			// check if user already exists in DB
			User.findOne({ googleId: profile.id }).then(currentUser => {
				if (currentUser) {
					// already have a user
					console.log('user is:', currentUser);
				} else {
					// if not, create new User in DB
					new User({
                        name: profile.displayName,
                        email: ,
						googleId: profile.id
					})
						.save()
						.then(newUser => {
							console.log('new user created:', newUser);
						});
				}
			});
		}
	)
);
