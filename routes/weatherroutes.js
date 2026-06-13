const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:city', async (req, res) => {
    try {
        const city = req.params.city;

        // Step 1: Get coordinates from Open-Meteo Geocoding API
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
        const geoResponse = await axios.get(geoUrl);

        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
            return res.status(404).json({ error: 'City not found' });
        }

        const location = geoResponse.data.results[0];
        
        // Step 2: Get weather using coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
        const weatherResponse = await axios.get(weatherUrl);
        const current = weatherResponse.data.current;

        // Step 3: Return formatted weather data
        res.json({
            city: location.name,
            country: location.country || 'Unknown',
            temperature: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            weatherCode: current.weather_code,
            lastUpdated: new Date().toISOString()
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch weather' });
    }
});

module.exports = router;