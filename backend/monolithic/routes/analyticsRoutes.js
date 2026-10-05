const express = require('express');
const router = express.Router();
const { DashboardStats, AnalyticsData, Report, MapData } = require('../models');

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'analytics-module (monolithic)', timestamp: new Date().toISOString() });
});

router.get('/dashboard', async (req, res) => {
  try {
    const stats = await DashboardStats.findOne({}).lean();
    if (!stats) return res.status(404).json({ error: 'Dashboard stats not found' });
    res.json({ currentAvgTemp: stats.currentAvgTemp, avgTempTrend: stats.avgTempTrend, activeAlertsCount: stats.activeAlertsCount, alertsBreakdown: stats.alertsBreakdown, affectedRegionsCount: stats.affectedRegionsCount, affectedRegionsDetail: stats.affectedRegionsDetail, highestRecordedTemp: stats.highestRecordedTemp, highestLocation: stats.highestLocation, predictionAccuracy: stats.predictionAccuracy, accuracyDetail: stats.accuracyDetail });
  } catch (err) { res.status(500).json({ error: 'Failed to fetch dashboard stats' }); }
});

router.get('/trends', async (req, res) => {
  try {
    const data = await AnalyticsData.findOne({}).lean();
    if (!data) return res.status(404).json({ error: 'Analytics data not found' });
    res.json({ tempTrend7Days: data.tempTrend7Days, regionComparison: data.regionComparison, monthlyHeatwaveCounts: data.monthlyHeatwaveCounts, severityDistribution: data.severityDistribution, predictionAccuracyHistory: data.predictionAccuracyHistory, forecastConfidenceByRegion: data.forecastConfidenceByRegion });
  } catch (err) { res.status(500).json({ error: 'Failed to fetch analytics data' }); }
});

router.get('/reports', async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};
    if (type) filter.type = type;
    const reports = await Report.find(filter).lean();
    res.json(reports.map(r => ({ id: r.reportId, title: r.title, date: r.date, period: r.period, type: r.type, size: r.size, status: r.status, author: r.author })));
  } catch (err) { res.status(500).json({ error: 'Failed to fetch reports' }); }
});

router.get('/hotspots', async (req, res) => {
  try {
    res.json({ message: 'Hotspot data available via /api/weather/cities sorted by riskScore' });
  } catch (err) { res.status(500).json({ error: 'Failed to fetch hotspot data' }); }
});

router.get('/map-data', async (req, res) => {
  try {
    const mapData = await MapData.find({}).lean();
    res.json(mapData.map(m => ({ id: m.stateId, name: m.name, severity: m.severity, code: m.code, temp: m.temp, forecastTomorrow: m.forecastTomorrow, heatwaveProb: m.heatwaveProb, topCities: m.topCities, summary: m.summary })));
  } catch (err) { res.status(500).json({ error: 'Failed to fetch map data' }); }
});

module.exports = router;
