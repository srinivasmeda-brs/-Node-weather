const request = require('postman-request');

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=801b68c762f55da134353876a5a0f436&query=' + address + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather API service due to the network', undefined);
        } else if (body.error) {
            callback('Unable to find the location', undefined);
        } else {
            const location = `${body.location.name}, ${body.location.region}, ${body.location.country}`;
            const forecastText = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out there. The humidity is ${body.current.humidity}%.`;
            callback(undefined, location, forecastText);
        }
    });
};

module.exports = forecast;