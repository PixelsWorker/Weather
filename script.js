const apiKey = 'c59060b71c46247fb9d9d54a6227091e';
const weatherInfo = document.getElementById('weather-info');

function getWeather() {
  const locationInput = document.getElementById('location').value;
  const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${locationInput}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const cityName = data.location.name;
      const temperature = data.current.temperature;
      const weatherDescription = data.current.weather_descriptions[0];

      const weatherOutput = `<p>City: ${cityName}</p>
                             <p>Temperature: ${temperature}°C</p>
                             <p>Description: ${weatherDescription}</p>`;

      weatherInfo.innerHTML = weatherOutput;
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
      weatherInfo.innerHTML = '<p>Unable to fetch weather data. Please try again.</p>';
    });

    console.log(apiUrl); 
}

