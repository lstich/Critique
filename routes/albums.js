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

router.post("/userRateAlbum", function (req, res, next) {
  let { username, albumId, rating } = req.body;

  let album = await Album.findOne({ albumId: albumId });
  if (album){
    let newRating = {
      userId: username,
      rating: rating,
    }
    let newarray= album.userRatings.push(newRating)
    
    let response = await Album.updateOne({albumId: albumId}, {userRatings:newarray});

    res.send("Things went well: " + response.acknowledged);
  }
  else{
  res.send("album doesnt exist")
  }

  //create and add new user
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
