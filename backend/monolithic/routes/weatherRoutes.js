const express = require('express');
const router = express.Router();
const { CityWeather, WeeklyForecast } = require('../models');

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'weather-module (monolithic)', timestamp: new Date().toISOString() });
});

router.post('/search', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) return res.status(400).json({ error: 'City is required' });

    // 1. Geocoding
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }
    const location = geoData.results[0];
    const lat = location.latitude;
    const lon = location.longitude;
    const state = location.admin1 || 'Unknown';
    const country = location.country;
    const realCityName = location.name;

    // 2. Weather Data
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`);
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    const temp = Math.round(current.temperature_2m);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);

    // 3. Compute Risk
    let status = 'Normal';
    let statusColor = 'green';
    let riskScore = 1.0;
    
    if (temp >= 45) { status = 'Severe'; statusColor = 'red'; riskScore = parseFloat((9.0 + Math.random()).toFixed(1)); }
    else if (temp >= 40) { status = 'Heatwave'; statusColor = 'orange'; riskScore = parseFloat((7.0 + Math.random()).toFixed(1)); }
    else if (temp >= 35) { status = 'Warning'; statusColor = 'yellow'; riskScore = parseFloat((4.0 + Math.random()).toFixed(1)); }
    else { riskScore = parseFloat((1.0 + (temp / 100)).toFixed(1)); }

    const cityId = realCityName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    // 4. Update Database
    const newCity = await CityWeather.findOneAndUpdate(
      { cityId },
      {
        cityId,
        city: realCityName,
        state: state,
        region: country,
        temp,
        humidity,
        windSpeed,
        status,
        statusColor,
        lastUpdated: new Date().toISOString().split('T')[0] + ' 12:00 PM', // Match existing UI format
        riskScore,
        confidence: 95
      },
      { new: true, upsert: true }
    ).lean();

    res.json({ id: newCity.cityId, ...newCity });
  } catch (err) {
    console.error('Weather search error:', err);
    res.status(500).json({ error: 'Failed to fetch live weather data' });
  }
});

router.get('/cities', async (req, res) => {
  try {
    const cities = await CityWeather.find({}).lean();
    res.json(cities.map(c => ({ id: c.cityId, city: c.city, state: c.state, region: c.region, temp: c.temp, humidity: c.humidity, windSpeed: c.windSpeed, status: c.status, statusColor: c.statusColor, lastUpdated: c.lastUpdated, riskScore: c.riskScore, confidence: c.confidence })));
  } catch (err) { res.status(500).json({ error: 'Failed to fetch weather data' }); }
});

router.get('/cities/:id', async (req, res) => {
  try {
    const city = await CityWeather.findOne({ cityId: req.params.id }).lean();
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json({ id: city.cityId, city: city.city, state: city.state, region: city.region, temp: city.temp, humidity: city.humidity, windSpeed: city.windSpeed, status: city.status, statusColor: city.statusColor, lastUpdated: city.lastUpdated, riskScore: city.riskScore, confidence: city.confidence });
  } catch (err) { res.status(500).json({ error: 'Failed to fetch city data' }); }
});

router.get('/forecast', async (req, res) => {
  try {
    const forecast = await WeeklyForecast.find({}).lean();
    res.json(forecast.map(f => ({ day: f.day, date: f.date, maxTemp: f.maxTemp, minTemp: f.minTemp, risk: f.risk, status: f.status, code: f.code })));
  } catch (err) { res.status(500).json({ error: 'Failed to fetch forecast data' }); }
});

module.exports = router;
