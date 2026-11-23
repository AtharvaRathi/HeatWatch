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
    
    let advisoryText = '';
    const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';

    const prompt = `You are "HeatWatch AI", an advanced climate resilience intelligence system. 
Generate a real-time, highly customized heatwave advisory for the '${audience}' sector in '${city}'. 
Current Telemetry: Temperature is ${temp || 'N/A'}°C, Severity Level is ${severity || 'Moderate'}.

Format your response exactly like this:
[HEATWATCH AI REAL-TIME ANALYSIS]
(Provide 1 brief, highly intelligent sentence analyzing the specific danger of ${temp}°C for the geography of ${city}).

[TARGETED ACTION PROTOCOLS]
(Provide 3 highly specific, actionable, and scientific protocols tailored exactly to the ${audience} sector to mitigate ${severity} risk at ${temp}°C).

Always conclude exactly with: "/// Generated in real-time by HeatWatch AI / Model: Qwen-2.5-7B (Offline) ///". Keep the total response under 150 words.`;
      
    try {
      const ollamaResponse = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen2.5:7b',
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.5,
            num_predict: 250
          }
        })
      });

      if (!ollamaResponse.ok) throw new Error('Ollama API request failed');
      const ollamaData = await ollamaResponse.json();
      advisoryText = ollamaData.response;
    } catch (ollamaErr) {
      console.warn("⚠️ Ollama failed, falling back to simulated:", ollamaErr.message);
      advisoryText = `[Simulated Fallback - Is Ollama running on port 11434?]\n\nHeatwave advisory for ${audience} in ${city} (Temp: ${temp || 'N/A'}, Severity: ${severity || 'Moderate'}). Stay hydrated and avoid direct sunlight.`;
    }

    res.json({ city, temp: temp || 'N/A', severity: severity || 'Moderate', audience, text: advisoryText, generatedAt: new Date().toISOString(), model: 'Ollama-Qwen-2.5-7B-Local' });
  } catch (err) { res.status(500).json({ error: 'Failed to generate advisory' }); }
});

module.exports = router;
