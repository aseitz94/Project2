require("dotenv").config();

var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

var passport = require("./config/passport");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));
<<<<<<< HEAD
var methodOverride = require('method-override')
app.use(methodOverride('_method'));
=======
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

//Sessions to keep track of user's login status
// eslint-disable-next-line prettier/prettier
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f

// Handlebars
var hbs = exphbs.create({
  defaultLayout: 'main'
});


app.engine(
  "handlebars",
  hbs.engine
);

app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
<<<<<<< HEAD
module.exports = function () {
  this.BreweryZip = require('./routes/BreweryZip');
}
module.exports = app;
=======

module.exports = function() {
  this.BreweryZip = require("./routes/BreweryZip");
};
//

module.exports = app;
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f
