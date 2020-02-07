const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../model/User');

require('dotenv').config();

// Google Strategy
const strategyConfig = {
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: '/api/auth/google/redirect'
};

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   })
// });

passport.use(
	new GoogleStrategy(
		strategyConfig,
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Should get full user profile
				console.log('profile', profile);
				console.log('accessToken', accessToken);
				console.log('refreshToken', refreshToken);
				// Find user by data from token
				const existingUser = await User.findOne({ 'google.id': profile.id });
				if (existingUser) {
					return done(null, existingUser);
				}

				const newUser = new User({
					name: profile.displayName,
					googleId: profile.id,
					email: profile.emails[0].value,
					photoUrl: profile.photos[0].value
				});

				await newUser.save();
				done(null, newUser);
			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);
