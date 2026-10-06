const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const weatherRoutes = require('./routes/weatherRoutes');
const alertRoutes = require('./routes/alertRoutes');
const advisoryRoutes = require('./routes/advisoryRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MONOLITHIC ARCHITECTURE
// All services run in a single Express server
// This demonstrates the monolithic approach
// vs the microservices architecture
// ============================================

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount ALL routes on a single server
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root endpoint - Service Discovery
app.get('/', (req, res) => {
  res.json({
    service: 'Heatwave Prediction - Monolithic Server',
    architecture: 'MONOLITHIC',
    version: '1.0.0',
    status: 'running',
    description: 'All services bundled into a single server process',
    endpoints: {
      weather: [
        'GET /api/weather/health',
        'GET /api/weather/cities',
        'GET /api/weather/cities/:id',
        'GET /api/weather/forecast'
      ],
      alerts: [
        'GET /api/alerts/health',
        'GET /api/alerts',
        'GET /api/alerts/:id',
        'GET /api/alerts/severity/:level'
      ],
      advisory: [
        'GET /api/advisory/health',
        'GET /api/advisory/presets',
        'GET /api/advisory/generate'
      ],
      analytics: [
        'GET /api/analytics/health',
        'GET /api/analytics/dashboard',
        'GET /api/analytics/trends',
        'GET /api/analytics/reports',
        'GET /api/analytics/hotspots',
        'GET /api/analytics/map-data'
      ]
    }
  });
});

// Health check for the entire monolith
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'monolithic-server',
    architecture: 'MONOLITHIC',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start Server (In-Memory Data Mode)
app.listen(PORT, () => {
  console.log(`✅ Monolithic Server running on port ${PORT} (In-Memory Mode)`);
  console.log(`📋 Architecture: MONOLITHIC (all services in one process)`);
  console.log(`🔗 All endpoints available at http://localhost:${PORT}`);
});

module.exports = app;
