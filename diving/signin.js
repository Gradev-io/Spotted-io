const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersSchema = require("../data");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const router = express.Router();

router

  .get("/", (req, res) => {
    res.render("signin");
  })
  .post("/", (req, res) => {
    const Data = usersSchema;
    Data.findOne({ username: req.body.username })
      .then(function (foundUser) {
        const username = (req.session.username = foundUser.username);
        const password = (req.session.password = foundUser.password);

        res.render("profile", { use: foundUser });
      })
      .catch((err) => {
        console.log(err);
        res.render("signup");
      });
  });
module.exports = router;
