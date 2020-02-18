const googleUtil = require('../utils/google-util');

// middleware to check and save session
const setSession = async (req, res, next) => {
  await googleUtil.getGoogleAccountFromCode(req.query.code, (err, res) => {
    if (err) {
      // Redirect to login endpoint
      res.redirect('/api/auth/login');
    } else {
      req.session.user = res;
    }
    next();
  });
};

module.exports = setSession;
