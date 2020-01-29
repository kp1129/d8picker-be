const express = require("express");
const User = require("../model/User");
// const Event = require("../model/Event");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Get User
router.get("/:id/profile", verifyToken, async (req, res) => {
  try {
    const profile = await User.findOne({ _id: req.params.id });
    // const events = await Event.find({
    //   userId: req.user.id
    // }).select('_id');
    const { _id, name, email } = profile;
    res.send({ _id, name, email, events: [] }); // add events when ready
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
