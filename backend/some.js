// const express = require('express');
// const cors = require('cors'); 
// const fetch = require('node-fetch');
// const app = express();

// const port = 3001;
// app.use(cors({
//   origin: ['http://localhost:3000','https://weather-pi-rosy.vercel.app' ]
// }));
// app.use(express.json());

// app.get('/api/weatherdaily/:city', async (req, res) => { 
//   try {
//     const city = req.params.city || req.query.city || "varanasi"; 
//     const weatherData = await getWeatherByCity(city);
//     if (!weatherData) {
//       return res.status(404).json({ error: 'Weather data not found' });
//     }
//     res.json(weatherData);
//   } catch (error) {
//     console.error('Error fetching weather:', error);
//     res.status(500).json({ error: 'Failed to fetch weather data' });
//   }
// });


// async function getWeather(latitude, longitude) {
//   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  
//   try {
//     const response = await fetch(url);
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching weather:", error);
//     return null;
//   }
// }

// async function getWeatherByCity(city) {
//   const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`;
  
//   try {
//     const geoResponse = await fetch(geocodeUrl);
//     const geoData = await geoResponse.json();
    
//     if (geoData.length === 0) {
//       throw new Error("City not found");
//     }

//     const { lat, lon } = geoData[0];
//     return await getWeather(lat, lon);
//   } catch (error) {
//     console.error("Error getting city coordinates:", error);
//     return null;
//   }
// }

// app.listen(port, () => {
//   console.log(`Backend running at http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Added this

const app = express();
const port = process.env.PORT || 3001; // Better for deployment

app.use(cors({
  origin: ['http://localhost:3000', 'https://weather-pi-rosy.vercel.app']
}));
app.use(express.json());

// Flexible endpoint (works with /api/weather?city=London or /api/weather)
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || "varanasi";
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
    if (geoData.length === 0) throw new Error("City not found");
    const { lat, lon } = geoData[0];
    return await getWeather(lat, lon);
  } catch (error) {
    console.error("Error getting city coordinates:", error);
    return null;
  }
}

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});