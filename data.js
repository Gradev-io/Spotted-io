const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
  profilePicture: {},
  bio: String,
  username: String,
  password: String,
  instagram_link: String,
  facebook_link: String,
  behance_link: String,
  twitter_link: String,
  images: Array,
});

const Data = new mongoose.model("Data", user_schema);
module.exports = Data;
