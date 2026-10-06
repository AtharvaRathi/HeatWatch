const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend/src/pages');
const componentsDir = path.join(__dirname, 'frontend/src/components');

function removeMockData(filePath, mockName, defaultState) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove import
  const importRegex = new RegExp(`import \\{\\s*${mockName}\\s*\\} from '../data/mockData';\\n?`, 'g');
  content = content.replace(importRegex, '');
  
  // Replace useState fallback
  const stateRegex = new RegExp(`useState\\(${mockName}\\)`, 'g');
  content = content.replace(stateRegex, `useState(${defaultState})`);
  
  fs.writeFileSync(filePath, content);
}

removeMockData(path.join(pagesDir, 'HeatwaveHotspots.jsx'), 'mockHotspots', '[]');
removeMockData(path.join(pagesDir, 'AlertsEarlyWarning.jsx'), 'mockAlerts', '[]');
removeMockData(path.join(pagesDir, 'Reports.jsx'), 'mockReportsList', '[]');
removeMockData(path.join(pagesDir, 'Analytics.jsx'), 'mockAnalyticsData', '{ tempTrend7Days: [] }');
removeMockData(path.join(pagesDir, 'InteractiveHeatMap.jsx'), 'mockIndiaStatesMapData', '[]');
removeMockData(path.join(componentsDir, 'IndiaMap.jsx'), 'mockIndiaStatesMapData', '[]');
removeMockData(path.join(componentsDir, 'NotificationsPanel.jsx'), 'mockRecentActivities', '[]');

