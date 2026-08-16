// Realistic Mock Data for Heatwave Detection & AI Prediction Platform

export const mockDashboardStats = {
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

export const mockWeeklyForecast = [
  { day: "Mon", date: "Jul 27", maxTemp: 41, minTemp: 29, risk: "Moderate", status: "Warning", code: "yellow" },
  { day: "Tue", date: "Jul 28", maxTemp: 43, minTemp: 30, risk: "High", status: "Heatwave", code: "orange" },
  { day: "Wed", date: "Jul 29", maxTemp: 45, minTemp: 32, risk: "Extreme", status: "Severe", code: "red" },
  { day: "Thu", date: "Jul 30", maxTemp: 44, minTemp: 31, risk: "Extreme", status: "Severe", code: "red" },
  { day: "Fri", date: "Jul 31", maxTemp: 42, minTemp: 30, risk: "High", status: "Heatwave", code: "orange" },
  { day: "Sat", date: "Aug 01", maxTemp: 39, minTemp: 28, risk: "Moderate", status: "Warning", code: "yellow" },
  { day: "Sun", date: "Aug 02", maxTemp: 37, minTemp: 27, risk: "Low", status: "Normal", code: "green" },
];

export const mockRecentActivities = [
  { id: 1, type: "alert", title: "Severe Heatwave Alert Issued", target: "Nagpur & Wardha, MH", time: "10 mins ago", severity: "red" },
  { id: 2, type: "prediction", title: "AI Model Sync Completed", target: "LSTM 72h Weather Forecast", time: "35 mins ago", severity: "blue" },
  { id: 3, type: "advisory", title: "Automated Municipal Advisory", target: "Jaipur Water Board", time: "1 hour ago", severity: "orange" },
  { id: 4, type: "report", title: "Daily Heat Risk Summary Generated", target: "PDF Export Ready", time: "2 hours ago", severity: "green" },
  { id: 5, type: "alert", title: "Temperature Spike Detected", target: "Phalodi, RJ (46.2°C)", time: "3 hours ago", severity: "red" },
];

export const mockCitiesWeather = [
  { id: "c1", city: "Nagpur", state: "Maharashtra", region: "Central India", temp: 45.2, humidity: 24, windSpeed: 18, status: "Severe", statusColor: "red", lastUpdated: "5 mins ago", riskScore: 96, confidence: 98 },
  { id: "c2", city: "Phalodi", state: "Rajasthan", region: "North West", temp: 46.2, humidity: 19, windSpeed: 22, status: "Severe", statusColor: "red", lastUpdated: "2 mins ago", riskScore: 99, confidence: 97 },
  { id: "c3", city: "Wardha", state: "Maharashtra", region: "Central India", temp: 44.8, humidity: 26, windSpeed: 15, status: "Severe", statusColor: "red", lastUpdated: "12 mins ago", riskScore: 92, confidence: 95 },
  { id: "c4", city: "Chandrapur", state: "Maharashtra", region: "Central India", temp: 44.1, humidity: 28, windSpeed: 16, status: "Heatwave", statusColor: "orange", lastUpdated: "8 mins ago", riskScore: 88, confidence: 94 },
  { id: "c5", city: "Jaipur", state: "Rajasthan", region: "North West", temp: 43.5, humidity: 22, windSpeed: 20, status: "Heatwave", statusColor: "orange", lastUpdated: "15 mins ago", riskScore: 84, confidence: 93 },
  { id: "c6", city: "Ahmedabad", state: "Gujarat", region: "West India", temp: 43.0, humidity: 35, windSpeed: 14, status: "Heatwave", statusColor: "orange", lastUpdated: "10 mins ago", riskScore: 81, confidence: 92 },
  { id: "c7", city: "New Delhi", state: "Delhi", region: "North India", temp: 42.4, humidity: 38, windSpeed: 19, status: "Warning", statusColor: "yellow", lastUpdated: "4 mins ago", riskScore: 74, confidence: 96 },
  { id: "c8", city: "Hyderabad", state: "Telangana", region: "South Central", temp: 41.8, humidity: 42, windSpeed: 12, status: "Warning", statusColor: "yellow", lastUpdated: "18 mins ago", riskScore: 68, confidence: 91 },
  { id: "c9", city: "Vijayawada", state: "Andhra Pradesh", region: "South East", temp: 42.1, humidity: 55, windSpeed: 11, status: "Warning", statusColor: "yellow", lastUpdated: "20 mins ago", riskScore: 71, confidence: 90 },
  { id: "c10", city: "Bhopal", state: "Madhya Pradesh", region: "Central India", temp: 41.5, humidity: 30, windSpeed: 13, status: "Warning", statusColor: "yellow", lastUpdated: "25 mins ago", riskScore: 65, confidence: 92 },
  { id: "c11", city: "Jhansi", state: "Uttar Pradesh", region: "North Central", temp: 43.8, humidity: 25, windSpeed: 17, status: "Severe", statusColor: "red", lastUpdated: "30 mins ago", riskScore: 90, confidence: 94 },
  { id: "c12", city: "Bhubaneswar", state: "Odisha", region: "East Coast", temp: 40.2, humidity: 62, windSpeed: 10, status: "Normal", statusColor: "green", lastUpdated: "14 mins ago", riskScore: 48, confidence: 89 },
  { id: "c13", city: "Pune", state: "Maharashtra", region: "West India", temp: 37.5, humidity: 48, windSpeed: 14, status: "Normal", statusColor: "green", lastUpdated: "6 mins ago", riskScore: 35, confidence: 95 },
  { id: "c14", city: "Bengaluru", state: "Karnataka", region: "South India", temp: 33.2, humidity: 60, windSpeed: 15, status: "Normal", statusColor: "green", lastUpdated: "1 minute ago", riskScore: 20, confidence: 98 },
  { id: "c15", city: "Patna", state: "Bihar", region: "East India", temp: 42.8, humidity: 36, windSpeed: 13, status: "Heatwave", statusColor: "orange", lastUpdated: "16 mins ago", riskScore: 79, confidence: 91 }
];

export const mockHotspots = mockCitiesWeather
  .map((item, index) => ({
    ...item,
    rank: index + 1,
    riskColor: item.statusColor
  }))
  .sort((a, b) => b.riskScore - a.riskScore);

export const mockIndiaStatesMapData = [
  { id: "RJ", name: "Rajasthan", severity: "Severe", code: "red", temp: "45.8°C", forecastTomorrow: "46.5°C", heatwaveProb: 98, topCities: ["Phalodi", "Jaipur", "Jodhpur", "Bikaner"], summary: "Extreme heatwave conditions prevailing across western districts. Red alert active." },
  { id: "MH", name: "Maharashtra", severity: "Severe", code: "red", temp: "44.5°C", forecastTomorrow: "45.0°C", heatwaveProb: 94, topCities: ["Nagpur", "Wardha", "Chandrapur", "Akola"], summary: "Vidarbha region experiencing severe thermal stress. Public advisories issued." },
  { id: "UP", name: "Uttar Pradesh", severity: "Severe", code: "red", temp: "43.8°C", forecastTomorrow: "44.2°C", heatwaveProb: 91, topCities: ["Jhansi", "Kanpur", "Agra", "Prayagraj"], summary: "Bundelkhand area under intense heat alert. High daytime radiation levels." },
  { id: "GJ", name: "Gujarat", severity: "Heatwave", code: "orange", temp: "43.0°C", forecastTomorrow: "43.4°C", heatwaveProb: 85, topCities: ["Ahmedabad", "Rajkot", "Gandhinagar", "Surat"], summary: "Hot dry winds blowing inland. High risk of dehydration." },
  { id: "DL", name: "Delhi", severity: "Heatwave", code: "orange", temp: "42.4°C", forecastTomorrow: "43.0°C", heatwaveProb: 82, topCities: ["New Delhi", "Dwarka", "Rohini"], summary: "Urban heat island effect amplifying afternoon temperature spikes." },
  { id: "MP", name: "Madhya Pradesh", severity: "Heatwave", code: "orange", temp: "42.2°C", forecastTomorrow: "42.8°C", heatwaveProb: 79, topCities: ["Gwalior", "Bhopal", "Indore", "Jabalpur"], summary: "Warm nights and hot afternoons expected over northern districts." },
  { id: "TS", name: "Telangana", severity: "Warning", code: "yellow", temp: "41.8°C", forecastTomorrow: "42.0°C", heatwaveProb: 68, topCities: ["Hyderabad", "Warangal", "Nizamabad"], summary: "Elevated temperatures with moderate humidity causing thermal discomfort." },
  { id: "AP", name: "Andhra Pradesh", severity: "Warning", code: "yellow", temp: "42.1°C", forecastTomorrow: "42.3°C", heatwaveProb: 71, topCities: ["Vijayawada", "Guntur", "Tirupati"], summary: "Coastal humidity elevating heat index values significantly." },
  { id: "BR", name: "Bihar", severity: "Heatwave", code: "orange", temp: "42.8°C", forecastTomorrow: "43.1°C", heatwaveProb: 84, topCities: ["Patna", "Gaya", "Muzaffarpur"], summary: "Dry westerly winds continuing to raise maximum temperatures." },
  { id: "OR", name: "Odisha", severity: "Warning", code: "yellow", temp: "40.2°C", forecastTomorrow: "40.8°C", heatwaveProb: 58, topCities: ["Bhubaneswar", "Cuttack", "Sambalpur"], summary: "Moist heat conditions. Moderate warning level." },
  { id: "KA", name: "Karnataka", severity: "Normal", code: "green", temp: "34.5°C", forecastTomorrow: "35.0°C", heatwaveProb: 22, topCities: ["Bengaluru", "Mysuru", "Hubballi"], summary: "Normal seasonal temperatures within comfortable thresholds." },
  { id: "TN", name: "Tamil Nadu", severity: "Normal", code: "green", temp: "36.2°C", forecastTomorrow: "36.5°C", heatwaveProb: 30, topCities: ["Chennai", "Coimbatore", "Madurai"], summary: "Normal coastal breeze keeping conditions stable." },
  { id: "WB", name: "West Bengal", severity: "Warning", code: "yellow", temp: "39.8°C", forecastTomorrow: "40.2°C", heatwaveProb: 52, topCities: ["Kolkata", "Asansol", "Siliguri"], summary: "Humid heat conditions across southern plains." }
];

export const mockAlerts = [
  {
    id: "ALT-001",
    level: "Red Alert",
    code: "red",
    city: "Phalodi",
    state: "Rajasthan",
    temp: "46.2°C",
    title: "Critical Thermal Threshold Exceeded",
    description: "Maximum temperature reached 46.2°C with dry desert winds gusting up to 25 km/h. Extremely high risk of heatstroke.",
    recommendedAction: "Mandatory suspension of outdoor work from 11 AM to 4 PM. Open cooling shelters and distribute electrolyte packets.",
    timestamp: "2026-07-26 14:30"
  },
  {
    id: "ALT-002",
    level: "Red Alert",
    code: "red",
    city: "Nagpur",
    state: "Maharashtra",
    temp: "45.2°C",
    title: "Severe Heatwave Wave 2 Impact",
    description: "Vidarbha central corridor facing third consecutive day of 44°C+ temperatures. Surface pavement heat exceeds 54°C.",
    recommendedAction: "Activate hospital emergency heat wards. Increase municipal water tanker supply to informal settlements.",
    timestamp: "2026-07-26 13:15"
  },
  {
    id: "ALT-003",
    level: "Orange Alert",
    code: "orange",
    city: "Chandrapur",
    state: "Maharashtra",
    temp: "44.1°C",
    title: "Sustained High Temperature Hazard",
    description: "Industrial heat retention combined with high atmospheric temperature causing uncomfortable night temperatures (32°C min).",
    recommendedAction: "Issue advisories for senior citizens and outdoor labor force. Monitor power grid stability.",
    timestamp: "2026-07-26 12:45"
  },
  {
    id: "ALT-004",
    level: "Orange Alert",
    code: "orange",
    city: "Jaipur",
    state: "Rajasthan",
    temp: "43.5°C",
    title: "Heatwave Warning for Metropolitan Region",
    description: "High daytime solar radiation with low humidity (22%). Heat wave probability predicted at 88% for next 48 hrs.",
    recommendedAction: "Advise public to drink plenty of fluids, wear lightweight cotton clothing, and avoid direct sun exposure.",
    timestamp: "2026-07-26 11:30"
  },
  {
    id: "ALT-005",
    level: "Yellow Alert",
    code: "yellow",
    city: "New Delhi",
    state: "Delhi NCR",
    temp: "42.4°C",
    title: "Moderate Heat Stress Risk",
    description: "Urban canopy temperature rising. Heat index feeling like 45°C due to humidity mix.",
    recommendedAction: "Keep children hydrated during school transport hours. Maintain shade zones at transit hubs.",
    timestamp: "2026-07-26 10:00"
  },
  {
    id: "ALT-006",
    level: "Green Alert",
    code: "green",
    city: "Bengaluru",
    state: "Karnataka",
    temp: "33.2°C",
    title: "Normal Seasonal Weather Conditions",
    description: "Mild wind gusts and moderate cloud cover keeping temperatures comfortably below alert thresholds.",
    recommendedAction: "No special emergency protocols required. Standard daily monitoring continues.",
    timestamp: "2026-07-26 09:00"
  }
];

export const mockAIAdvisoryPresets = [
  {
    city: "Nagpur",
    temp: "45.2°C",
    severity: "Severe (Red)",
    audience: "Citizen",
    text: "🔥 CRITICAL CITIZEN ADVISORY - NAGPUR REGION\n\n• Exposure Hazard: Avoid non-essential outdoor movements between 11:30 AM and 4:30 PM.\n• Hydration Strategy: Drink minimum 3.5 - 4 Liters of water daily, supplemented with ORS or natural lemon juice.\n• First Aid Notice: If experiencing dizziness, rapid pulse, or lack of sweating, seek immediate shade and call emergency medical support at 108.\n• Home Cooling: Keep window blinds drawn during peak sun hours; use damp curtains to cool interior airflow."
  },
  {
    city: "Phalodi",
    temp: "46.2°C",
    severity: "Severe (Red)",
    audience: "Farmer",
    text: "🌾 AGRICULTURAL HEAT ADVISORY - PHALODI & WEST RAJASTHAN\n\n• Crop Protection: Conduct light micro-irrigation only during early morning (5 AM - 7 AM) or late evening to reduce evaporative water loss.\n• Livestock Care: Ensure cattle sheds are covered with thatch or wet gunny bags. Provide continuous access to shade and cool drinking water mixed with mineral salts.\n• Field Work Timings: Shift all manual harvesting and field labor strictly to early morning hours before 10:30 AM."
  },
  {
    city: "Chandrapur",
    temp: "44.1°C",
    severity: "Heatwave (Orange)",
    audience: "Hospital",
    text: "🏥 HEALTHCARE SYSTEM EMERGENCY PREPAREDNESS ADVISORY\n\n• Ward Readiness: Reserve at least 15% dedicated bed capacity in Emergency Wards for Heat Stroke & Heat Exhaustion cases.\n• Resource Supply: Ensure 100% stock availability of IV normal saline fluids, ORS packs, cooling blankets, and ice packs.\n• Triage Protocol: Fast-track patients arriving with body temperature > 103°F or altered mental state directly to cold immersion/cooling units."
  },
  {
    city: "Jaipur",
    temp: "43.5°C",
    severity: "Heatwave (Orange)",
    audience: "Municipality",
    text: "🏙️ MUNICIPAL ADMINISTRATION ACTION PLAN - JAIPUR\n\n• Public Infrastructure: Activate public misting stations at major bus stands and railway hubs.\n• Water Supply: Ensure uninterrupted water pipeline pressure and deploy mobile water tankers to vulnerable informal colonies.\n• Labor Safety: Enforce mandatory 2-hour rest periods for road construction workers between 1 PM and 3 PM."
  }
];

export const mockAnalyticsData = {
  tempTrend7Days: [
    { date: "Jul 20", Nagpur: 40.1, Jaipur: 39.5, Delhi: 38.2, Ahmedabad: 39.8 },
    { date: "Jul 21", Nagpur: 41.5, Jaipur: 40.2, Delhi: 39.0, Ahmedabad: 40.5 },
    { date: "Jul 22", Nagpur: 42.8, Jaipur: 41.5, Delhi: 40.1, Ahmedabad: 41.2 },
    { date: "Jul 23", Nagpur: 43.6, Jaipur: 42.1, Delhi: 41.0, Ahmedabad: 42.0 },
    { date: "Jul 24", Nagpur: 44.2, Jaipur: 43.0, Delhi: 41.8, Ahmedabad: 42.5 },
    { date: "Jul 25", Nagpur: 44.9, Jaipur: 43.2, Delhi: 42.1, Ahmedabad: 42.8 },
    { date: "Jul 26", Nagpur: 45.2, Jaipur: 43.5, Delhi: 42.4, Ahmedabad: 43.0 },
  ],
  regionComparison: [
    { region: "North West", avgTemp: 44.2, maxTemp: 46.2, riskScore: 92 },
    { region: "Central India", avgTemp: 43.8, maxTemp: 45.2, riskScore: 89 },
    { region: "North India", avgTemp: 41.9, maxTemp: 43.8, riskScore: 76 },
    { region: "West India", avgTemp: 41.0, maxTemp: 43.0, riskScore: 72 },
    { region: "South Central", avgTemp: 40.5, maxTemp: 42.1, riskScore: 65 },
    { region: "East Coast", avgTemp: 38.2, maxTemp: 40.8, riskScore: 48 },
  ],
  monthlyHeatwaveCounts: [
    { month: "Jan", alerts: 0, severeAlerts: 0 },
    { month: "Feb", alerts: 1, severeAlerts: 0 },
    { month: "Mar", alerts: 8, severeAlerts: 2 },
    { month: "Apr", alerts: 24, severeAlerts: 8 },
    { month: "May", alerts: 42, severeAlerts: 18 },
    { month: "Jun", alerts: 38, severeAlerts: 14 },
    { month: "Jul", alerts: 14, severeAlerts: 5 },
  ],
  severityDistribution: [
    { name: "Severe (Red)", value: 25, color: "#E11D48" },
    { name: "Heatwave (Orange)", value: 35, color: "#EA580C" },
    { name: "Warning (Yellow)", value: 25, color: "#D97706" },
    { name: "Normal (Green)", value: 15, color: "#059669" },
  ],
  predictionAccuracyHistory: [
    { week: "Wk 1", actual: 42.1, predicted: 42.3, errorRate: "0.48%" },
    { week: "Wk 2", actual: 43.5, predicted: 43.2, errorRate: "0.68%" },
    { week: "Wk 3", actual: 44.8, predicted: 44.9, errorRate: "0.22%" },
    { week: "Wk 4", actual: 45.2, predicted: 45.0, errorRate: "0.44%" },
  ],
  forecastConfidenceByRegion: [
    { region: "Vidarbha", confidence: 96, samples: 1420 },
    { region: "Marwar", confidence: 98, samples: 1850 },
    { region: "NCR", confidence: 94, samples: 2100 },
    { region: "Gangetic Plain", confidence: 91, samples: 1300 },
    { region: "Deccan Plateau", confidence: 95, samples: 1600 }
  ]
};

export const mockReportsList = [
  {
    id: "REP-2026-0726",
    title: "Daily Heatwave Vulnerability & Risk Report",
    date: "July 26, 2026",
    period: "24 Hours",
    type: "Daily",
    size: "2.4 MB",
    status: "Published",
    author: "AI Prediction Engine v3.4"
  },
  {
    id: "REP-2026-W30",
    title: "Weekly National Heat Wave & Climate Assessment",
    date: "July 20 - July 26, 2026",
    period: "7 Days",
    type: "Weekly",
    size: "6.8 MB",
    status: "Published",
    author: "IMD Data Integration Unit"
  },
  {
    id: "REP-2026-M06",
    title: "Monthly Thermal Extremes & Mortality Risk Index",
    date: "June 2026",
    period: "30 Days",
    type: "Monthly",
    size: "14.2 MB",
    status: "Archived",
    author: "National Advisory Panel"
  },
  {
    id: "REP-2026-Q02",
    title: "Q2 Agriculture Heat Impact & Water Stress Analysis",
    date: "Apr - Jun 2026",
    period: "Quarterly",
    type: "Quarterly",
    size: "18.5 MB",
    status: "Archived",
    author: "Climate Resilience Team"
  }
];

export const mockTeamMembers = [
  { name: "Dr. Rajesh Sharma", role: "Chief Climate Scientist & ML Lead", institute: "IIT Bombay", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80" },
  { name: "Ananya Deshmukh", role: "Senior Geospatial & Frontend Engineer", institute: "Heat AI Labs", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80" },
  { name: "Vikramaditya Verma", role: "AI Predictive Modeling Research Fellow", institute: "IMD Collaborator", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" },
  { name: "Priya Nair", role: "Disaster Risk & Emergency Systems Architect", institute: "NDMA Liaison", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" }
];

export const mockFaqs = [
  {
    q: "How does the AI model predict heatwaves up to 72 hours in advance?",
    a: "Our system combines IMD high-resolution satellite imagery, ERA5 atmospheric reanalysis data, land surface temperature dynamics, and deep learning LSTM/Transformer neural networks trained on 40 years of Indian meteorological history."
  },
  {
    q: "What defines a Heatwave vs a Severe Heatwave according to IMD criteria?",
    a: "A Heatwave is declared when maximum temperature reaches at least 40°C in plains (30°C in hills) and departs by +4.5°C to +6.4°C from normal. A Severe Heatwave is declared when temperature exceeds 45°C or departs by >6.4°C."
  },
  {
    q: "Can municipalities automate public warning broadcasts using this platform?",
    a: "Yes! The AI Advisory Generator automatically synthesizes targeted actionable advisories tailored for municipal water boards, hospitals, farmers, and citizens, which can be dispatched via API endpoints, SMS, or PDF exports."
  },
  {
    q: "How accurate are the land surface temperature predictions?",
    a: "In empirical validation against 500+ ground weather stations, our prediction model maintains a mean absolute error (MAE) of less than 0.45°C with a 95.4% overall confidence index."
  }
];
