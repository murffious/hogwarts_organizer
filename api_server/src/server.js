var express = require("express");
var bodyParser = require("body-parser");

// bring in the models
var db = require("./models");
var cors = require("cors");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Routes
// alternate way
// var routes = require("./controllers/...js");

// app.use("/", routes);

require("./controllers/courses_controller.js")(app);
require("./controllers/grades_controller.js")(app);
require("./controllers/students_controller.js")(app);

// listen on port 3000
var PORT = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
