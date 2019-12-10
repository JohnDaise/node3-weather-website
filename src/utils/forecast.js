const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d2148ab275c6a8b54dec17d97824397d/' + latitude + ',' + longitude;
    request({ url, json: true }, (error, { body }) => {
       if (error) {
            callback('Unable to connect to weather service', undefined);
       } else if (body.error) {
            callback('Unable to find location', undefined);
       } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. High: ' + body.daily.data[0].temperatureHigh + '° Low: ' + body.daily.data[0].temperatureLow + '°');
        }
     });


}





module.exports = forecast;