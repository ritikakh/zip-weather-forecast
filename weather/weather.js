const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/05f87ae49729ee980da10366b765a6d6/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('bad server');
        }
        else if (response.statusCode === 400) {
            callback('Unable to find that address');
        }
        else if (response.statusCode === 200 && !error) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
            // console.log(body.currently.temperature);
        }
    });
};



module.exports.getWeather = getWeather;