const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
    min: 6,
    max: 128
  },
  description: {
    type: String,
    required: false,
    min: 6,
    max: 120
  },
  starttime: {
    type: String,
    required: true,
    min: 6,
    max: 8
  },
  endtime: {
    type: String,
    required: true,
    min: 6,
    max: 8
  }
});

module.exports = mongoose.model("template", templateSchema);
