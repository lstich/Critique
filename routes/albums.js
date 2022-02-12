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

router.post("/userRateAlbum", async function (req, res, next) {
  let { username, albumId, rating } = req.body;
  try {
    let album = await Album.findOne({ albumId: albumId });
    if (album) {
      let newRating = {
        userId: username,
        rating: rating,
      };

      console.log("please be nll: " + album.userRatings[0] === null);
      console.log("please be nll: " + album.userRatings[0] == null);
      console.log("please be nll: " + album.userRatings[0] === "null");
      console.log("please be nll: " + album.userRatings[0] == "null");

      album.userRatings.filter((element) => {
        return element !== null;
      });

      /*if (album.userRatings.includes(null) == true) {
        console.log("array2 contains null value");
      }*/
      if (album.userRatings.indexOf(null) == 0) {
        album.userRatings.shift();
      }

      //console.log(album.userRatings);
      /*let newMap = new Map(
        album.userRatings.map((obj) => [obj.userId, obj.rating])
      );*/

      //console.log("Map " + newMap.size + " " + newMap.keys());

      //newMap.set(username, rating);

      //console.log("num " + album.userRatings);

      //console.log(album.userRatings);

      album.userRatings.push(newRating);

      album.userRatings;

      album.numRatings = album.userRatings.length;

      //console.log(album.userRatings);

      album.save().then(
        (doc) => {
          console.log("Sent! ", doc);
          //res.send({ albums });
        },
        (err) => {
          res.status(400).send(err);
        }
      ),
        (err) => {
          res.status(400).send(err);
        };

      /*let response = await Album.updateOne(
        { albumId: albumId },
        { numRatings: num, userRatings: album.userRatings.push(newRating) }
      );*/
      res.send("Things went well: ");
      //res.send("Things went well: " + response.acknowledged);
    } else {
      res.send("album doesnt exist");
    }
  } catch (err) {
    console.log(err);
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
