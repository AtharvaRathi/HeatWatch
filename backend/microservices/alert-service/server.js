const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const alertRoutes = require('./routes/alertRoutes');

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/heatwave_alerts';

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/alerts', alertRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Alert & Early Warning Service',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /api/alerts/health',
      'GET /api/alerts',
      'GET /api/alerts/:id',
      'GET /api/alerts/severity/:level'
    ]
  });
});

// MongoDB Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Alert Service connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`🚨 Alert Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
