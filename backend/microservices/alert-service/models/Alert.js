const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertId: { type: String, required: true, unique: true },
  level: { type: String, required: true },
  code: { type: String, enum: ['red', 'orange', 'yellow', 'green'], required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  temp: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  recommendedAction: { type: String, required: true },
  timestamp: { type: String, required: true }
}, { timestamps: true });

const Alert = mongoose.model('Alert', alertSchema);

module.exports = { Alert };
