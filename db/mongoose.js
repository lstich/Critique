let mongoose = require("mongoose");

let URI =
  "mongodb+srv://lstich:mongo@cluster-critique.v6p6g.mongodb.net/Critique";

mongoose.Promise = global.Promise;
mongoose.connect(URI);

module.exports = { mongoose };

/*const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});*/
