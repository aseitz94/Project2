var db = require("../models");
var breweryzip = require("../routes/BreweryZip");
var zipcodes = require("zipcodes");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

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

  app.post("/detail", function(req, res) {
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