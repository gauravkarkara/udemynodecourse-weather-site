const request = require('postman-request');

const geocode = (placeName, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(placeName) +'.json?access_token=pk.eyJ1IjoiZ2F1cmF2a3RpZXQiLCJhIjoiY2tuenhtdHhnMDV4czJ3bndrM2IybWRrNCJ9.uXn5WYihE1jJgZCG4j4dGw&limit=1';

    request({ url, json:true }, (error, {body} = {}, responseBody) => {
        if(error){
            callback('Unable to connect to location provider', undefined);
        } else if (body.features.length === 0){
            callback('Provided location doesnt exist for mapbox', undefined);
        } else {
            const data = {
                Longitude: body.features[0].center[0],
                Latitude: body.features[0].center[1],
                Location: body.features[0].place_name
            };
            callback(undefined, data);
        }

    })


};

module.exports = { getGeocode: geocode};