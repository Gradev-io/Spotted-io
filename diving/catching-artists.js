const mongoose = require("mongoose");
const express = require("express");
const user = require("../data");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const router = express.Router();

router
  .get("/", (req, res) => {
    user
      .find({})
      .then((foundUser) => {
        res.render("homepage", { users: foundUser });
      })
      .catch((err) => {
        console.log(err);
        res.render("homepage");
      });
  })
  .post("/", (req, res) => {
    user
      .find({})
      .then((foundUser) => {
        res.render("artist-profile", { use: foundUser[req.body.key] });
      })
      .catch((err) => {
        console.log(err);
        res.render("homepage");
      });
  });
module.exports = router;
