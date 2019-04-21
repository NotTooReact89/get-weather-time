var async = require("async");
const readline = require("readline");
const request = require("request");

const mapsBaseUrl = "http://open.mapquestapi.com/geocoding/v1/address";
const mapsApiKey = "n71CKGruKLq6MKcZ5MOSiXuouMwFNjpH";
const timeBaseUrl = "http://vip.timezonedb.com/v2.1/get-time-zone";
const timeApiKey = "3QDHUOVAKQ19";
const weatherBaseurl = "http://api.openweathermap.org/data/2.5/weather";
const weatherApiKey = "eb9ac32155d8fcbaf134c1c46ad9582c";

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

mainFunctionality = (locationArrayItem, callBack) => {
  const locationItem = locationArrayItem.trim();
  let mapsApiUrl =
    mapsBaseUrl + "?key=" + mapsApiKey + "&location=" + locationItem;

  request.get(mapsApiUrl, function(error, response, body) {
    const json = body && JSON.parse(body);
    let latitude = json.results[0].locations[0].latLng.lat;
    let longitutde = json.results[0].locations[0].latLng.lng;

    let timeApiUrl =
      timeBaseUrl +
      "?key=" +
      timeApiKey +
      "&by=position" +
      "&lat=" +
      latitude +
      "&lng=" +
      longitutde +
      "&format=json";
    getLocationCurrentTime = callBack => {
      request
        .get(timeApiUrl, function(error, response, body) {
          let timeResponse = body && JSON.parse(body);
          let currentTime = timeResponse && timeResponse.formatted;
          console.log(`"${locationItem}" => ` + currentTime);
        })
        .on("error", function(err) {
          console.error(err);
        });
      callBack();
    };

    let weatherApiUrl =
      weatherBaseurl +
      "?APPID=" +
      weatherApiKey +
      "&lat=" +
      latitude +
      "&lon=" +
      longitutde;
    getLocationCurrentWeather = () => {
      request.get(weatherApiUrl, function(error, response, body) {
        console.log(`"${locationItem}" => ` + body);
      });
    };

    async.waterfall([getLocationCurrentTime], function(err, result) {
      getLocationCurrentWeather();
    });
    callBack();
  });
};

readLineInterface.question(
  "Enter an array of location name and  postal code\nFormat: New York, 10005, Tokyo, São Paulo, Pluto\n ",
  answer => {
    answer = answer.split(",");
    async.eachSeries(answer, mainFunctionality, function(err) {});
    readLineInterface.close();
  }
);
