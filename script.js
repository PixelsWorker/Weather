const apiKey = 'c59060b71c46247fb9d9d54a6227091e';  // Your WeatherStack API key
const weatherInfo = document.getElementById('weather-info');

function getWeather() {
  const locationInput = document.getElementById('location').value.trim();
  
  if (locationInput === '') {
    weatherInfo.innerHTML = '<p>Please enter a city name!</p>';
    return;
  }

  // Construct the URL to call the WeatherStack API (using HTTPS)
  const apiUrl = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${locationInput}`;

  // Show loading message
  weatherInfo.innerHTML = '<p>Loading weather data...</p>';

  // Fetch weather data from the WeatherStack API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Check if the response is valid and contains weather data
      if (data.error) {
        weatherInfo.innerHTML = `<p>${data.error.info}</p>`;
        return;
      }

      // Extract relevant weather details from the API response
      const cityName = data.location.name;
      const temperature = data.current.temperature;
      const weatherDescription = data.current.weather_descriptions[0];
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_speed;

      // Create HTML output for displaying weather details
      const weatherOutput = `
        <h3>Weather for ${cityName}</h3>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Description:</strong> ${weatherDescription}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
      `;

      // Display the weather data in the weather-info div
      weatherInfo.innerHTML = weatherOutput;
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
      weatherInfo.innerHTML = '<p>Unable to fetch weather data. Please try again.</p>';
    });
}
