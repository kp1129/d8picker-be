const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  photoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("user", userSchema);
