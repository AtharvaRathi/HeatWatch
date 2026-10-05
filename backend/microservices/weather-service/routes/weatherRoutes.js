const express = require('express');
const router = express.Router();
const { CityWeather, WeeklyForecast } = require('../models/Weather');

// GET /api/weather/health - Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'weather-service', timestamp: new Date().toISOString() });
});

// GET /api/weather/cities - Get all city weather data
router.get('/cities', async (req, res) => {
  try {
    const cities = await CityWeather.find({}).lean();
    // Map _id-based docs back to frontend-expected format
    const formatted = cities.map(c => ({
      id: c.cityId,
      city: c.city,
      state: c.state,
      region: c.region,
      temp: c.temp,
      humidity: c.humidity,
      windSpeed: c.windSpeed,
      status: c.status,
      statusColor: c.statusColor,
      lastUpdated: c.lastUpdated,
      riskScore: c.riskScore,
      confidence: c.confidence
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET /api/weather/cities/:id - Get a single city
router.get('/cities/:id', async (req, res) => {
  try {
    const city = await CityWeather.findOne({ cityId: req.params.id }).lean();
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json({
      id: city.cityId,
      city: city.city,
      state: city.state,
      region: city.region,
      temp: city.temp,
      humidity: city.humidity,
      windSpeed: city.windSpeed,
      status: city.status,
      statusColor: city.statusColor,
      lastUpdated: city.lastUpdated,
      riskScore: city.riskScore,
      confidence: city.confidence
    });
  } catch (err) {
    console.error('Error fetching city:', err);
    res.status(500).json({ error: 'Failed to fetch city data' });
  }
});

// GET /api/weather/forecast - Get weekly forecast
router.get('/forecast', async (req, res) => {
  try {
    const forecast = await WeeklyForecast.find({}).lean();
    const formatted = forecast.map(f => ({
      day: f.day,
      date: f.date,
      maxTemp: f.maxTemp,
      minTemp: f.minTemp,
      risk: f.risk,
      status: f.status,
      code: f.code
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching forecast:', err);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

module.exports = router;
