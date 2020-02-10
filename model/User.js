const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  photoUrl: String,
  accessToken: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.index(
  {
    user: 1,
    googleId: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model("user", userSchema);
