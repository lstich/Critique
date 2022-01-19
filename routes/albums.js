var express = require("express");
var router = express.Router();

let mongoose = require("./../db/mongoose");
let Album = require("../schema/Album.model.js");

/* GET home page. */
router.get("/getAlbums", function (req, res, next) {
  Album.find().then(
    (albums) => {
      res.send({ albums });
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

router.post("/addAlbum", function (req, res, next) {
  let newAlbum = new Album({
    albumId: "4",
    title: "Hello world4",
    artist: "meee",
    userRatings: [
      {
        userId: "hello",
        rating: 4,
      },
      {
        userId: "hello2",
        rating: 5,
      },
    ],
  });

  newAlbum.save().then(
    (doc) => {
      console.log("Sent! ", doc);
      res.send({ albums });
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
