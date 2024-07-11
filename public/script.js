async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (response.status === 200) {
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
        <h2>${data.city}</h2>
        <p>${data.temperature} °C</p>
        <p>${data.description}</p>
        <img src="https://openweathermap.org/img/w/${data.icon}.png" alt="weather icon">
        
        `;
    } else {
        alert(data.error);
    }
}