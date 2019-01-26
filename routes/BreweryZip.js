<<<<<<< HEAD
=======
/* eslint-disable no-unused-vars */
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f
//node packages
var zipcodes = require("zipcodes");
var request = require("request");

var queryURL1 = "https://api.brewerydb.com/v2/search/geo/point?key=";
var queryURLID = "http://api.brewerydb.com/v2/{endpoint}/?key=abcdef";
var queryURLNEW = "http://api.brewerydb.com/v2/brewery/";
//api key for testing
var apiKey = "7666aff49d47c147ba22244312acf587";
//full API Key
//http://api.brewerydb.com/v2/brewery/hZZV6j/locations/?key=dd89d2e84b2df24a8168a303c291c04c location
//http://api.brewerydb.com/v2/brewery/hZZV6j/guilds/?key=dd89d2e84b2df24a8168a303c291c04c descripcion
var apiKey02 = "dd89d2e84b2df24a8168a303c291c04c";
var queryURL2 = "&lat=";
var queryURL3 = "&lng=";
var queryURL4 = "&radius=";
<<<<<<< HEAD
// var testZip = 90210;
// var testRadius = 50;

//Array to store all Brewery Objects from API Pull
//This array is populated using getBreweriesZip function
// var breweriesArray = [];

//Array to store only open Brewey Objects from API Pull
//this array is populated using the getOpenBreweries function
// var breweriesOpenArray = [];
module.exports = {
  getBreweriesZip: function(zipCode, radius, breweries, certified, callback) {
=======
var testZip = 90210;
var testRadius = 50;

//Array to store all Brewery Objects from API Pull
//This array is populated using getBreweriesZip function
var breweriesArray = [];

//Array to store only open Brewey Objects from API Pull
//this array is populated using the getOpenBreweries function
var breweriesOpenArray = [];
module.exports = {
  getBreweriesZip: function(zipCode, radius, breweries, callback) {
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f
    var zipObject = zipcodes.lookup(zipCode);
    if (zipObject !== undefined) {
      var latitude = zipObject.latitude;
      var longitude = zipObject.longitude;
      var queryURL =
        queryURL1 +
        apiKey02 +
        queryURL2 +
        latitude +
        queryURL3 +
        longitude +
        queryURL4 +
        radius;
      //var queryURL = queryURLNEW + latitude + queryURL3 + longitude + queryURL4 + radius + "&search="+zipCode;
<<<<<<< HEAD
      console.log("url", queryURL);
      request(queryURL, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        var apiData = JSON.parse(body).data;
        if (!error && response.statusCode === 200 && apiData !== undefined) {
          //empty the Brewery Array
          var breweriesArray = [];
          for (var i = 0; i < apiData.length; i++) {
            if (
              apiData[i].openToPublic === "Y" &&
              apiData[i].isClosed === "N"
            ) {
              if (
                certified === "Yes" &&
                typeof (apiData[i].brewery.brewersAssociation) !== "undefined" &&
                (apiData[i].brewery.brewersAssociation.isCertifiedCraftBrewer) ===
                  "Y"
              ) {
                breweriesArray.push(apiData[i]);
              } else if (certified === "No") {
                breweriesArray.push(apiData[i]);
              }
            }
          }
          // result = breweriesArray;
          return callback(breweriesArray, false);
=======
      console.log(queryURL);
      request(queryURL, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (
          !error &&
          response.statusCode === 200 &&
          JSON.parse(body).data !== undefined
        ) {
          //empty the Brewery Array
          breweriesArray = [];
          for (var i = 0; i < JSON.parse(body).data.length; i++) {
            breweries[i] = JSON.parse(body).data[i];
            //add brewery object to external array
            if (
              JSON.parse(body).data[i].openToPublic === "Y" &&
              JSON.parse(body).data[i].isClosed === "N"
            ) {
              //validate
              breweriesArray.push(breweries[i]);
            }
          }
          result = breweriesArray;
          return callback(result, false);
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f
        } else {
          return callback(null, true);
        }
      });
    } else {
      return callback(null, true);
    }
  },
  getBreweryGuild: function(id, callback) {
    var guild = "/guilds/?key=";
    var queryURL = queryURLNEW + id + guild + apiKey02;
    console.log(queryURL);
    request(queryURL, function(error, response, body) {
      if (
        !error &&
        response.statusCode === 200 &&
<<<<<<< HEAD
        JSON.parse(body).data != undefined
=======
        JSON.parse(body).data !== undefined
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f
      ) {
        result = JSON.parse(body).data;
        return callback(result, false);
      } else {
        return callback(null, true);
      }
    });
  },
  getBreweryLocation: function(id, callback) {
    var location = "/locations/?key=";
    var queryURL = queryURLNEW + id + location + apiKey02;
    console.log(queryURL);
    request(queryURL, function(error, response, body) {
      if (
        !error &&
        response.statusCode === 200 &&
<<<<<<< HEAD
        JSON.parse(body).data != undefined
=======
        JSON.parse(body).data !== undefined
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f
      ) {
        result = JSON.parse(body).data;
        return callback(result, false);
      } else {
        return callback(null, true);
      }
    });
  }
};
<<<<<<< HEAD
=======

/*
function getOpenBreweries(allBreweries, openBreweries) {
 //empty the openbreweries array
 openBreweries = [];
 //add only the open breweries from "allBreweries" to the "openBreweries" Array
 for (var i = 0, i < allBreweries.length, i++) {
   console.log(i);
 }
} */

/*
function getOpenCraftBreweries(allBreweries, openBreweries) {
 //empty the openbreweries array
 openBreweries = [];
 //add only the open breweries from "allBreweries" to the "openBreweries" Array
 for (i = 0, i < allBreweries.length, i++) {
   if (allBreweries[i].openToPublic = "Y" && ) {
     openBreweries.push(allBreweries[i]);
   }
 }
} */

//getBreweriesZip(testZip, testRadius, breweriesArray);
>>>>>>> 3c9675c50960a349259fcd7e9155d385d9dd460f
