const express = require('express');
const router = express.Router();
const { Advisory } = require('../models/Advisory');

// GET /api/advisory/health - Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'advisory-service', timestamp: new Date().toISOString() });
});

// GET /api/advisory/presets - Get all advisory presets
router.get('/presets', async (req, res) => {
  try {
    const { audience, city } = req.query;
    let filter = {};
    
    if (audience) filter.audience = audience;
    if (city) filter.city = { $regex: city, $options: 'i' };

    const advisories = await Advisory.find(filter).lean();
    const formatted = advisories.map(a => ({
      city: a.city,
      temp: a.temp,
      severity: a.severity,
      audience: a.audience,
      text: a.text
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching advisories:', err);
    res.status(500).json({ error: 'Failed to fetch advisory presets' });
  }
});

// GET /api/advisory/generate - Simulated AI advisory generation
router.get('/generate', async (req, res) => {
  try {
    const { city, audience, temp, severity } = req.query;
    
    if (!city || !audience) {
      return res.status(400).json({ error: 'City and audience parameters are required' });
    }

    // Simulate AI generation with template-based response
    const templates = {
      Citizen: `🔥 CRITICAL CITIZEN ADVISORY - ${(city || '').toUpperCase()} REGION\n\n• Exposure Hazard: Avoid non-essential outdoor movements between 11:30 AM and 4:30 PM.\n• Hydration Strategy: Drink minimum 3.5 - 4 Liters of water daily, supplemented with ORS or natural lemon juice.\n• First Aid Notice: If experiencing dizziness, rapid pulse, or lack of sweating, seek immediate shade and call emergency medical support at 108.\n• Home Cooling: Keep window blinds drawn during peak sun hours; use damp curtains to cool interior airflow.`,
      Farmer: `🌾 AGRICULTURAL HEAT ADVISORY - ${(city || '').toUpperCase()}\n\n• Crop Protection: Conduct light micro-irrigation only during early morning (5 AM - 7 AM) or late evening.\n• Livestock Care: Ensure cattle sheds are covered with thatch or wet gunny bags. Provide continuous access to shade.\n• Field Work Timings: Shift all manual harvesting and field labor strictly to early morning hours before 10:30 AM.`,
      Hospital: `🏥 HEALTHCARE SYSTEM EMERGENCY PREPAREDNESS ADVISORY\n\n• Ward Readiness: Reserve at least 15% dedicated bed capacity for Heat Stroke & Heat Exhaustion cases.\n• Resource Supply: Ensure 100% stock availability of IV normal saline fluids, ORS packs, cooling blankets, and ice packs.\n• Triage Protocol: Fast-track patients with body temperature > 103°F directly to cold immersion/cooling units.`,
      Municipality: `🏙️ MUNICIPAL ADMINISTRATION ACTION PLAN - ${(city || '').toUpperCase()}\n\n• Public Infrastructure: Activate public misting stations at major bus stands and railway hubs.\n• Water Supply: Ensure uninterrupted water pipeline pressure and deploy mobile water tankers.\n• Labor Safety: Enforce mandatory 2-hour rest periods for road construction workers between 1 PM and 3 PM.`
    };

    const advisoryText = templates[audience] || templates['Citizen'];

    res.json({
      city: city,
      temp: temp || 'N/A',
      severity: severity || 'Moderate',
      audience: audience,
      text: advisoryText,
      generatedAt: new Date().toISOString(),
      model: 'HeatwaveAdvisory-LSTM-v3.4'
    });
  } catch (err) {
    console.error('Error generating advisory:', err);
    res.status(500).json({ error: 'Failed to generate advisory' });
  }
});

module.exports = router;
