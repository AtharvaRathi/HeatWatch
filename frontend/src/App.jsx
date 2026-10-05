import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Components & Layout
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import WeatherMonitoring from './pages/WeatherMonitoring';
import InteractiveHeatMap from './pages/InteractiveHeatMap';
import HeatwaveHotspots from './pages/HeatwaveHotspots';
import AlertsEarlyWarning from './pages/AlertsEarlyWarning';
import AIAdvisoryGenerator from './pages/AIAdvisoryGenerator';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Redirect root to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* App Dashboard Routes wrapped inside Layout */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/monitoring"
            element={
              <Layout>
                <WeatherMonitoring />
              </Layout>
            }
          />
          <Route
            path="/map"
            element={
              <Layout>
                <InteractiveHeatMap />
              </Layout>
            }
          />
          <Route
            path="/hotspots"
            element={
              <Layout>
                <HeatwaveHotspots />
              </Layout>
            }
          />
          <Route
            path="/alerts"
            element={
              <Layout>
                <AlertsEarlyWarning />
              </Layout>
            }
          />
          <Route
            path="/ai-advisory"
            element={
              <Layout>
                <AIAdvisoryGenerator />
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout>
                <Analytics />
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout>
                <Reports />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />

          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;