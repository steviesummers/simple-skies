const mongoose = require("mongoose");

const skyshotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Skyshot = mongoose.model("SkyShot", skyshotSchema);

module.exports = Skyshot;
