const weatherIconMapGif = {
    'clear': 'day',
    'sunny': 'day',
    'few clouds': 'cloudy-day-1',
    'cloudy': 'cloudy-day-2',
    'partly cloudy': 'cloudy-day-2',
    'rain': 'rainy-7',
    'shower rain': 'rainy-6',
    'shower in vicinity, rain shower': 'rainy-6',
    'rain shower': 'rainy-6',
    'moderate rain': 'rainy-5',
    'light rain': 'rainy-4',
    'light rain shower': 'rainy-4',
    'light rain shower, light rain with thunderstorm': 'rainy-4',
    'patchy rain nearby': 'rainy-4',
    'light drizzle': 'rainy-2',
    'drizzle': 'rainy-3',
    'thunderstorm': 'thunder',
    'mist': 'cloudy',
    'fog': 'cloudy',
    'overcast': 'cloudy',
    'light snow': 'snow-4',
    'snow': 'snowy-5',
    'heavy snow': 'snow-6',
    'blizzard': 'snow-6',
};

const rainGif = "https://www.icegif.com/wp-content/uploads/2021/10/icegif-453.gif";
const cloudGif = "https://www.icegif.com/wp-content/uploads/2023/08/icegif-886.gif";
const sunGif = "https://www.icegif.com/wp-content/uploads/2023/07/icegif-767.gif";
const mistGif = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHdvZndyMTQycHMxeWQxNnhvenRyYzlvdm5yeDBiZGt2bGprZTdzdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZWRCWdUymIGNW/giphy.gif";
const overcastGif = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG1zdHJhOXpsd3BqZmNncmh5YzFzYzFtaHZ5c2pnNTFjN21ibG11ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GFXNdR1tuMopi/giphy.gif";

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('hidden');
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
}

//Typing the city
async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name. \nE.g: London, New York');
        return;
    }

    showLoader();
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        const weatherDiv = document.getElementById('weather');
        const dayTwoDiv = document.getElementById('daytwo');
        const dayThreeDiv = document.getElementById('daythree');
        const dayFourDiv = document.getElementById('dayfour');
        const weatherClass = document.getElementById('weatherClass');

        if (response.status === 200) {
            if (weatherClass) weatherClass.style.visibility = "visible";

            //Weather description for the current day; trims any blank spaces from the description
            const currentDayDescription = (data.description || '').trim();
            //Method to make the weather description into lower case
            const currentDayDescriptionLower = currentDayDescription.toLowerCase();

            //Weather description for the next day
            const nextDayDescription = (data.forecast && data.forecast[0] && data.forecast[0].hourly && data.forecast[0].hourly[0].weatherDesc[0].value || '').trim();
            //Method to make the next day weather description into lower case; trims any blank spaces from the description
            const nextDayDescriptionLower = nextDayDescription.toLowerCase();

            const orderedDate = (data.time || '').trim().split(/\s+/).reverse().join(" ");
            const region = data.region;
            //The average temperature for the current/next day
            const tempC = data.forecast && data.forecast[0] ? data.forecast[0].avgtempC : null;

            const forecastArray = data.forecast || [];

            function getUpcomingAvgTemps(forecastArray) {
                const upcomingTemps = [];

                for (let i = 0; i < 3; i++) {
                    if (forecastArray[i]) {
                        upcomingTemps.push({
                            dayOffset: i,
                            date: forecastArray[i].date,
                            avgtempC: forecastArray[i].avgtempC
                        });
                    }
                }

                return upcomingTemps;
            }

            const temperatureForecast = getUpcomingAvgTemps(forecastArray);

            const iconCode = weatherIconMapGif[currentDayDescriptionLower] || 'day';
            const iconUrl = `https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/${iconCode}.svg`;

            const iconCode2 = weatherIconMapGif[nextDayDescriptionLower] || 'day';
            const iconUrl2 = `https://amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/${iconCode2}.svg`;

            if (weatherDiv) {
                if (data.temperature >= 30) weatherDiv.style.backgroundColor = '#cb7043';
                else if (data.temperature >= 20) weatherDiv.style.backgroundColor = '#e7d0aa';
                else if (data.temperature >= 10) weatherDiv.style.backgroundColor = '#a9b6b4';
                else if (data.temperature >= 0) weatherDiv.style.backgroundColor = '#6b7a8f';
                else weatherDiv.style.backgroundColor = '#d3dad9ff';
            }
        
            if (weatherDiv) {
                weatherDiv.innerHTML = `
                <h2>${data.city}, ${data.country}</h2>
                <p>${region}</p>
                <p>${data.temperature}°C</p>
                <p>${currentDayDescriptionLower}</p>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>${orderedDate}</p>
                <p>Sunrise</p>
                <p>${data.weather.sunrise}</p>
                <p>Sunset</p>
                <p>${data.weather.sunset}</p>
                `;
            }
            
            const dayDivs = [dayTwoDiv, dayThreeDiv, dayFourDiv];

            temperatureForecast.forEach(day => {
                const el = dayDivs[day.dayOffset];
                if (el) {
                    el.innerHTML = `
                        <h4>Date: ${day.date}</h4>
                        <p>Average Temperature: ${day.avgtempC}°C</p>
                        <img src="${iconUrl2}" alt="Weather Icon2">
                    `;
                }
            });
        } else if (response.status === 404) {
            if (weatherClass) weatherClass.style.visibility = "hidden";
        } else {
            alert(data.error);
        }
    } catch (err) {
        alert('Error fetching weather: ' + (err.message || err));
    } finally {
        hideLoader();
    }
}

//Clicking pre-determined cities
async function getWeatherClick(city) {
    if (!city) {
        alert('Please enter a city name. \nE.g: London, New York');
        return;
    }

    showLoader();
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        const weatherDiv = document.getElementById('weather');
        const mondayDiv = document.getElementById('monday');
        const weatherClass = document.getElementById('weatherClass');

        if (response.status === 200) {
            if (weatherClass) weatherClass.style.visibility = "visible";

            const description = data.description.trim();
            const descriptionLower = description.toLowerCase();

            const region = data.region;
            const tempC = data.forecast && data.forecast[0] ? data.forecast[0].avgtempC : null;   

            const orderedDate = data.time.trim().split("/\s+/").reverse().join(" ");
            
            const iconCode = weatherIconMapGif[descriptionLower] || 'day';
            const iconUrl = `https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/${iconCode}.svg`;

            if (weatherDiv) {
                if (data.temperature >= 30) weatherDiv.style.backgroundColor = '#cb7043';
                else if (data.temperature >= 20) weatherDiv.style.backgroundColor = '#e7d0aa';
                else if (data.temperature >= 10) weatherDiv.style.backgroundColor = '#a9b6b4';
                else if (data.temperature >= 0) weatherDiv.style.backgroundColor = '#6b7a8f';
                else weatherDiv.style.backgroundColor = '#d3dad9ff';
            }

            if (weatherDiv) {
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
            }

            if (mondayDiv) {
                mondayDiv.innerHTML = `
                <p>${tempC}</p>
                `;
            }
        } else if (response.status === 404) {
            if (weatherClass) weatherClass.style.visibility = "hidden";
        } else {
            alert(data.error);
            //Add alert for when the server doesnt get the city so it doesnt display the weather div
        }
    } catch (err) {
        alert('Error fetching weather: ' + (err.message || err));
    } finally {
        hideLoader();
    }
}