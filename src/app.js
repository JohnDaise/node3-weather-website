const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


// Paths for Express config
const pubDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Daise'
    })
})

// app.get('', (req, res) => { 
//     res.send('<h1>Weather</h1>');
// }) // can send back html

// app.get('/help', (req, res) => { 
//     res.send({
//         name: 'John',
//         age: 32
//     });  
// }) // can send back JSON data as a single object or array of objects

// app.get('/about', (req, res) => { 
//     res.send('<h1>About Page</h1>');
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'John Daise'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'John Daise',
        helpText: 'This will be helpful'
    })

})

app.get('/weather', (req, res) => { 
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
    
            // console.log(location);
            // console.log(forecastData)
          })
    });


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Daise',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Daise',
        errorMessage: 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



