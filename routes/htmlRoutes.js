var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
   res.sendFile(path.join(_dirname, "../public/index.html"))
  });

  app.get("/sign-in", function(req, res) {
    res.sendFile(path.join(_dirname, "../public/sign-page.html"))
   });

  app.get("/profile-index", function(req, res) {
    res.sendFile(path.join(_dirname, "../public/profile-html/profile_index"))
  });
  
  app.get("/favorites", function(req, res) {
    res.sendFile(path.join(_dirname, "../public/profile-html/profile_favorites.html"))
  });

  app.get("/visited", function(req, res) {
    res.sendFile(path.join(_dirname, "../public/profile-html/profile_visited.html"))
   });
  
  app.get("/reviews", function(req, res) {
    res.sendFile(path.join(_dirname, "../public/profile-html/profile_reviews.html"))
   });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
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
