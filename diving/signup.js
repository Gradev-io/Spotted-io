const bodyParser = require("body-parser");
const usersSchema = require("../data");
const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const images = require("../image");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
router
  .get("/", (req, res) => {
    res.render("home");
  })
  .post("/", upload.single("avatar"), (req, res) => {
    const Data = usersSchema;
    const newImage = new images({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    const newUser = new Data({
      profilePicture: newImage,
      username: req.body.username,
      password: req.body.password,
      instagram_link: req.body.instagram_link,
      facebook_link: req.body.facebook_link,
      behance_link: req.body.behance_link,
      twitter_link: req.body.twitter_link,
    });
    newUser.save();
    res.render("signin");
  });

module.exports = router;
