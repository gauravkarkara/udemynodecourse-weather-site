const request = require('postman-request');

const forecast = (longitude,latitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a6f72f91bec59d00d2ca4a7f9ea0e098&query=' + longitude +','+ latitude +'&units=m';

    request({ url, json: true}, (error, { body } = {},responseBody) => {
        if(error){
            callback('Unable to connect to Network',undefined);
        } else if(body.error){
            callback('Unable to get location for these values', undefined);
        } else {
            callback(undefined,{
                currentWeather: body.current.weather_descriptions[0],
                currentTemp: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }

    })
};

module.exports = {
    forecast: forecast
}