const express = require('express');
const path = require('path');
const forecast = require('./src/forecast');

const app = express();
const port = process.env.PORT || 4000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Serve static files (CSS, logo, etc.)
app.use(express.static(path.join(__dirname, '/public')));

// Home Route
app.get('/', (req, res) => {
    res.render('index', { location: null, forecast: null, error: null });
});

// Weather Search Route
app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.render('index', { location: null, forecast: null, error: 'Please provide a location' });
    }

    forecast(address, (error, location, forecastData) => {
        if (error) {
            return res.render('index', { location: null, forecast: null, error });
        }

        res.render('index', { location, forecast: forecastData, error: null });
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});