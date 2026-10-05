const express = require('express');
const router = express.Router();
const { DashboardStats, AnalyticsData, Report, MapData } = require('../models/Analytics');

// GET /api/analytics/health - Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'analytics-service', timestamp: new Date().toISOString() });
});

// GET /api/analytics/dashboard - Get dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await DashboardStats.findOne({}).lean();
    if (!stats) return res.status(404).json({ error: 'Dashboard stats not found' });
    res.json({
      currentAvgTemp: stats.currentAvgTemp,
      avgTempTrend: stats.avgTempTrend,
      activeAlertsCount: stats.activeAlertsCount,
      alertsBreakdown: stats.alertsBreakdown,
      affectedRegionsCount: stats.affectedRegionsCount,
      affectedRegionsDetail: stats.affectedRegionsDetail,
      highestRecordedTemp: stats.highestRecordedTemp,
      highestLocation: stats.highestLocation,
      predictionAccuracy: stats.predictionAccuracy,
      accuracyDetail: stats.accuracyDetail
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// GET /api/analytics/trends - Get analytics trend data
router.get('/trends', async (req, res) => {
  try {
    const data = await AnalyticsData.findOne({}).lean();
    if (!data) return res.status(404).json({ error: 'Analytics data not found' });
    res.json({
      tempTrend7Days: data.tempTrend7Days,
      regionComparison: data.regionComparison,
      monthlyHeatwaveCounts: data.monthlyHeatwaveCounts,
      severityDistribution: data.severityDistribution,
      predictionAccuracyHistory: data.predictionAccuracyHistory,
      forecastConfidenceByRegion: data.forecastConfidenceByRegion
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// GET /api/analytics/reports - Get all reports
router.get('/reports', async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};
    if (type) filter.type = type;

    const reports = await Report.find(filter).lean();
    const formatted = reports.map(r => ({
      id: r.reportId,
      title: r.title,
      date: r.date,
      period: r.period,
      type: r.type,
      size: r.size,
      status: r.status,
      author: r.author
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// GET /api/analytics/hotspots - Get hotspot data (sorted by risk score)
router.get('/hotspots', async (req, res) => {
  try {
    const cities = await require('mongoose').connection.db
      ? null : null;
    
    // Hotspots are derived from weather data, so we make an internal call concept
    // For simplicity, we store hotspot-ready data derived from the same collection
    // In microservices, this would ideally call the weather-service, but for demo
    // purposes, we maintain a denormalized copy
    const { DashboardStats } = require('../models/Analytics');
    
    // Return from a dedicated hotspot fetch via the analytics DB
    // We'll seed this data in the analytics DB too
    res.json({ message: 'Hotspot data available via /api/weather/cities endpoint sorted by riskScore' });
  } catch (err) {
    console.error('Error fetching hotspots:', err);
    res.status(500).json({ error: 'Failed to fetch hotspot data' });
  }
});

// GET /api/analytics/map-data - Get India states map data
router.get('/map-data', async (req, res) => {
  try {
    const mapData = await MapData.find({}).lean();
    const formatted = mapData.map(m => ({
      id: m.stateId,
      name: m.name,
      severity: m.severity,
      code: m.code,
      temp: m.temp,
      forecastTomorrow: m.forecastTomorrow,
      heatwaveProb: m.heatwaveProb,
      topCities: m.topCities,
      summary: m.summary
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching map data:', err);
    res.status(500).json({ error: 'Failed to fetch map data' });
  }
});

module.exports = router;
