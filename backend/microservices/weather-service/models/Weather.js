const mongoose = require('mongoose');

const cityWeatherSchema = new mongoose.Schema({
  cityId: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  region: { type: String, required: true },
  temp: { type: Number, required: true },
  humidity: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
  status: { type: String, enum: ['Severe', 'Heatwave', 'Warning', 'Normal'], required: true },
  statusColor: { type: String, enum: ['red', 'orange', 'yellow', 'green'], required: true },
  lastUpdated: { type: String, default: '5 mins ago' },
  riskScore: { type: Number, required: true },
  confidence: { type: Number, required: true }
}, { timestamps: true });

const weeklyForecastSchema = new mongoose.Schema({
  day: { type: String, required: true },
  date: { type: String, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  risk: { type: String, required: true },
  status: { type: String, required: true },
  code: { type: String, enum: ['red', 'orange', 'yellow', 'green'], required: true }
}, { timestamps: true });

const CityWeather = mongoose.model('CityWeather', cityWeatherSchema);
const WeeklyForecast = mongoose.model('WeeklyForecast', weeklyForecastSchema);

module.exports = { CityWeather, WeeklyForecast };
