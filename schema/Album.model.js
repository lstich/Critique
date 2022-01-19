const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    albumId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      default: "untitled",
    },
    artist: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      default: "unknown",
    },
    cover: {
      type: String,
      required: false,
      unique: false,
      default: "unknown",
    },
    rating: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    numRatings: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
      default: 0,
    },
    userRatings: [
      {
        userId: String,
        rating: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 'Albums' here refer to the collection name
const Albums = mongoose.model("Albums", albumSchema);

module.exports = Albums;
