let express = require("express");
let bodyParser = require("body-parser");
let albumsRouter = require("./routes/albums");
let indexRouter = require("./routes/index");

let PORT = 3000;

let app = express();

app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/albums", albumsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log("Started up on port " + PORT);
});
