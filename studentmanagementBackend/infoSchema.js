const mongoose = require("mongoose");

const infoSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("info", infoSchema);
