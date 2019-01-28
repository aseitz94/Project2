/* eslint-disable camelcase */
var path = require("path");

var breweryzip = require("../routes/BreweryZip");
var zipcodes = require("zipcodes");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function(req, res) {
    // If the user already has an account send them to the profile page
    res.render("../views/index.handlebars");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to their profile page
    if (req.user) {
      res.redirect("..public/profile-html/profile_index");
    }
    res.sendFile(path.join(__dirname, "../public/login-page.html"));
  });

  app.get("/profile", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/profile-html/profile_index.html")
    );
  });

  app.get("/favorites", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/profile-html/profile_favorites.html")
    );
  });

  app.get("/visited", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/profile-html/profile_visited.html")
    );
  });

  app.get("/reviews", isAuthenticated, function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/profile-html/profile_reviews.html")
    );
  });

  //Search Breweries
  app.post("/search", function (req, res) {
    var breweriesArray = [];
    var certified = req.body.certified;
    console.log("value" + certified);
    var testZip = req.body.place_event;
    var testRadius = req.body.radius;
    var zipObject = zipcodes.lookup(testZip);
    if (zipObject !== undefined) {
      var latitude = zipObject.latitude;
      var longitude = zipObject.longitude;
    }
    breweryzip.getBreweriesZip(
      testZip,
      testRadius,
      breweriesArray,
      certified,
      function (data, err) {
        if (!err) {
          //console.log("resultado "+JSON.stringify(data));
          res.render("explore-sidebar-map", {
            zip_code: testZip,
            data: data,
            lat: latitude,
            lng: longitude,
            result: JSON.stringify(data)
          });
        } else {
          res.render("index");
        }
      }
    );
  });

  app.post("/detail", function (req, res) {
    var name_brewery = req.body.name_brewery;
    var address_brewery = req.body.address_brewery;
    var overview_brewery = req.body.overview_brewery;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var phone = req.body.phone;
    var website = req.body.website;

    res.render("listing-detail-sidebar", {
      name_brewery: name_brewery,
      address_brewery: address_brewery,
      overview_brewery: overview_brewery,
      latitude: latitude,
      longitude: longitude,
      phone: phone,
      website: website
    });
  });
// Render 404 page for any unmatched routes
app.get("*", function (req, res) {
  res.render("404");
});
};