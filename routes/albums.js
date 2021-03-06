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

//get albums not rated by user
router.post("/getNewAlbums", function (req, res, next) {
  let { username } = req.body;
  Album.find({ "userRatings.userId": { $ne: username } }).then(
    (albums) => {
      res.send({ albums });
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

//add rating for the given album from the given user
router.post("/userRateAlbum", async function (req, res, next) {
  let { username, albumId, userRating } = req.body;
  try {
    let album = await Album.findOne({ albumId: albumId });
    if (album) {
      let newUserRating = {
        userId: username,
        rating: userRating,
      };
      //remove null value if exists
      if (album.userRatings.indexOf(null) == 0) {
        album.userRatings.shift();
      }
      //add new rating
      album.userRatings.push(newUserRating);

      //convert ratings to map to remove duplicates
      let newMap = new Map(
        album.userRatings.map((obj) => [obj.userId, obj.rating])
      );

      //convert map back to array for storing
      let arr = Array.from(newMap, function (item) {
        return { userId: item[0], rating: item[1] };
      });

      //set album rating
      let ratingScore = 0;

      arr.forEach(function (item) {
        if (item.rating == 1 || item.rating == 0) {
          ratingScore += item.rating;
        }
      });
      let newRating = Math.round((ratingScore * 100) / arr.length);
      //set userRatings, update numRatings and rating

      album.rating = newRating;
      album.userRatings = arr;
      album.numRatings = album.userRatings.length;

      album.save().then(
        (doc) => {
          console.log("Sent! ", doc);
        },
        (err) => {
          res.status(400).send(err);
        }
      ),
        (err) => {
          res.status(400).send(err);
        };

      res.send("Things went well! ");
    } else {
      res.send("album doesnt exist");
    }
  } catch (err) {
    console.log(err);
  }
});

//remove all ratings from gioven user
router.post("/resetUserRatings", async function (req, res, next) {
  let { username } = req.body;
  let test = "";
  let flag = 0;
  try {
    let albums = await Album.find();
    if (albums) {
      for (let i = 0; i < albums.length; i++) {
        let oldAlbumRatings = albums[i].numRatings;
        albums[i].userRatings = albums[i].userRatings.filter(function (ele) {
          return ele.userId != username;
        });

        //set album rating
        let ratingScore = 0;
        let ratings = 0;
        albums[i].userRatings.forEach(function (item) {
          if (item.rating == 1 || item.rating == 0) {
            ratings += 1;
            ratingScore += item.rating;
          }
        });

        //only update db rating if there has been a change

        let newRating = Math.round(
          (ratingScore * 100) / albums[i].userRatings.length
        );

        albums[i].rating = newRating;
        albums[i].numRatings = ratings;

        //save changes to database
        albums[i].save().then(
          (doc) => {
            console.log("Sent! ", doc);
            res.send("Database updated");
          },
          (err) => {
            res.status(400).send(err);
          }
        ),
          (err) => {
            res.status(400).send(err);
          };
      }
      res.send("Things went well! ");
    } else {
      res.send("user doesnt exist");
    }
  } catch (err) {
    console.log(err);
  }
});

//add album to the database if not already in the db
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
