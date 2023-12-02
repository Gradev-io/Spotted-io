const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const bodyParser = require("body-parser");
const images = require("../image");
const data = require("../data");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", (req, res) => {
  data.findOne({ username: req.session.username }).then((foundUser) => {
    res.render("profile", { use: foundUser });
  });
});
router.post("/", upload.single("avatar"), (req, res) => {
  data.findOne({ username: req.session.username }).then((foundUser) => {
    const newImage = new images({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    foundUser.images.push(newImage);
    foundUser.save();

    res.render("profile", { use: foundUser });
  });
});

module.exports = router;
