var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/profile");
  });

  // Create a new user
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  //Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
  });

  // Route for getting user data to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
