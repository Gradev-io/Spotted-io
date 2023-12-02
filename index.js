const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const user_data = require("./data");
const user_image = require("./image");
const Auth = require("./diving/isAuth");
const Artists = require("./diving/catching-artists");
const login = require("./diving/signin");
const register = require("./diving/signup");
const addImages = require("./diving/addingimages");
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoose is connected to ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

app.use("/", Auth);
app.use("/login", login);
app.use("/register", register);
app.use("/add-image", addImages);
app.use("/homepage", Artists);
app.use("/artProfile", Artists);
app.route("/signin").get((req, res) => {
  res.render("signin");
});
app.route("/signup").get((req, res) => {
  res.render("signup");
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`online on port 3000`);
  });
});
