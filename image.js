const mongoose = require("mongoose");

const images = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Image = new mongoose.model("Image", images);
module.exports = Image;
