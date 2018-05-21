const request = require('request');

var geocodeAddress = (address, callback) => {
    var URLaddress = encodeURIComponent(address);
    //console.log(URLaddress);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDKhxnK2873wXJyvAoM49k8F5hNz2NHUZ8&address=${URLaddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('bad server')
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        }
        else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            //console.log(JSON.stringify(body, undefined, 2));
            // console.log(`Address: ${body.results[0].formatted_address}`);
            // console.log(`Latitude ${body.results[0].geometry.location.lat} `);
            // console.log(`Longitude ${body.results[0].geometry.location.lng} `);
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;