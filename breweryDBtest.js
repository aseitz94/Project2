//node packages
var zipcodes = require('zipcodes');
var request = require('request');


var queryURL1 = 'https://api.brewerydb.com/v2/search/geo/point?key=';
var apiKey = '7666aff49d47c147ba22244312acf587';
var queryURL2 = '&lat=';
var testLatitude = '35.4303824';
var queryURL3 = '&lng=';
var testLongitude = '-82.5489214';
var queryURL4 = '&radius=';
var testZip = 90210;
var testRadius = 20;

//FUNCTION TO TEXT API PULL FROM BreweryDB using zip code and radius
function getBreweriesZip(zipCode, radius) {
    var zipObject = zipcodes.lookup(zipCode);
    var latitude = zipObject.latitude;
    var longitude = zipObject.longitude;
    var queryURL = queryURL1 + apiKey + queryURL2 + latitude + queryURL3 + longitude + queryURL4 + radius;
    console.log('queryURL: ' + queryURL);

    request(queryURL, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("Status Result of BreweryDB API call: " + JSON.parse(body).status);
        }
    });

}

getBreweriesZip(testZip, testRadius);