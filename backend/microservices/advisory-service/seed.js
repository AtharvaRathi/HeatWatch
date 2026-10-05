const mongoose = require('mongoose');
require('dotenv').config();
const { Advisory } = require('./models/Advisory');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heatwave_advisory';

const advisoryData = [
  {
    city: "Nagpur", temp: "45.2°C", severity: "Severe (Red)", audience: "Citizen",
    text: "🔥 CRITICAL CITIZEN ADVISORY - NAGPUR REGION\n\n• Exposure Hazard: Avoid non-essential outdoor movements between 11:30 AM and 4:30 PM.\n• Hydration Strategy: Drink minimum 3.5 - 4 Liters of water daily, supplemented with ORS or natural lemon juice.\n• First Aid Notice: If experiencing dizziness, rapid pulse, or lack of sweating, seek immediate shade and call emergency medical support at 108.\n• Home Cooling: Keep window blinds drawn during peak sun hours; use damp curtains to cool interior airflow."
  },
  {
    city: "Phalodi", temp: "46.2°C", severity: "Severe (Red)", audience: "Farmer",
    text: "🌾 AGRICULTURAL HEAT ADVISORY - PHALODI & WEST RAJASTHAN\n\n• Crop Protection: Conduct light micro-irrigation only during early morning (5 AM - 7 AM) or late evening to reduce evaporative water loss.\n• Livestock Care: Ensure cattle sheds are covered with thatch or wet gunny bags. Provide continuous access to shade and cool drinking water mixed with mineral salts.\n• Field Work Timings: Shift all manual harvesting and field labor strictly to early morning hours before 10:30 AM."
  },
  {
    city: "Chandrapur", temp: "44.1°C", severity: "Heatwave (Orange)", audience: "Hospital",
    text: "🏥 HEALTHCARE SYSTEM EMERGENCY PREPAREDNESS ADVISORY\n\n• Ward Readiness: Reserve at least 15% dedicated bed capacity in Emergency Wards for Heat Stroke & Heat Exhaustion cases.\n• Resource Supply: Ensure 100% stock availability of IV normal saline fluids, ORS packs, cooling blankets, and ice packs.\n• Triage Protocol: Fast-track patients arriving with body temperature > 103°F or altered mental state directly to cold immersion/cooling units."
  },
  {
    city: "Jaipur", temp: "43.5°C", severity: "Heatwave (Orange)", audience: "Municipality",
    text: "🏙️ MUNICIPAL ADMINISTRATION ACTION PLAN - JAIPUR\n\n• Public Infrastructure: Activate public misting stations at major bus stands and railway hubs.\n• Water Supply: Ensure uninterrupted water pipeline pressure and deploy mobile water tankers to vulnerable informal colonies.\n• Labor Safety: Enforce mandatory 2-hour rest periods for road construction workers between 1 PM and 3 PM."
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Advisory.deleteMany({});
    await Advisory.insertMany(advisoryData);
    console.log(`✅ Seeded ${advisoryData.length} advisory records`);

    await mongoose.disconnect();
    console.log('Done! Disconnected from MongoDB');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
