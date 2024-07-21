const weatherIconMap = {
    'clear sky': '01d',
    'clear': '01d',
    'few clouds': '02d',
    'cloudy': '02d',
    'partly cloudy': '02d',
    'scattered clouds': '03d',
    'overcast': '03d',
    'broken clouds': '04d',
    'shower rain': '09d',
    'light rain shower': '09d',
    'patchy rain nearby': '09d',
    'patchy light drizzle': '09d',
    'patchy light rain in area with thunder': '09d',
    'moderate rain at times': '09d',
    'heavy rain at times': '09d',
    'moderate or heavy rain shower': '09d',
    'rain': '10d',
    'torrential rain shower': '10d',
    'thunderstorm': '11d',
    'thundery outbreaks in nearby': '11d',
    'snow': '13d',
    'patchy light snow': '13d',
    'light snow': '13d',
    'light snow showers': '13d',
    'patchy heavy snow': '13d',
    'patchy snow nearby': '13d',
    'patchy moderate snow': '13d',
    'moderate or heavy sleet': '13d',
    'moderate snow': '13d',
    'heavy snow': '13d',
    'blowing snow': '13d',
    'blizzard': '13d',
    'patchy light snow in area with thunder': '13d',
    'moderate or heavy snow showers': '13d',
    'moderate or heavy snow in area with thunder': '13d',
    'freezing fog': '13d',
    'mist': '50d',
    'fog': '50d',
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