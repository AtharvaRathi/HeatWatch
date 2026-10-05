const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const advisoryRoutes = require('./routes/advisoryRoutes');

const app = express();
const PORT = process.env.PORT || 5003;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/heatwave_advisory';

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/advisory', advisoryRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'AI Advisory Generator Service',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /api/advisory/health',
      'GET /api/advisory/presets',
      'GET /api/advisory/generate'
    ]
  });
});

// MongoDB Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Advisory Service connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`🤖 Advisory Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
