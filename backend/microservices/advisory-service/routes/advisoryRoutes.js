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

// GET /api/advisory/generate - Real AI advisory generation using Groq API
router.get('/generate', async (req, res) => {
  try {
    const { city, audience, temp, severity } = req.query;
    
    if (!city || !audience) {
      return res.status(400).json({ error: 'City and audience parameters are required' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    
    let advisoryText = '';

    if (!GROQ_API_KEY) {
      // Fallback if no API key is provided
      advisoryText = `[Simulated Fallback - Please configure GROQ_API_KEY]\n\nHeatwave advisory for ${audience} in ${city} (Temp: ${temp || 'N/A'}, Severity: ${severity || 'Moderate'}). Stay hydrated and avoid direct sunlight.`;
    } else {
      // Call Groq API
      const prompt = `You are a climate crisis expert. Generate a concise, 3-bullet-point heatwave advisory for a ${audience} in ${city}. The current temperature is ${temp || 'N/A'}°C and the severity is ${severity || 'Moderate'}. Do not include pleasantries, just output the actionable advice.`;
      
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.5,
          max_tokens: 250
        })
      });

      if (!groqResponse.ok) {
        throw new Error('Groq API request failed');
      }

      const groqData = await groqResponse.json();
      advisoryText = groqData.choices[0].message.content;
    }

    res.json({
      city: city,
      temp: temp || 'N/A',
      severity: severity || 'Moderate',
      audience: audience,
      text: advisoryText,
      generatedAt: new Date().toISOString(),
      model: 'Groq-Llama-3-8B'
    });
  } catch (err) {
    console.error('Error generating advisory:', err);
    res.status(500).json({ error: 'Failed to generate advisory with AI' });
  }
});

module.exports = router;
