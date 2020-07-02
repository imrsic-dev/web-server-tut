const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current' +
        '?access_key=562a6147f25e359eed8805f6c5cac50a' +
        '&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.location.name + ' It is currently ' +
                body.current.temperature +
                ' degress out. There is a ' +
                body.current.humidity + '% chance of rain.')
        }
    })
}

module.exports = forecast;