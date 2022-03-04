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
        if (item.rating) {
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

router.post("/resetUserRatings", async function (req, res, next) {
  let { username } = req.body;
  let test = "";
  try {
    let albums = await Album.find();
    if (albums) {
      for (let i = 0; i < albums.length; i++) {
        albums[i].userRatings = albums[i].userRatings.filter(function (ele) {
          test = ele.userId;
          return ele.userId != username;
        });

        for (let j = 0; j < albums[i].userRatings.length; j++) {
          if (albums[i].userRatings[j].userId == username) {
            albums[i].userRatings =
              albums[i].userRatings.splice(0, j) +
              albums[i].userRatings.splice(j + 1, albums[i].userRatings.length);
          }
        }
      }
      res.send("Things went well! " + username + " " + test + " " + albums);
      /*
      //set album rating
      let ratingScore = 0;

      arr.forEach(function (item) {
        if (item.rating) {
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
*/
      res.send("Things went well! ");
    } else {
      res.send("album doesnt exist");
    }
  } catch (err) {
    console.log(err);
  }
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
