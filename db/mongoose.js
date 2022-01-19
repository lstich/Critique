let mongoose = require("mongoose");

let URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://lstich:mongo@cluster-critique.v6p6g.mongodb.net/Critique";

mongoose.Promise = global.Promise;
mongoose.connect(URI);

module.exports = { mongoose };

/*const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});*/
