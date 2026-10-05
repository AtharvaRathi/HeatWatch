const mongoose = require('mongoose');
require('dotenv').config();
const { Alert } = require('./models/Alert');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heatwave_alerts';

const alertsData = [
  {
    alertId: "ALT-001", level: "Red Alert", code: "red", city: "Phalodi", state: "Rajasthan", temp: "46.2°C",
    title: "Critical Thermal Threshold Exceeded",
    description: "Maximum temperature reached 46.2°C with dry desert winds gusting up to 25 km/h. Extremely high risk of heatstroke.",
    recommendedAction: "Mandatory suspension of outdoor work from 11 AM to 4 PM. Open cooling shelters and distribute electrolyte packets.",
    timestamp: "2026-07-26 14:30"
  },
  {
    alertId: "ALT-002", level: "Red Alert", code: "red", city: "Nagpur", state: "Maharashtra", temp: "45.2°C",
    title: "Severe Heatwave Wave 2 Impact",
    description: "Vidarbha central corridor facing third consecutive day of 44°C+ temperatures. Surface pavement heat exceeds 54°C.",
    recommendedAction: "Activate hospital emergency heat wards. Increase municipal water tanker supply to informal settlements.",
    timestamp: "2026-07-26 13:15"
  },
  {
    alertId: "ALT-003", level: "Orange Alert", code: "orange", city: "Chandrapur", state: "Maharashtra", temp: "44.1°C",
    title: "Sustained High Temperature Hazard",
    description: "Industrial heat retention combined with high atmospheric temperature causing uncomfortable night temperatures (32°C min).",
    recommendedAction: "Issue advisories for senior citizens and outdoor labor force. Monitor power grid stability.",
    timestamp: "2026-07-26 12:45"
  },
  {
    alertId: "ALT-004", level: "Orange Alert", code: "orange", city: "Jaipur", state: "Rajasthan", temp: "43.5°C",
    title: "Heatwave Warning for Metropolitan Region",
    description: "High daytime solar radiation with low humidity (22%). Heat wave probability predicted at 88% for next 48 hrs.",
    recommendedAction: "Advise public to drink plenty of fluids, wear lightweight cotton clothing, and avoid direct sun exposure.",
    timestamp: "2026-07-26 11:30"
  },
  {
    alertId: "ALT-005", level: "Yellow Alert", code: "yellow", city: "New Delhi", state: "Delhi NCR", temp: "42.4°C",
    title: "Moderate Heat Stress Risk",
    description: "Urban canopy temperature rising. Heat index feeling like 45°C due to humidity mix.",
    recommendedAction: "Keep children hydrated during school transport hours. Maintain shade zones at transit hubs.",
    timestamp: "2026-07-26 10:00"
  },
  {
    alertId: "ALT-006", level: "Green Alert", code: "green", city: "Bengaluru", state: "Karnataka", temp: "33.2°C",
    title: "Normal Seasonal Weather Conditions",
    description: "Mild wind gusts and moderate cloud cover keeping temperatures comfortably below alert thresholds.",
    recommendedAction: "No special emergency protocols required. Standard daily monitoring continues.",
    timestamp: "2026-07-26 09:00"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Alert.deleteMany({});
    await Alert.insertMany(alertsData);
    console.log(`✅ Seeded ${alertsData.length} alert records`);

    await mongoose.disconnect();
    console.log('Done! Disconnected from MongoDB');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
