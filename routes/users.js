var express = require("express");
var router = express.Router();
let bcrypt = require("bcrypt");

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
    bcrypt.compare(passord, existingUser.password, function (err, result) {
      console.log(result);
      if (result == true) {
        res.send("Logged in");
        // The Password is Correct!
      } else {
        res.status(400).send("Password incorrect!");
        // Your password is not correct.
      }
    });

    /*if (password == existingUser.password) {
      res.send("Logged in");
    } else {
      res.status(400).send("Password incorrect!");
    }*/
  } else {
    return res.status(400).send("User not found!");
  }
});

router.post("/register", async function (req, res, next) {
  let { username, password } = req.body;

  let existingUser = await User.findOne({ username: username });
  if (existingUser) return res.status(400).send("User already exists!");

  //encrypt password
  try {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      //create and add new user
      let newUser = new User({
        username: username,
        password: hash,
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
  } catch (err) {
    console.log(err);
  }
});

router.post("/changePassword", async function (req, res, next) {
  let { username, password } = req.body;
  let p = "password";

  let existingUser = await User.findOne({ username: username });
  if (!existingUser) return res.status(400).send("User doesnt exist!");

  try {
    bcrypt.hash(p, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);

      //create and add new user

      existingUser.password = hash;
      existingUser.save().then(
        (user) => {
          res.send("Password Successfully Changed! " + user);
        },
        (err) => {
          res.status(400).send(err);
        }
      ),
        (err) => {
          res.status(400).send(err);
        };
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
