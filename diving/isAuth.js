require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");

const user = require("../data");
const session = require("express-session");
const mongoStore = require("connect-mongo");

const router = express.Router();
const Session = {
  name: "my_session",
  secret: "mysecretisyourasssmell",
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
};
router.use(session(Session));

router
  .get("/", (req, res) => {
    if (!req.session.username) {
      res.render("landing");
    } else {
      user
        .findOne({ username: req.session.username })
        .then((foundUser) => {
          res.render("profile", { use: foundUser });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })

  .post("/", (req, res) => {
    req.session.destroy();

    res.render("signin");
  });
module.exports = router;
