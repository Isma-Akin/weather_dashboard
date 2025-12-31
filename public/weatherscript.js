const weatherIconMap = {
    'clear sky': '01d',
    'sunny': '01d',
    'clear': '01d',
    'few clouds': '02d',
    'cloudy': '02d',
    'partly cloudy': '02d',
    'scattered clouds': '03d',
    'overcast': '03d',
    'broken clouds': '04d',
    'shower rain': '09d',
    'light rain': '09d',
    'patchy light rain': '09d',
    'moderate rain': '09d',
    'heavy rain': '09d',
    'light freezing rain': '09d',
    'moderate or heavy freezing rain': '09d',
    'moderate or heavy rain in area with thunder': '09d',
    'light rain shower': '09d',
    'patchy rain nearby': '09d',
    'patchy light drizzle': '09d',
    'light drizzle': '09d',
    'patchy freezing drizzle nearby': '09d',
    'freezing drizzle': '09d',
    'heavy freezing drizzle': '09d',
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
    'light sleet showers': '09d',
    'moderate or heavy sleet showers': '09d',
    'patchy sleet nearby': '09d',
    'light sleet': '09d',
    'moderate snow': '13d',
    'heavy snow': '13d',
    'blowing snow': '13d',
    'blizzard': '13d',
    'ice pellets': '13d',
    'moderate or heavy showers of ice pellets': '13d',
    'light showers of ice pellets': '13d',
    'patchy light snow in area with thunder': '13d',
    'moderate or heavy snow showers': '13d',
    'moderate or heavy snow in area with thunder': '13d',
    'freezing fog': '13d',
    'mist': '50d',
    'fog': '50d',
};
const rainGif = "https://www.icegif.com/wp-content/uploads/2021/10/icegif-453.gif";
const cloudGif = "https://www.icegif.com/wp-content/uploads/2023/08/icegif-886.gif";
const sunGif = "https://www.icegif.com/wp-content/uploads/2023/07/icegif-767.gif";
const mistGif = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHdvZndyMTQycHMxeWQxNnhvenRyYzlvdm5yeDBiZGt2bGprZTdzdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZWRCWdUymIGNW/giphy.gif";

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
        const weatherImageDiv = document.getElementById('weatherimage');

        // Trims the description to remove leading/trailing whitespace
        const description = data.description.trim();
        const region = data.region;

        const iconCode = weatherIconMap[description] || '01d';

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


        if (data.temperature >= 30) {
            weatherDiv.style.backgroundColor = "#cb7043";
        } else if (data.temperature >= 20) {
            weatherDiv.style.backgroundColor = "#e7d0aa";
        } else if (data.temperature >= 10) {
            weatherDiv.style.backgroundColor = "#a9b6b4";
        } else if (data.temperature >= 0) {
            weatherDiv.style.backgroundColor = '#6b7a8f';
        } else {
            weatherDiv.style.backgroundColor = '#d3dad9ff';
        }

        if (description.includes('rain')) {
            weatherImageDiv.innerHTML = `
            <img src="${rainGif}" alt="Weather image">
            `
        } else if (description.includes('cloud')) {
            weatherImageDiv.innerHTML = `
            <img src="${cloudGif}" alt="Weather image">
            `
        } else if (description.includes('sun')) {
            weatherImageDiv.innerHTML = `
            <img src="${sunGif}" alt="Weather image">
            `
        } else if (description.includes('mist')) {
            weatherImageDiv.innerHTML = `
            <img src="${mistGif}" alt="Weather image">
            `
        }
          else {
            weatherImageDiv.innerHTML = "";
        }

        weatherDiv.innerHTML = `
        <h2>${data.city}, ${data.country}</h2>
        <p>${region}</p>
        <p>${data.temperature}°C</p>
        <p>${description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>${data.time}</p>
        <p>Sunrise</p>
        <p>${data.weather.sunrise}</p>
        <p>Sunset</p>
        <p>${data.weather.sunset}</p>
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
        const weatherImageDiv = document.getElementById('weatherimage');

        // Trims the description to remove leading/trailing whitespace
        const description = data.description.trim();
        const region = data.region;

        const iconCode = weatherIconMap[description] || '01d';

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        if (data.temperature >= 30) {
            weatherDiv.style.backgroundColor = "#cb7043";
        } else if (data.temperature >= 20) {
            weatherDiv.style.backgroundColor = "#e7d0aa";
        } else if (data.temperature >= 10) {
            weatherDiv.style.backgroundColor = "#a9b6b4";
        } else if (data.temperature >= 0) {
            weatherDiv.style.backgroundColor = '#6b7a8f';
        } else {
            weatherDiv.style.backgroundColor = 'green';
        }

        if (description.includes('Rain') || description.includes('Drizzle') || description.includes('rain')) {
            weatherImageDiv.innerHTML = `
            <img src="${rainGif}" alt="Weather image">
            `
        } else if (description.includes('cloud') || description.includes('Cloud')) {
            weatherImageDiv.innerHTML = `
            <img src="${cloudGif}" alt="Weather image">
            `
        } else if (description.includes('Sun') || description.includes('sun')) {
            weatherImageDiv.innerHTML = `
            <img src="${sunGif}" alt="Weather image">
            `
        } else if (description.includes('mist') || description.includes('Mist')) {
            weatherImageDiv.innerHTML = `
            <img src="${mistGif}" alt="Weather image">
            `
        } else {
            weatherImageDiv.innerHTML = "";
        }

        weatherDiv.innerHTML = `
        <h2>${data.city}, ${data.country}</h2>
        <p>${region}</p>
        <p>${data.temperature}°C</p>
        <p>${description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>${data.time}</p>
        <p>Sunrise</p>
        <p>${data.weather.sunrise}</p>
        <p>Sunset</p>
        <p>${data.weather.sunset}</p>
    `} else {
        alert(data.error);
    }
}