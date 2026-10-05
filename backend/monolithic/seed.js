const mongoose = require('mongoose');
require('dotenv').config();
const {
  CityWeather, WeeklyForecast, Alert, Advisory,
  DashboardStats, AnalyticsData, Report, MapData
} = require('./models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heatwave_monolithic';

// ==========================================
// ALL SEED DATA IN ONE PLACE (MONOLITHIC)
// ==========================================

const citiesData = [
  { cityId: "c1", city: "Nagpur", state: "Maharashtra", region: "Central India", temp: 45.2, humidity: 24, windSpeed: 18, status: "Severe", statusColor: "red", lastUpdated: "5 mins ago", riskScore: 96, confidence: 98 },
  { cityId: "c2", city: "Phalodi", state: "Rajasthan", region: "North West", temp: 46.2, humidity: 19, windSpeed: 22, status: "Severe", statusColor: "red", lastUpdated: "2 mins ago", riskScore: 99, confidence: 97 },
  { cityId: "c3", city: "Wardha", state: "Maharashtra", region: "Central India", temp: 44.8, humidity: 26, windSpeed: 15, status: "Severe", statusColor: "red", lastUpdated: "12 mins ago", riskScore: 92, confidence: 95 },
  { cityId: "c4", city: "Chandrapur", state: "Maharashtra", region: "Central India", temp: 44.1, humidity: 28, windSpeed: 16, status: "Heatwave", statusColor: "orange", lastUpdated: "8 mins ago", riskScore: 88, confidence: 94 },
  { cityId: "c5", city: "Jaipur", state: "Rajasthan", region: "North West", temp: 43.5, humidity: 22, windSpeed: 20, status: "Heatwave", statusColor: "orange", lastUpdated: "15 mins ago", riskScore: 84, confidence: 93 },
  { cityId: "c6", city: "Ahmedabad", state: "Gujarat", region: "West India", temp: 43.0, humidity: 35, windSpeed: 14, status: "Heatwave", statusColor: "orange", lastUpdated: "10 mins ago", riskScore: 81, confidence: 92 },
  { cityId: "c7", city: "New Delhi", state: "Delhi", region: "North India", temp: 42.4, humidity: 38, windSpeed: 19, status: "Warning", statusColor: "yellow", lastUpdated: "4 mins ago", riskScore: 74, confidence: 96 },
  { cityId: "c8", city: "Hyderabad", state: "Telangana", region: "South Central", temp: 41.8, humidity: 42, windSpeed: 12, status: "Warning", statusColor: "yellow", lastUpdated: "18 mins ago", riskScore: 68, confidence: 91 },
  { cityId: "c9", city: "Vijayawada", state: "Andhra Pradesh", region: "South East", temp: 42.1, humidity: 55, windSpeed: 11, status: "Warning", statusColor: "yellow", lastUpdated: "20 mins ago", riskScore: 71, confidence: 90 },
  { cityId: "c10", city: "Bhopal", state: "Madhya Pradesh", region: "Central India", temp: 41.5, humidity: 30, windSpeed: 13, status: "Warning", statusColor: "yellow", lastUpdated: "25 mins ago", riskScore: 65, confidence: 92 },
  { cityId: "c11", city: "Jhansi", state: "Uttar Pradesh", region: "North Central", temp: 43.8, humidity: 25, windSpeed: 17, status: "Severe", statusColor: "red", lastUpdated: "30 mins ago", riskScore: 90, confidence: 94 },
  { cityId: "c12", city: "Bhubaneswar", state: "Odisha", region: "East Coast", temp: 40.2, humidity: 62, windSpeed: 10, status: "Normal", statusColor: "green", lastUpdated: "14 mins ago", riskScore: 48, confidence: 89 },
  { cityId: "c13", city: "Pune", state: "Maharashtra", region: "West India", temp: 37.5, humidity: 48, windSpeed: 14, status: "Normal", statusColor: "green", lastUpdated: "6 mins ago", riskScore: 35, confidence: 95 },
  { cityId: "c14", city: "Bengaluru", state: "Karnataka", region: "South India", temp: 33.2, humidity: 60, windSpeed: 15, status: "Normal", statusColor: "green", lastUpdated: "1 minute ago", riskScore: 20, confidence: 98 },
  { cityId: "c15", city: "Patna", state: "Bihar", region: "East India", temp: 42.8, humidity: 36, windSpeed: 13, status: "Heatwave", statusColor: "orange", lastUpdated: "16 mins ago", riskScore: 79, confidence: 91 }
];

const forecastData = [
  { day: "Mon", date: "Jul 27", maxTemp: 41, minTemp: 29, risk: "Moderate", status: "Warning", code: "yellow" },
  { day: "Tue", date: "Jul 28", maxTemp: 43, minTemp: 30, risk: "High", status: "Heatwave", code: "orange" },
  { day: "Wed", date: "Jul 29", maxTemp: 45, minTemp: 32, risk: "Extreme", status: "Severe", code: "red" },
  { day: "Thu", date: "Jul 30", maxTemp: 44, minTemp: 31, risk: "Extreme", status: "Severe", code: "red" },
  { day: "Fri", date: "Jul 31", maxTemp: 42, minTemp: 30, risk: "High", status: "Heatwave", code: "orange" },
  { day: "Sat", date: "Aug 01", maxTemp: 39, minTemp: 28, risk: "Moderate", status: "Warning", code: "yellow" },
  { day: "Sun", date: "Aug 02", maxTemp: 37, minTemp: 27, risk: "Low", status: "Normal", code: "green" }
];

const alertsData = [
  { alertId: "ALT-001", level: "Red Alert", code: "red", city: "Phalodi", state: "Rajasthan", temp: "46.2°C", title: "Critical Thermal Threshold Exceeded", description: "Maximum temperature reached 46.2°C with dry desert winds gusting up to 25 km/h.", recommendedAction: "Mandatory suspension of outdoor work from 11 AM to 4 PM.", timestamp: "2026-07-26 14:30" },
  { alertId: "ALT-002", level: "Red Alert", code: "red", city: "Nagpur", state: "Maharashtra", temp: "45.2°C", title: "Severe Heatwave Wave 2 Impact", description: "Vidarbha central corridor facing third consecutive day of 44°C+ temperatures.", recommendedAction: "Activate hospital emergency heat wards.", timestamp: "2026-07-26 13:15" },
  { alertId: "ALT-003", level: "Orange Alert", code: "orange", city: "Chandrapur", state: "Maharashtra", temp: "44.1°C", title: "Sustained High Temperature Hazard", description: "Industrial heat retention causing uncomfortable night temperatures (32°C min).", recommendedAction: "Issue advisories for senior citizens and outdoor labor force.", timestamp: "2026-07-26 12:45" },
  { alertId: "ALT-004", level: "Orange Alert", code: "orange", city: "Jaipur", state: "Rajasthan", temp: "43.5°C", title: "Heatwave Warning for Metropolitan Region", description: "High daytime solar radiation with low humidity (22%).", recommendedAction: "Advise public to drink plenty of fluids and avoid direct sun.", timestamp: "2026-07-26 11:30" },
  { alertId: "ALT-005", level: "Yellow Alert", code: "yellow", city: "New Delhi", state: "Delhi NCR", temp: "42.4°C", title: "Moderate Heat Stress Risk", description: "Urban canopy temperature rising. Heat index feeling like 45°C.", recommendedAction: "Keep children hydrated during school transport hours.", timestamp: "2026-07-26 10:00" },
  { alertId: "ALT-006", level: "Green Alert", code: "green", city: "Bengaluru", state: "Karnataka", temp: "33.2°C", title: "Normal Seasonal Weather Conditions", description: "Mild wind gusts and moderate cloud cover.", recommendedAction: "No special emergency protocols required.", timestamp: "2026-07-26 09:00" }
];

const advisoryData = [
  { city: "Nagpur", temp: "45.2°C", severity: "Severe (Red)", audience: "Citizen", text: "🔥 CRITICAL CITIZEN ADVISORY - NAGPUR REGION\n\n• Avoid outdoor movements 11:30 AM - 4:30 PM.\n• Drink min 3.5-4 Liters water daily." },
  { city: "Phalodi", temp: "46.2°C", severity: "Severe (Red)", audience: "Farmer", text: "🌾 AGRICULTURAL HEAT ADVISORY - PHALODI\n\n• Irrigate only during 5 AM - 7 AM.\n• Shift field labor before 10:30 AM." },
  { city: "Chandrapur", temp: "44.1°C", severity: "Heatwave (Orange)", audience: "Hospital", text: "🏥 HEALTHCARE EMERGENCY ADVISORY\n\n• Reserve 15% bed capacity for heat stroke.\n• Ensure stock of IV saline and ORS." },
  { city: "Jaipur", temp: "43.5°C", severity: "Heatwave (Orange)", audience: "Municipality", text: "🏙️ MUNICIPAL ACTION PLAN - JAIPUR\n\n• Activate misting stations.\n• Deploy water tankers to vulnerable areas." }
];

const dashboardStats = {
  currentAvgTemp: "38.5°C", avgTempTrend: "+2.3°C higher than seasonal normal",
  activeAlertsCount: 14, alertsBreakdown: "5 Severe (Red), 6 Orange, 3 Yellow",
  affectedRegionsCount: 8, affectedRegionsDetail: "Across 5 major states (MH, RJ, DL, GJ, TS)",
  highestRecordedTemp: "46.2°C", highestLocation: "Phalodi, Rajasthan",
  predictionAccuracy: "95.4%", accuracyDetail: "Based on 30-day IMD validation model"
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
    { month: "Jan", alerts: 0, severeAlerts: 0 }, { month: "Feb", alerts: 1, severeAlerts: 0 },
    { month: "Mar", alerts: 8, severeAlerts: 2 }, { month: "Apr", alerts: 24, severeAlerts: 8 },
    { month: "May", alerts: 42, severeAlerts: 18 }, { month: "Jun", alerts: 38, severeAlerts: 14 },
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
  { stateId: "RJ", name: "Rajasthan", severity: "Severe", code: "red", temp: "45.8°C", forecastTomorrow: "46.5°C", heatwaveProb: 98, topCities: ["Phalodi", "Jaipur", "Jodhpur", "Bikaner"], summary: "Extreme heatwave across western districts." },
  { stateId: "MH", name: "Maharashtra", severity: "Severe", code: "red", temp: "44.5°C", forecastTomorrow: "45.0°C", heatwaveProb: 94, topCities: ["Nagpur", "Wardha", "Chandrapur", "Akola"], summary: "Vidarbha region severe thermal stress." },
  { stateId: "UP", name: "Uttar Pradesh", severity: "Severe", code: "red", temp: "43.8°C", forecastTomorrow: "44.2°C", heatwaveProb: 91, topCities: ["Jhansi", "Kanpur", "Agra", "Prayagraj"], summary: "Bundelkhand intense heat alert." },
  { stateId: "GJ", name: "Gujarat", severity: "Heatwave", code: "orange", temp: "43.0°C", forecastTomorrow: "43.4°C", heatwaveProb: 85, topCities: ["Ahmedabad", "Rajkot", "Gandhinagar", "Surat"], summary: "Hot dry winds. Dehydration risk." },
  { stateId: "DL", name: "Delhi", severity: "Heatwave", code: "orange", temp: "42.4°C", forecastTomorrow: "43.0°C", heatwaveProb: 82, topCities: ["New Delhi", "Dwarka", "Rohini"], summary: "Urban heat island effect." },
  { stateId: "MP", name: "Madhya Pradesh", severity: "Heatwave", code: "orange", temp: "42.2°C", forecastTomorrow: "42.8°C", heatwaveProb: 79, topCities: ["Gwalior", "Bhopal", "Indore", "Jabalpur"], summary: "Warm nights and hot afternoons." },
  { stateId: "TS", name: "Telangana", severity: "Warning", code: "yellow", temp: "41.8°C", forecastTomorrow: "42.0°C", heatwaveProb: 68, topCities: ["Hyderabad", "Warangal", "Nizamabad"], summary: "Moderate humidity discomfort." },
  { stateId: "AP", name: "Andhra Pradesh", severity: "Warning", code: "yellow", temp: "42.1°C", forecastTomorrow: "42.3°C", heatwaveProb: 71, topCities: ["Vijayawada", "Guntur", "Tirupati"], summary: "Coastal humidity heat index." },
  { stateId: "BR", name: "Bihar", severity: "Heatwave", code: "orange", temp: "42.8°C", forecastTomorrow: "43.1°C", heatwaveProb: 84, topCities: ["Patna", "Gaya", "Muzaffarpur"], summary: "Dry westerly winds." },
  { stateId: "OR", name: "Odisha", severity: "Warning", code: "yellow", temp: "40.2°C", forecastTomorrow: "40.8°C", heatwaveProb: 58, topCities: ["Bhubaneswar", "Cuttack", "Sambalpur"], summary: "Moist heat moderate warning." },
  { stateId: "KA", name: "Karnataka", severity: "Normal", code: "green", temp: "34.5°C", forecastTomorrow: "35.0°C", heatwaveProb: 22, topCities: ["Bengaluru", "Mysuru", "Hubballi"], summary: "Normal comfortable thresholds." },
  { stateId: "TN", name: "Tamil Nadu", severity: "Normal", code: "green", temp: "36.2°C", forecastTomorrow: "36.5°C", heatwaveProb: 30, topCities: ["Chennai", "Coimbatore", "Madurai"], summary: "Normal coastal breeze." },
  { stateId: "WB", name: "West Bengal", severity: "Warning", code: "yellow", temp: "39.8°C", forecastTomorrow: "40.2°C", heatwaveProb: 52, topCities: ["Kolkata", "Asansol", "Siliguri"], summary: "Humid heat southern plains." }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB (Monolithic)');

    await Promise.all([
      CityWeather.deleteMany({}), WeeklyForecast.deleteMany({}),
      Alert.deleteMany({}), Advisory.deleteMany({}),
      DashboardStats.deleteMany({}), AnalyticsData.deleteMany({}),
      Report.deleteMany({}), MapData.deleteMany({})
    ]);

    await CityWeather.insertMany(citiesData);
    await WeeklyForecast.insertMany(forecastData);
    await Alert.insertMany(alertsData);
    await Advisory.insertMany(advisoryData);
    await DashboardStats.create(dashboardStats);
    await AnalyticsData.create(analyticsData);
    await Report.insertMany(reportsData);
    await MapData.insertMany(mapDataRecords);

    console.log('✅ All data seeded successfully (Monolithic)');
    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
