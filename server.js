const { port, app, path, express, axios } = require('./external/constants');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'The city is required'});
    }

    try {
        const encodedCity = encodeURIComponent(city);
        const weatherResponse = await axios.get(`https://v2.wttr.in/${encodedCity}?format=j1`);

        const weatherData = weatherResponse.data;
        const weather = {
            city: weatherData.nearest_area[0].areaName[0].value,
            country: weatherData.nearest_area[0].country[0].value,
            region: weatherData.nearest_area[0].region[0].value,
            temperature: weatherData.current_condition[0].temp_C,
            description: weatherData.current_condition[0].weatherDesc[0].value,
            icon: weatherData.current_condition[0].weatherIconUrl[0].value,
            time: weatherData.current_condition[0].localObsDateTime,
            weather: weatherData.weather[0].astronomy[0],
            forecast: weatherData.weather[0]
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