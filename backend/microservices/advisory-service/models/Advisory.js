const mongoose = require('mongoose');

const advisorySchema = new mongoose.Schema({
  city: { type: String, required: true },
  temp: { type: String, required: true },
  severity: { type: String, required: true },
  audience: { type: String, required: true },
  text: { type: String, required: true }
}, { timestamps: true });

const Advisory = mongoose.model('Advisory', advisorySchema);

module.exports = { Advisory };
