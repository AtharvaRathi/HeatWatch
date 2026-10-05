const mongoose = require('mongoose');
require('dotenv').config();
const { DashboardStats, AnalyticsData, Report, MapData } = require('./models/Analytics');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heatwave_analytics';

const dashboardStats = {
  currentAvgTemp: "38.5°C",
  avgTempTrend: "+2.3°C higher than seasonal normal",
  activeAlertsCount: 14,
  alertsBreakdown: "5 Severe (Red), 6 Orange, 3 Yellow",
  affectedRegionsCount: 8,
  affectedRegionsDetail: "Across 5 major states (MH, RJ, DL, GJ, TS)",
  highestRecordedTemp: "46.2°C",
  highestLocation: "Phalodi, Rajasthan",
  predictionAccuracy: "95.4%",
  accuracyDetail: "Based on 30-day IMD validation model"
};

const analyticsData = {
  tempTrend7Days: [
    { date: "Jul 20", Nagpur: 40.1, Jaipur: 39.5, Delhi: 38.2, Ahmedabad: 39.8 },
    { date: "Jul 21", Nagpur: 41.5, Jaipur: 40.2, Delhi: 39.0, Ahmedabad: 40.5 },
    { date: "Jul 22", Nagpur: 42.8, Jaipur: 41.5, Delhi: 40.1, Ahmedabad: 41.2 },
    { date: "Jul 23", Nagpur: 43.6, Jaipur: 42.1, Delhi: 41.0, Ahmedabad: 42.0 },
    { date: "Jul 24", Nagpur: 44.2, Jaipur: 43.0, Delhi: 41.8, Ahmedabad: 42.5 },
    { date: "Jul 25", Nagpur: 44.9, Jaipur: 43.2, Delhi: 42.1, Ahmedabad: 42.8 },
    { date: "Jul 26", Nagpur: 45.2, Jaipur: 43.5, Delhi: 42.4, Ahmedabad: 43.0 }
  ],
  regionComparison: [
    { region: "North West", avgTemp: 44.2, maxTemp: 46.2, riskScore: 92 },
    { region: "Central India", avgTemp: 43.8, maxTemp: 45.2, riskScore: 89 },
    { region: "North India", avgTemp: 41.9, maxTemp: 43.8, riskScore: 76 },
    { region: "West India", avgTemp: 41.0, maxTemp: 43.0, riskScore: 72 },
    { region: "South Central", avgTemp: 40.5, maxTemp: 42.1, riskScore: 65 },
    { region: "East Coast", avgTemp: 38.2, maxTemp: 40.8, riskScore: 48 }
  ],
  monthlyHeatwaveCounts: [
    { month: "Jan", alerts: 0, severeAlerts: 0 },
    { month: "Feb", alerts: 1, severeAlerts: 0 },
    { month: "Mar", alerts: 8, severeAlerts: 2 },
    { month: "Apr", alerts: 24, severeAlerts: 8 },
    { month: "May", alerts: 42, severeAlerts: 18 },
    { month: "Jun", alerts: 38, severeAlerts: 14 },
    { month: "Jul", alerts: 14, severeAlerts: 5 }
  ],
  severityDistribution: [
    { name: "Severe (Red)", value: 25, color: "#E11D48" },
    { name: "Heatwave (Orange)", value: 35, color: "#EA580C" },
    { name: "Warning (Yellow)", value: 25, color: "#D97706" },
    { name: "Normal (Green)", value: 15, color: "#059669" }
  ],
  predictionAccuracyHistory: [
    { week: "Wk 1", actual: 42.1, predicted: 42.3, errorRate: "0.48%" },
    { week: "Wk 2", actual: 43.5, predicted: 43.2, errorRate: "0.68%" },
    { week: "Wk 3", actual: 44.8, predicted: 44.9, errorRate: "0.22%" },
    { week: "Wk 4", actual: 45.2, predicted: 45.0, errorRate: "0.44%" }
  ],
  forecastConfidenceByRegion: [
    { region: "Vidarbha", confidence: 96, samples: 1420 },
    { region: "Marwar", confidence: 98, samples: 1850 },
    { region: "NCR", confidence: 94, samples: 2100 },
    { region: "Gangetic Plain", confidence: 91, samples: 1300 },
    { region: "Deccan Plateau", confidence: 95, samples: 1600 }
  ]
};

const reportsData = [
  { reportId: "REP-2026-0726", title: "Daily Heatwave Vulnerability & Risk Report", date: "July 26, 2026", period: "24 Hours", type: "Daily", size: "2.4 MB", status: "Published", author: "AI Prediction Engine v3.4" },
  { reportId: "REP-2026-W30", title: "Weekly National Heat Wave & Climate Assessment", date: "July 20 - July 26, 2026", period: "7 Days", type: "Weekly", size: "6.8 MB", status: "Published", author: "IMD Data Integration Unit" },
  { reportId: "REP-2026-M06", title: "Monthly Thermal Extremes & Mortality Risk Index", date: "June 2026", period: "30 Days", type: "Monthly", size: "14.2 MB", status: "Archived", author: "National Advisory Panel" },
  { reportId: "REP-2026-Q02", title: "Q2 Agriculture Heat Impact & Water Stress Analysis", date: "Apr - Jun 2026", period: "Quarterly", type: "Quarterly", size: "18.5 MB", status: "Archived", author: "Climate Resilience Team" }
];

const mapDataRecords = [
  { stateId: "RJ", name: "Rajasthan", severity: "Severe", code: "red", temp: "45.8°C", forecastTomorrow: "46.5°C", heatwaveProb: 98, topCities: ["Phalodi", "Jaipur", "Jodhpur", "Bikaner"], summary: "Extreme heatwave conditions prevailing across western districts. Red alert active." },
  { stateId: "MH", name: "Maharashtra", severity: "Severe", code: "red", temp: "44.5°C", forecastTomorrow: "45.0°C", heatwaveProb: 94, topCities: ["Nagpur", "Wardha", "Chandrapur", "Akola"], summary: "Vidarbha region experiencing severe thermal stress. Public advisories issued." },
  { stateId: "UP", name: "Uttar Pradesh", severity: "Severe", code: "red", temp: "43.8°C", forecastTomorrow: "44.2°C", heatwaveProb: 91, topCities: ["Jhansi", "Kanpur", "Agra", "Prayagraj"], summary: "Bundelkhand area under intense heat alert. High daytime radiation levels." },
  { stateId: "GJ", name: "Gujarat", severity: "Heatwave", code: "orange", temp: "43.0°C", forecastTomorrow: "43.4°C", heatwaveProb: 85, topCities: ["Ahmedabad", "Rajkot", "Gandhinagar", "Surat"], summary: "Hot dry winds blowing inland. High risk of dehydration." },
  { stateId: "DL", name: "Delhi", severity: "Heatwave", code: "orange", temp: "42.4°C", forecastTomorrow: "43.0°C", heatwaveProb: 82, topCities: ["New Delhi", "Dwarka", "Rohini"], summary: "Urban heat island effect amplifying afternoon temperature spikes." },
  { stateId: "MP", name: "Madhya Pradesh", severity: "Heatwave", code: "orange", temp: "42.2°C", forecastTomorrow: "42.8°C", heatwaveProb: 79, topCities: ["Gwalior", "Bhopal", "Indore", "Jabalpur"], summary: "Warm nights and hot afternoons expected over northern districts." },
  { stateId: "TS", name: "Telangana", severity: "Warning", code: "yellow", temp: "41.8°C", forecastTomorrow: "42.0°C", heatwaveProb: 68, topCities: ["Hyderabad", "Warangal", "Nizamabad"], summary: "Elevated temperatures with moderate humidity causing thermal discomfort." },
  { stateId: "AP", name: "Andhra Pradesh", severity: "Warning", code: "yellow", temp: "42.1°C", forecastTomorrow: "42.3°C", heatwaveProb: 71, topCities: ["Vijayawada", "Guntur", "Tirupati"], summary: "Coastal humidity elevating heat index values significantly." },
  { stateId: "BR", name: "Bihar", severity: "Heatwave", code: "orange", temp: "42.8°C", forecastTomorrow: "43.1°C", heatwaveProb: 84, topCities: ["Patna", "Gaya", "Muzaffarpur"], summary: "Dry westerly winds continuing to raise maximum temperatures." },
  { stateId: "OR", name: "Odisha", severity: "Warning", code: "yellow", temp: "40.2°C", forecastTomorrow: "40.8°C", heatwaveProb: 58, topCities: ["Bhubaneswar", "Cuttack", "Sambalpur"], summary: "Moist heat conditions. Moderate warning level." },
  { stateId: "KA", name: "Karnataka", severity: "Normal", code: "green", temp: "34.5°C", forecastTomorrow: "35.0°C", heatwaveProb: 22, topCities: ["Bengaluru", "Mysuru", "Hubballi"], summary: "Normal seasonal temperatures within comfortable thresholds." },
  { stateId: "TN", name: "Tamil Nadu", severity: "Normal", code: "green", temp: "36.2°C", forecastTomorrow: "36.5°C", heatwaveProb: 30, topCities: ["Chennai", "Coimbatore", "Madurai"], summary: "Normal coastal breeze keeping conditions stable." },
  { stateId: "WB", name: "West Bengal", severity: "Warning", code: "yellow", temp: "39.8°C", forecastTomorrow: "40.2°C", heatwaveProb: 52, topCities: ["Kolkata", "Asansol", "Siliguri"], summary: "Humid heat conditions across southern plains." }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await DashboardStats.deleteMany({});
    await AnalyticsData.deleteMany({});
    await Report.deleteMany({});
    await MapData.deleteMany({});

    await DashboardStats.create(dashboardStats);
    console.log('✅ Seeded dashboard stats');

    await AnalyticsData.create(analyticsData);
    console.log('✅ Seeded analytics data');

    await Report.insertMany(reportsData);
    console.log(`✅ Seeded ${reportsData.length} reports`);

    await MapData.insertMany(mapDataRecords);
    console.log(`✅ Seeded ${mapDataRecords.length} map data records`);

    await mongoose.disconnect();
    console.log('Done! Disconnected from MongoDB');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
