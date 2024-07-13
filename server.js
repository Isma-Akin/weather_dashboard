const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'The city is required'});
    }

    try {
        const encodedCity = encodeURIComponent(city);
        const weatherResponse = await axios.get(`https://wttr.in/${encodedCity}?format=j1`);

        const weatherData = weatherResponse.data;
        const weather = {
            city: weatherData.nearest_area[0].areaName[0].value,
            temperature: weatherData.current_condition[0].temp_C,
            description: weatherData.current_condition[0].weatherDesc[0].value,
            icon: weatherData.current_condition[0].weatherIconUrl[0].value
        };
        res.json(weather);
    } catch (error) {
        if (error.response) {
           console.error('Error response data:', error.response.data);
           console.error('Error response status:', error.response.status);
           console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
           console.error('Error request:', error.request);
        } else {
           console.error('Error:', error.message);
        }
        res.status(500).json({ error: 'Error fetching weather data'});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})