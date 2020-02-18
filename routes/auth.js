const express = require('express');
const googleUtil = require('../utils/google-util');
const setSession = require('../middleware/setSession');

require('dotenv').config();

const router = express.Router();

// Redirect for authentication uri
router.get('/login', (req, res) => {
  res.redirect(googleUtil.urlGoogle());
});

// callback route for google redirect
router.get('/success', setSession, (req, res) => {
  // TODO: Should check if needed
  // TODO: change to environment variable
  res.redirect(`${process.env.FRONTEND_URL}/redirect`);
});

// Delete session and logout
// Should redirect on the front end
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      // res.redirect("/");
    }
    res.clearCookie('sid');
    // res.redirect("/");
  });
});

module.exports = router;
