const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

require("../config/passport-setup");
require("dotenv").config();

const router = express.Router();

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar.events"
    ]
  }),
  
);

// callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // const token = jwt.sign({ id: req.user._id }, process.env.TOKEN_SECRET);
    // res.status(200).json({ token });
res.redirect('http://localhost:3001/home')
  }
);

module.exports = router;
