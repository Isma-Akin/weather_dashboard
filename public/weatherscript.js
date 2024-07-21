const weatherIconMap = {
    'clear sky': '01d',
    'few clouds': '02d',
    'scattered clouds': '03d',
    'broken clouds': '04d',
    'shower rain': '09d',
    'rain': '10d',
    'thunderstorm': '11d',
    'snow': '13d',
    'mist': '50d',
    'light rain shower': '09d',
    'cloudy': '02d',
    'patchy rain nearby': '09d',
    'partly cloudy': '02d',
    'clear': '01d'
};

async function getWeather() {
       const city = document.getElementById('city').value;
        if (!city) {
        alert('Please enter a city name. \nE.g: London, New York');
        return;
    }

    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (response.status === 200) {
        const weatherDiv = document.getElementById('weather');

        const description = data.description.trim().toLowerCase();

        const iconCode = weatherIconMap[description] || '01d';

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherDiv.innerHTML = `
        <h2>${data.city}</h2>
        <p>${data.temperature} °C</p>
        <p>${description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        `;
    } else {
        alert(data.error);
    }
}

async function getWeatherClick(city) {
        if (!city) {
        alert('Please enter a city name. \nE.g: London, New York');
        return;
    }

    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (response.status === 200) {
        const weatherDiv = document.getElementById('weather');

        const description = data.description.trim().toLowerCase();

        const iconCode = weatherIconMap[description] || '01d';

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherDiv.innerHTML = `
        <h2>${data.city}</h2>
        <p>${data.temperature} °C</p>
        <p>${description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        `;
    } else {
        alert(data.error);
    }
}