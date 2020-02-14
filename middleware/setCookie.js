const googleUtil = require("../utils/google-util");

// middleware to check and save session cookie
const setCookie = async (req, res, next) => {
  googleUtil.getGoogleAccountFromCode(req.query.code, (err, res) => {
    if (err) {
      // Redirect to login endpoint
      res.redirect("/api/auth/login");
    } else {
      // console.log('Cookie Res:', res)
      req.session.user = res;
    }
    next();
  });
};

module.exports = setCookie;
