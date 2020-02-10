const express = require("express");
const User = require("../model/User");
// const Event = require("../model/Event");


const router = express.Router();

// Get User
router.get("/:id", async (req, res) => {
  try {
    const profile = await User.findOne({ googleId: req.params.id });
    // const events = await Event.find({
    //   userId: req.user.id
    // }).select('_id');
    const { _id, name, email, photoUrl } = profile;
    res.send({ _id, name, email, photoUrl}); 
  } catch (error) {
    res.status(400).send(error);
  }
});

// // Update User
// router.patch("/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           ...req.body
//         }
//       }
//     );
//     res.json({
//       message: `User: ${updatedUser._id} updated`
//     });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.findOneAndRemove({ _id: req.params.id });
    res.json({
      message: `User: ${removedUser._id} deleted`
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
