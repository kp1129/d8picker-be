const { google } = require('googleapis');
// const User = require("../model/User");

require('dotenv').config();

// google app config
const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: `${process.env.BASE_URL}/api/auth/success`
};

// scopes use for the application
const defaultScope = [
  'https://www.googleapis.com/auth/calendar.events',
  'profile',
  'email'
];

// oauth2 client
const createConnection = () => {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
};

// generate authentication url
const getConnectionUrl = auth => {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
};

// get auth url
const urlGoogle = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

// get oauth2 api
const getOAuth2 = auth => {
  return google.oauth2({
    auth: auth,
    version: 'v2'
  });
};

const getGoogleAccountFromCode = async (code, cb) => {
  const auth = createConnection();
  const { tokens } = await auth.getToken(code);
  auth.setCredentials(tokens);
  const user = await getOAuth2(auth);
  user.userinfo.get(async (err, res) => {
    if (err) {
      cb(err);
    } else {
      // console.log('Utils Tokens:', tokens)
      // console.log('ResData:', res.data)
      const userProfile = {
        googleId: res.data.id,
        accessToken: tokens.access_token,
        name: res.data.name,
        email: res.data.email,
        photoUrl: res.data.picture
      };
      // // Find user by data from token
      // const existingUser = await User.findOne({ googleId: res.data.id });
      // if (existingUser) {
      //   return done(null, existingUser);
      // }
      // const newUser = new User({
      //   googleId: res.data.id,
      //   name: res.data.name,
      //   email: res.data.email,
      //   photoUrl: res.data.picture,
      //   accessToken: tokens.access_token
      // });
      // await newUser.save();
      // Should be able to pass newUser
      cb(null, userProfile);
    }
  });
};

module.exports = {
  urlGoogle,
  getGoogleAccountFromCode
};
