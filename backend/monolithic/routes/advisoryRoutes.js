const express = require('express');
const router = express.Router();
const { Advisory } = require('../models');

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'advisory-module (monolithic)', timestamp: new Date().toISOString() });
});

router.get('/presets', async (req, res) => {
  try {
    const { audience, city } = req.query;
    let filter = {};
    if (audience) filter.audience = audience;
    if (city) filter.city = { $regex: city, $options: 'i' };
    const advisories = await Advisory.find(filter).lean();
    res.json(advisories.map(a => ({ city: a.city, temp: a.temp, severity: a.severity, audience: a.audience, text: a.text })));
  } catch (err) { res.status(500).json({ error: 'Failed to fetch advisory presets' }); }
});

router.get('/generate', async (req, res) => {
  try {
    const { city, audience, temp, severity } = req.query;
    if (!city || !audience) return res.status(400).json({ error: 'City and audience parameters are required' });
    const templates = {
      Citizen: `🔥 CRITICAL CITIZEN ADVISORY - ${(city || '').toUpperCase()} REGION\n\n• Exposure Hazard: Avoid non-essential outdoor movements between 11:30 AM and 4:30 PM.\n• Hydration Strategy: Drink minimum 3.5 - 4 Liters of water daily.\n• First Aid Notice: If experiencing dizziness, seek immediate shade and call 108.`,
      Farmer: `🌾 AGRICULTURAL HEAT ADVISORY - ${(city || '').toUpperCase()}\n\n• Crop Protection: Conduct light micro-irrigation only during early morning (5 AM - 7 AM).\n• Livestock Care: Ensure cattle sheds are covered with thatch or wet gunny bags.\n• Field Work Timings: Shift all manual labor to before 10:30 AM.`,
      Hospital: `🏥 HEALTHCARE EMERGENCY PREPAREDNESS ADVISORY\n\n• Ward Readiness: Reserve 15% bed capacity for Heat Stroke cases.\n• Resource Supply: Ensure 100% stock of IV saline fluids, ORS packs, cooling blankets.\n• Triage Protocol: Fast-track patients with body temp > 103°F.`,
      Municipality: `🏙️ MUNICIPAL ACTION PLAN - ${(city || '').toUpperCase()}\n\n• Activate public misting stations at bus stands and railway hubs.\n• Deploy mobile water tankers to vulnerable colonies.\n• Enforce mandatory 2-hour rest for construction workers 1-3 PM.`
    };
    res.json({ city, temp: temp || 'N/A', severity: severity || 'Moderate', audience, text: templates[audience] || templates['Citizen'], generatedAt: new Date().toISOString(), model: 'HeatwaveAdvisory-LSTM-v3.4' });
  } catch (err) { res.status(500).json({ error: 'Failed to generate advisory' }); }
});

module.exports = router;
