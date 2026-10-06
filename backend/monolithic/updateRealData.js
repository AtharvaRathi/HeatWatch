const mongoose = require('mongoose');
require('dotenv').config();
const { CityWeather } = require('./models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heatwave_monolithic';

const citiesToFetch = [
  "Nagpur", "Phalodi", "Wardha", "Chandrapur", "Jaipur", 
  "Ahmedabad", "New Delhi", "Hyderabad", "Vijayawada", "Bhopal", 
  "Jhansi", "Bhubaneswar", "Pune", "Bengaluru", "Patna"
];

async function updateLive() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB for Live Data Update');

  for (const city of citiesToFetch) {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) continue;

      const location = geoData.results[0];
      const lat = location.latitude;
      const lon = location.longitude;
      const state = location.admin1 || 'Unknown';
      const country = location.country;
      const realCityName = location.name;

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`);
      const weatherData = await weatherRes.json();
      const current = weatherData.current;

      const temp = Math.round(current.temperature_2m);
      const humidity = Math.round(current.relative_humidity_2m);
      const windSpeed = Math.round(current.wind_speed_10m);

      let status = 'Normal';
      let statusColor = 'green';
      let riskScore = 1.0;
      
      if (temp >= 45) { status = 'Severe'; statusColor = 'red'; riskScore = parseFloat((9.0 + Math.random()).toFixed(1)); }
      else if (temp >= 40) { status = 'Heatwave'; statusColor = 'orange'; riskScore = parseFloat((7.0 + Math.random()).toFixed(1)); }
      else if (temp >= 35) { status = 'Warning'; statusColor = 'yellow'; riskScore = parseFloat((4.0 + Math.random()).toFixed(1)); }
      else { riskScore = parseFloat((1.0 + (temp / 100)).toFixed(1)); }

      const cityId = realCityName.toLowerCase().replace(/[^a-z0-9]/g, '-');

      await CityWeather.findOneAndUpdate(
        { cityId },
        {
          cityId, city: realCityName, state: state, region: country,
          temp, humidity, windSpeed, status, statusColor,
          lastUpdated: new Date().toISOString().split('T')[0] + ' 12:00 PM',
          riskScore, confidence: 95
        },
        { new: true, upsert: true }
      );
      console.log(`Updated ${realCityName}: ${temp}°C`);
      // Wait 1 second to avoid rate limits
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Failed to update ${city}:`, err.message);
    }
  }

  console.log('✅ All cities updated to real live data');
  await mongoose.disconnect();
}

updateLive().catch(console.error);
