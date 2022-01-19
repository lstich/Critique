let mongoose = require("./../db/mongoose");

let Album = require("../schema/Album.model.js");

let newAlbum = new Album({
  albumId: "3",
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
  },
  (err) => {
    console.log("Oops! ", err);
  }
);
