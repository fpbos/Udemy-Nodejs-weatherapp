const request = require('request')



const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/75dc7b693ec4748c31c90f5c58edcf39/'+ lat + ',' + long + '?units=si&lang=nl'
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body
            )
        }
    })
}

module.exports = forecast