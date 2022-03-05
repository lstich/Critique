var express = require("express");
var router = express.Router();
let bcrypt = require("bcrypt");

let mongoose = require("./../db/mongoose");
let User = require("../schema/User.model.js");

let saltRounds = 10;

router.get("/", function (req, res, next) {
  res.status(400).send("yoooooo");
});

/* GET home page. */
router.post("/login", async function (req, res, next) {
  let { username, password } = req.body;

  let existingUser = await User.findOne({ username: username });
  if (existingUser) {
    if (password == existingUser.password) {
      res.send("Logged in");
    } else {
      res.status(400).send("Password incorrect!");
    }
  } else {
    return res.status(400).send("User not found!");
  }
});
router.post("/register", async function (req, res, next) {
  let { username, password } = req.body;

  let existingUser = await User.findOne({ username: username });
  if (existingUser) return res.status(400).send("User already exists!");

  //create and add new user

  let newUser = new User({
    username: username,
    password: password,
  });
  newUser.save().then(
    (user) => {
      res.send("New User added! " + user);
    },
    (err) => {
      res.status(400).send(err);
    }
  ),
    (err) => {
      res.status(400).send(err);
    };
});

router.post("/changePassword", async function (req, res, next) {
  let { username, password } = req.body;
  let p = "password";

  let existingUser = await User.findOne({ username: username });
  if (!existingUser) return res.status(400).send("User doesnt exist!");

  //create and add new user

  existingUser.password = password;
  existingUser.save().then(
    (user) => {
      bcrypt.hash(p, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        res.send("Password Successfully Changed! " + user + " " + hash);
      });
    },
    (err) => {
      res.status(400).send(err);
    }
  ),
    (err) => {
      res.status(400).send(err);
    };
});

module.exports = router;
