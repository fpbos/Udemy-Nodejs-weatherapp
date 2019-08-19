//core
const path = require('path')
//npm
const express = require('express')
const hbs = require('hbs')
//selfmade
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine en views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setyup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        name: 'Fabian'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address.'
        })
    } else {
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            forecast(longitude, latitude, (error, body) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    providedAddress: req.query.address,
                    foundLocation: location,
                    body: body
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Fabian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Fabian',
        helpText: 'Check your wifi connextion. TEXTTEXTTEXTTEXTT EXTTEXTTEXTTEX TTEXTTEXTTEXTT EXTTEXTTEXTTEXTT EXTTEXTTEXTTEXTTE XTTEXTTEXTTEXTTE XTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        errorMessage: 'Help article not found.',
        name: 'Fabian',

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        errorMessage: 'Page not found.',
        name: 'Fabian',

    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})