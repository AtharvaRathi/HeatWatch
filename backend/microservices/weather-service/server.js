const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/heatwave_weather';

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/weather', weatherRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Weather Telemetry Service',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /api/weather/health',
      'GET /api/weather/cities',
      'GET /api/weather/cities/:id',
      'GET /api/weather/forecast'
    ]
  });
});

// MongoDB Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Weather Service connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`🌤️  Weather Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
