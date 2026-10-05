const mongoose = require('mongoose');
require('dotenv').config();
const { CityWeather, WeeklyForecast } = require('./models/Weather');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heatwave_weather';

const citiesData = [
  { cityId: "c1", city: "Nagpur", state: "Maharashtra", region: "Central India", temp: 45.2, humidity: 24, windSpeed: 18, status: "Severe", statusColor: "red", lastUpdated: "5 mins ago", riskScore: 96, confidence: 98 },
  { cityId: "c2", city: "Phalodi", state: "Rajasthan", region: "North West", temp: 46.2, humidity: 19, windSpeed: 22, status: "Severe", statusColor: "red", lastUpdated: "2 mins ago", riskScore: 99, confidence: 97 },
  { cityId: "c3", city: "Wardha", state: "Maharashtra", region: "Central India", temp: 44.8, humidity: 26, windSpeed: 15, status: "Severe", statusColor: "red", lastUpdated: "12 mins ago", riskScore: 92, confidence: 95 },
  { cityId: "c4", city: "Chandrapur", state: "Maharashtra", region: "Central India", temp: 44.1, humidity: 28, windSpeed: 16, status: "Heatwave", statusColor: "orange", lastUpdated: "8 mins ago", riskScore: 88, confidence: 94 },
  { cityId: "c5", city: "Jaipur", state: "Rajasthan", region: "North West", temp: 43.5, humidity: 22, windSpeed: 20, status: "Heatwave", statusColor: "orange", lastUpdated: "15 mins ago", riskScore: 84, confidence: 93 },
  { cityId: "c6", city: "Ahmedabad", state: "Gujarat", region: "West India", temp: 43.0, humidity: 35, windSpeed: 14, status: "Heatwave", statusColor: "orange", lastUpdated: "10 mins ago", riskScore: 81, confidence: 92 },
  { cityId: "c7", city: "New Delhi", state: "Delhi", region: "North India", temp: 42.4, humidity: 38, windSpeed: 19, status: "Warning", statusColor: "yellow", lastUpdated: "4 mins ago", riskScore: 74, confidence: 96 },
  { cityId: "c8", city: "Hyderabad", state: "Telangana", region: "South Central", temp: 41.8, humidity: 42, windSpeed: 12, status: "Warning", statusColor: "yellow", lastUpdated: "18 mins ago", riskScore: 68, confidence: 91 },
  { cityId: "c9", city: "Vijayawada", state: "Andhra Pradesh", region: "South East", temp: 42.1, humidity: 55, windSpeed: 11, status: "Warning", statusColor: "yellow", lastUpdated: "20 mins ago", riskScore: 71, confidence: 90 },
  { cityId: "c10", city: "Bhopal", state: "Madhya Pradesh", region: "Central India", temp: 41.5, humidity: 30, windSpeed: 13, status: "Warning", statusColor: "yellow", lastUpdated: "25 mins ago", riskScore: 65, confidence: 92 },
  { cityId: "c11", city: "Jhansi", state: "Uttar Pradesh", region: "North Central", temp: 43.8, humidity: 25, windSpeed: 17, status: "Severe", statusColor: "red", lastUpdated: "30 mins ago", riskScore: 90, confidence: 94 },
  { cityId: "c12", city: "Bhubaneswar", state: "Odisha", region: "East Coast", temp: 40.2, humidity: 62, windSpeed: 10, status: "Normal", statusColor: "green", lastUpdated: "14 mins ago", riskScore: 48, confidence: 89 },
  { cityId: "c13", city: "Pune", state: "Maharashtra", region: "West India", temp: 37.5, humidity: 48, windSpeed: 14, status: "Normal", statusColor: "green", lastUpdated: "6 mins ago", riskScore: 35, confidence: 95 },
  { cityId: "c14", city: "Bengaluru", state: "Karnataka", region: "South India", temp: 33.2, humidity: 60, windSpeed: 15, status: "Normal", statusColor: "green", lastUpdated: "1 minute ago", riskScore: 20, confidence: 98 },
  { cityId: "c15", city: "Patna", state: "Bihar", region: "East India", temp: 42.8, humidity: 36, windSpeed: 13, status: "Heatwave", statusColor: "orange", lastUpdated: "16 mins ago", riskScore: 79, confidence: 91 }
];

const forecastData = [
  { day: "Mon", date: "Jul 27", maxTemp: 41, minTemp: 29, risk: "Moderate", status: "Warning", code: "yellow" },
  { day: "Tue", date: "Jul 28", maxTemp: 43, minTemp: 30, risk: "High", status: "Heatwave", code: "orange" },
  { day: "Wed", date: "Jul 29", maxTemp: 45, minTemp: 32, risk: "Extreme", status: "Severe", code: "red" },
  { day: "Thu", date: "Jul 30", maxTemp: 44, minTemp: 31, risk: "Extreme", status: "Severe", code: "red" },
  { day: "Fri", date: "Jul 31", maxTemp: 42, minTemp: 30, risk: "High", status: "Heatwave", code: "orange" },
  { day: "Sat", date: "Aug 01", maxTemp: 39, minTemp: 28, risk: "Moderate", status: "Warning", code: "yellow" },
  { day: "Sun", date: "Aug 02", maxTemp: 37, minTemp: 27, risk: "Low", status: "Normal", code: "green" }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await CityWeather.deleteMany({});
    await WeeklyForecast.deleteMany({});

    await CityWeather.insertMany(citiesData);
    console.log(`✅ Seeded ${citiesData.length} city weather records`);

    await WeeklyForecast.insertMany(forecastData);
    console.log(`✅ Seeded ${forecastData.length} forecast records`);

    await mongoose.disconnect();
    console.log('Done! Disconnected from MongoDB');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
