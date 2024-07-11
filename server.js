const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

const API_KEY = 'openweathermap_api_key';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'The city is required'});
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        }
        });
        const data = response.data;
        const weather = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        };
        res.json(weather);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data'});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})