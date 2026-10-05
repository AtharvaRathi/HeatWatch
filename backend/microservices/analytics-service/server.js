const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/heatwave_analytics';

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/analytics', analyticsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Analytics & Reports Service',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /api/analytics/health',
      'GET /api/analytics/dashboard',
      'GET /api/analytics/trends',
      'GET /api/analytics/reports',
      'GET /api/analytics/hotspots',
      'GET /api/analytics/map-data'
    ]
  });
});

// MongoDB Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Analytics Service connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`📊 Analytics Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
