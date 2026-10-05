const mongoose = require('mongoose');

const dashboardStatsSchema = new mongoose.Schema({
  currentAvgTemp: String,
  avgTempTrend: String,
  activeAlertsCount: Number,
  alertsBreakdown: String,
  affectedRegionsCount: Number,
  affectedRegionsDetail: String,
  highestRecordedTemp: String,
  highestLocation: String,
  predictionAccuracy: String,
  accuracyDetail: String
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
  title: String,
  date: String,
  period: String,
  type: String,
  size: String,
  status: String,
  author: String
}, { timestamps: true });

const mapDataSchema = new mongoose.Schema({
  stateId: { type: String, required: true, unique: true },
  name: String,
  severity: String,
  code: String,
  temp: String,
  forecastTomorrow: String,
  heatwaveProb: Number,
  topCities: [String],
  summary: String
}, { timestamps: true });

const DashboardStats = mongoose.model('DashboardStats', dashboardStatsSchema);
const AnalyticsData = mongoose.model('AnalyticsData', analyticsDataSchema);
const Report = mongoose.model('Report', reportSchema);
const MapData = mongoose.model('MapData', mapDataSchema);

module.exports = { DashboardStats, AnalyticsData, Report, MapData };
