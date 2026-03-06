// The keys are now directly in this file
const WEATHER_API_KEY = "8a1cd88d884289cecc1b7261b4320330"; 
const UNSPLASH_ACCESS_KEY = "OGVjKxzwSHwZQzVVVEdScV2teSCZZumB2MLcBVBEDAE";

// Your fetch calls should now use these variables directly
  async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  try {
    const wResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.WEATHER_API_KEY}`,
    );
    const wData = await wResponse.json();

    if (wData.cod !== 200) {
      alert("City not found!");
      return;
    }

    const uResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${city} landscape&client_id=${config.UNSPLASH_ACCESS_KEY}`,
    );
    const uData = await uResponse.json();

    if (uData.results && uData.results.length > 0) {
      const imageUrl = uData.results[0].urls.regular;
      document.body.style.backgroundImage = `url('${imageUrl}')`;
    }

    updateWeatherUI(wData);
  } catch (err) {
    console.error("Error:", err);
  }
}

function updateWeatherUI(data) {
  const resultDiv = document.getElementById("weatherResult");
  const icon = data.weather[0].icon;

  resultDiv.innerHTML = `
        <h2 class="city-name">${data.name}</h2>
        <div class="main-temp">${Math.round(data.main.temp)}°C</div>
        <img src="https://openweathermap.org/img/wn/${icon}@4x.png" class="weather-icon" alt="Weather Icon">
        <div class="info-grid">
            <div class="info-item">
                <i class="fa-solid fa-droplet"></i>
                <span>${data.main.humidity}%</span>
                <small>Humidity</small>
            </div>
            <div class="info-item">
                <i class="fa-solid fa-wind"></i>
                <span>${data.wind.speed} m/s</span>
                <small>Wind</small>
            </div>
        </div>
    `;
}

document.getElementById("cityInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});
