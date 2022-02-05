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
      res.status(400).send("User not found");
    }
  );
});
router.post("/register", function (req, res, next) {
  let { username, password } = req.body;
  User.findOne({ username: username }).then(
    (user) => {
      res.status(400).send("User already exists!");
      //res.send({ albums });
    },
    (err) => {
      res.status(400).send("User not found");
    }
  );
});

router.post("/addAlbum", function (req, res, next) {});

module.exports = router;
