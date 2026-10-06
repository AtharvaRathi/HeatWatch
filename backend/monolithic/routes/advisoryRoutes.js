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
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    
    let advisoryText = '';

    if (!GROQ_API_KEY) {
      advisoryText = `[Simulated Fallback - Please configure GROQ_API_KEY in Render]\n\nHeatwave advisory for ${audience} in ${city} (Temp: ${temp || 'N/A'}, Severity: ${severity || 'Moderate'}). Stay hydrated and avoid direct sunlight.`;
    } else {
      const prompt = `You are "HeatWatch AI", an advanced climate resilience intelligence system. 
Generate a real-time, highly customized heatwave advisory for the '${audience}' sector in '${city}'. 
Current Telemetry: Temperature is ${temp || 'N/A'}°C, Severity Level is ${severity || 'Moderate'}.

Format your response exactly like this:
[HEATWATCH AI REAL-TIME ANALYSIS]
(Provide 1 brief, highly intelligent sentence analyzing the specific danger of ${temp}°C for the geography of ${city}).

[TARGETED ACTION PROTOCOLS]
(Provide 3 highly specific, actionable, and scientific protocols tailored exactly to the ${audience} sector to mitigate ${severity} risk at ${temp}°C).

Always conclude exactly with: "/// Generated in real-time by HeatWatch AI / Model: Llama-3 ///". Keep the total response under 150 words.`;
      
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

      if (!groqResponse.ok) throw new Error('Groq API request failed');
      const groqData = await groqResponse.json();
      advisoryText = groqData.choices[0].message.content;
    }
    res.json({ city, temp: temp || 'N/A', severity: severity || 'Moderate', audience, text: advisoryText, generatedAt: new Date().toISOString(), model: 'Groq-Llama-3-8B' });
  } catch (err) { res.status(500).json({ error: 'Failed to generate advisory' }); }
});

module.exports = router;
