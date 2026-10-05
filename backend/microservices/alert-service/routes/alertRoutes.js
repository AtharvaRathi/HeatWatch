const express = require('express');
const router = express.Router();
const { Alert } = require('../models/Alert');

// GET /api/alerts/health - Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'alert-service', timestamp: new Date().toISOString() });
});

// GET /api/alerts - Get all alerts (with optional severity filter)
router.get('/', async (req, res) => {
  try {
    const { severity, search } = req.query;
    let filter = {};
    
    if (severity && severity !== 'all') {
      filter.code = severity;
    }
    
    if (search) {
      filter.$or = [
        { city: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } }
      ];
    }

    const alerts = await Alert.find(filter).lean();
    const formatted = alerts.map(a => ({
      id: a.alertId,
      level: a.level,
      code: a.code,
      city: a.city,
      state: a.state,
      temp: a.temp,
      title: a.title,
      description: a.description,
      recommendedAction: a.recommendedAction,
      timestamp: a.timestamp
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching alerts:', err);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// GET /api/alerts/:id - Get single alert
router.get('/:id', async (req, res) => {
  try {
    const alert = await Alert.findOne({ alertId: req.params.id }).lean();
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json({
      id: alert.alertId,
      level: alert.level,
      code: alert.code,
      city: alert.city,
      state: alert.state,
      temp: alert.temp,
      title: alert.title,
      description: alert.description,
      recommendedAction: alert.recommendedAction,
      timestamp: alert.timestamp
    });
  } catch (err) {
    console.error('Error fetching alert:', err);
    res.status(500).json({ error: 'Failed to fetch alert' });
  }
});

// GET /api/alerts/severity/:level - Get alerts by severity level
router.get('/severity/:level', async (req, res) => {
  try {
    const alerts = await Alert.find({ code: req.params.level }).lean();
    const formatted = alerts.map(a => ({
      id: a.alertId,
      level: a.level,
      code: a.code,
      city: a.city,
      state: a.state,
      temp: a.temp,
      title: a.title,
      description: a.description,
      recommendedAction: a.recommendedAction,
      timestamp: a.timestamp
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching alerts by severity:', err);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

module.exports = router;
