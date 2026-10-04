const API_KEY = '9e41125464004579ab3125826260310'; 
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const weatherInfo = document.querySelector('#weather-info');
const errorBox = document.querySelector('#error');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    
    if (city === '') {
        showError('Enter your city.');
    } else {
        getWeather(city);
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

function render(data) {
    const {location, current} = data;

    weatherInfo.innerHTML =
    `
    <h2>${location.name}, ${location.country}</h2>
    <div class="main"> 
    <img src="https:${current.condition.icon}" alt="Weather icon">
    <p>${current.temp_c}°C</p>
    <p>${current.condition.text}</p>
    </div>
    <div class="card">
    <p>Feels like: ${current.feelslike_c}°C</p>
    <p>Humidity: ${current.humidity}%</p>
    <p>Wind: ${current.wind_kph} km/h</p>
    <p>Precip: ${current.precip_mm} mm</p>
    </div>
    <div class="note">
    <small>Last update: ${current.last_updated}<br></small>
    <small>Weather data by <a href="https://www.weatherapi.com/">WeatherAPI.com</a></small>
    </div>
    `
}

function showLoading() {
    clearAll();
    weatherInfo.textContent = 'Loading...';
}

function showError(mes) {
    clearAll();
    errorBox.textContent = mes;
}

function clearAll() {
    weatherInfo.textContent = '';
    errorBox.textContent = '';
}

async function getWeather(city) {
    showLoading();
    const link = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&lang=en`;
    try {
        const response = await fetch(link);
        const data = await response.json();

        if ('error' in data) {
            showError(data.error.message);
        } else {
            render(data);
        }

    } catch {
        showError('Failed to retrieve data');
    }
}

