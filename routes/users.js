var express = require("express");
var router = express.Router();

let mongoose = require("./../db/mongoose");
let User = require("../schema/User.model.js");

/* GET home page. */
router.post("/login", function (req, res, next) {
  let { username, password } = req.body;
  User.findOne({ username: username }).then(
    (user) => {
      if (password == user.password) {
        res.status(400).send("Password match!");
        //res.send({ albums });
      }
    },
    (err) => {
      res.status(400).send(err);
    }
  );
  res.status(400).send("User not found!");
});
router.post("/register", function (req, res, next) {
  let { username, password } = req.body;
  User.findOne({ username: username }).then(
    (user) => {
      res.status(400).send("User already exists!");
      return;
      //res.send({ albums });
    },
    (err) => {
      res.status(400).send(err);
    }
  );

  //create and add new user

  let newUser = new User({
    username: username,
    password: password,
  });
  newUser.save().then(
    (user) => {
      console.log("New User Added! ", user.username);
    },
    (err) => {
      res.status(400).send(err);
    }
  ),
    (err) => {
      res.status(400).send(err);
    };
});

router.post("/addAlbum", function (req, res, next) {});

module.exports = router;
