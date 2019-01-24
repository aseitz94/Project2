var db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // If the user already has an account send them to the profile page
    if (req.user) {
      res.redirect("..public/profile-html/profile_index");
    }
    res.sendFile(path.join(_dirname, "../public/index.html"));
  });

  app.get("/sign-in", function(req, res) {
    // If the user already has an account send them to their profile page
    if (req.user) {
      res.redirect("..public/profile-html/profile_index");
    }
    res.sendFile(path.join(_dirname, "../public/login-page.html"));
  });

  app.get("/profile", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(_dirname, "../public/profile-html/profile_favorites.html")
    );
  });

  app.get("/favorites", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(_dirname, "../public/profile-html/profile_favorites.html")
    );
  });

  app.get("/visited", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(_dirname, "../public/profile-html/profile_visited.html")
      // eslint-disable-next-line prettier/prettier
    );
  });

  app.get("/reviews", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(_dirname, "../public/profile-html/profile_reviews.html")
    );
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
