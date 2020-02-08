const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    min: 6,
    max: 64
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 120
  },
  location: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  color: {
    type: String,
    required: false,
    min: 4,
    max: 64
  }
});

module.exports = mongoose.model("event", eventSchema);
