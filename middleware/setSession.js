const googleUtil = require('../utils/google-util');
const { google } = require('googleapis');

// middleware to check and save session
const setSession = async (req, res, next) => {
  const code = req.headers['authorization'];
  try {
    await googleUtil.getGoogleAccountFromCode(code, (err, res) => {
      if (err) {
        // Redirect to login endpoint
        res.redirect((process.env.NODE_ENV !== 'development') ? `${process.env.PRODUCTION_FRONTEND_URL}/authenticate/google` : `${process.env.FRONTEND_URL}/authenticate/google`);
      } else {
        req.session.user = res;
        // Should setCredentails to get access to tokens
        const oauth2Client = new google.auth.OAuth2();
        const { tokens } = oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // Doesn't seem to help
        oauth2Client.on('tokens', tokens => {
          if (tokens.refresh_token) {
            // store the refresh_token in my database!
            req.session.refresh_token = tokens.refresh_token;
          }
          console.log(tokens.access_token);
        });
      }
      next();
    });
  } catch (error) {
    console.log({ errorMessage: error.message });
  }
};

module.exports = setSession;
