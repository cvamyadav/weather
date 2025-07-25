const express = require('express');
const cors = require('cors'); // Make sure to install: npm install cors
const app = express();

const port = 3001;
app.use(cors({
  origin: ['http://localhost:3000','https://weather-pi-rosy.vercel.app' ]// Allow your Next.js frontend
}));
app.use(express.json());

// Add this endpoint (fixing the city parameter access)
app.get('/api/weatherdaily/:city', async (req, res) => { // Added ? for optional param
  try {
    const city = req.params.city || req.query.city || "varanasi"; // Check both params and query
    const weatherData = await getWeatherByCity(city);
    if (!weatherData) {
      return res.status(404).json({ error: 'Weather data not found' });
    }
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Move getWeather function outside of getWeatherByCity
async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

async function getWeatherByCity(city) {
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`;
  
  try {
    const geoResponse = await fetch(geocodeUrl);
    const geoData = await geoResponse.json();
    
    if (geoData.length === 0) {
      throw new Error("City not found");
    }

    const { lat, lon } = geoData[0];
    return await getWeather(lat, lon);
  } catch (error) {
    console.error("Error getting city coordinates:", error);
    return null;
  }
}

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});