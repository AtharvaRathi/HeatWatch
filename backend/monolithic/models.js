const mongoose = require('mongoose');

// ---- Weather Models ----
const cityWeatherSchema = new mongoose.Schema({
  cityId: { type: String, required: true, unique: true },
  city: String, state: String, region: String,
  temp: Number, humidity: Number, windSpeed: Number,
  status: String, statusColor: String, lastUpdated: String,
  riskScore: Number, confidence: Number
}, { timestamps: true });

const weeklyForecastSchema = new mongoose.Schema({
  day: String, date: String, maxTemp: Number, minTemp: Number,
  risk: String, status: String, code: String
}, { timestamps: true });

// ---- Alert Model ----
const alertSchema = new mongoose.Schema({
  alertId: { type: String, required: true, unique: true },
  level: String, code: String, city: String, state: String,
  temp: String, title: String, description: String,
  recommendedAction: String, timestamp: String
}, { timestamps: true });

// ---- Advisory Model ----
const advisorySchema = new mongoose.Schema({
  city: String, temp: String, severity: String,
  audience: String, text: String
}, { timestamps: true });

// ---- Analytics Models ----
const dashboardStatsSchema = new mongoose.Schema({
  currentAvgTemp: String, avgTempTrend: String,
  activeAlertsCount: Number, alertsBreakdown: String,
  affectedRegionsCount: Number, affectedRegionsDetail: String,
  highestRecordedTemp: String, highestLocation: String,
  predictionAccuracy: String, accuracyDetail: String
}, { timestamps: true });

const analyticsDataSchema = new mongoose.Schema({
  tempTrend7Days: [mongoose.Schema.Types.Mixed],
  regionComparison: [mongoose.Schema.Types.Mixed],
  monthlyHeatwaveCounts: [mongoose.Schema.Types.Mixed],
  severityDistribution: [mongoose.Schema.Types.Mixed],
  predictionAccuracyHistory: [mongoose.Schema.Types.Mixed],
  forecastConfidenceByRegion: [mongoose.Schema.Types.Mixed]
}, { timestamps: true });

const reportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  title: String, date: String, period: String, type: String,
  size: String, status: String, author: String
}, { timestamps: true });

const mapDataSchema = new mongoose.Schema({
  stateId: { type: String, required: true, unique: true },
  name: String, severity: String, code: String, temp: String,
  forecastTomorrow: String, heatwaveProb: Number,
  topCities: [String], summary: String
}, { timestamps: true });

const CityWeather = mongoose.model('CityWeather', cityWeatherSchema);
const WeeklyForecast = mongoose.model('WeeklyForecast', weeklyForecastSchema);
const Alert = mongoose.model('Alert', alertSchema);
const Advisory = mongoose.model('Advisory', advisorySchema);
const DashboardStats = mongoose.model('DashboardStats', dashboardStatsSchema);
const AnalyticsData = mongoose.model('AnalyticsData', analyticsDataSchema);
const Report = mongoose.model('Report', reportSchema);
const MapData = mongoose.model('MapData', mapDataSchema);

module.exports = {
  CityWeather, WeeklyForecast, Alert, Advisory,
  DashboardStats, AnalyticsData, Report, MapData
};
