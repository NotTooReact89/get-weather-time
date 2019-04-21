var async = require("async");
const readline = require("readline");
const request = require("request");

const baseUrl = "http://open.mapquestapi.com/geocoding/v1/address";
const key = "n71CKGruKLq6MKcZ5MOSiXuouMwFNjpH";
const baseTimeUrl = "http://vip.timezonedb.com/v2.1/get-time-zone";
const timeApiKey = "3QDHUOVAKQ19";
const baseweatherurl = "http://api.openweathermap.org/data/2.5/weather";
const weatherApiKey = "eb9ac32155d8fcbaf134c1c46ad9582c";

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

mainFunctionality = (location, callBack) => {};

readLineInterface.question(
  "Input: An array of location name and  postal code\nFormat: New York, 10005, Tokyo, São Paulo, Pluto\n ",
  answer => {
    answer = answer.split(",");
    async.eachSeries(answer, mainFunctionality, function(err) {});
    readLineInterface.close();
  }
);
