// ============================================
// API CLIENT LAYER
// Fetches data from backend microservices
// Falls back to mockData if API is unreachable
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Generic fetch wrapper with error handling and timeout
 */
async function fetchAPI(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    console.warn(`⚠️ API call failed for ${endpoint}:`, error.message);
    return null; // Return null to trigger fallback
  }
}

// ============================================
// WEATHER SERVICE APIs
// ============================================

export async function fetchCitiesWeather() {
  return await fetchAPI('/api/weather/cities');
}

export async function fetchCityWeather(cityId) {
  return await fetchAPI(`/api/weather/cities/${cityId}`);
}

export async function fetchWeeklyForecast() {
  return await fetchAPI('/api/weather/forecast');
}

// ============================================
// ALERT SERVICE APIs
// ============================================

export async function fetchAlerts(severity = null, search = null) {
  const params = new URLSearchParams();
  if (severity) params.append('severity', severity);
  if (search) params.append('search', search);
  const queryString = params.toString();
  return await fetchAPI(`/api/alerts${queryString ? '?' + queryString : ''}`);
}

export async function fetchAlertById(alertId) {
  return await fetchAPI(`/api/alerts/${alertId}`);
}

export async function fetchAlertsBySeverity(level) {
  return await fetchAPI(`/api/alerts/severity/${level}`);
}

// ============================================
// ADVISORY SERVICE APIs
// ============================================

export async function fetchAdvisoryPresets(audience = null, city = null) {
  const params = new URLSearchParams();
  if (audience) params.append('audience', audience);
  if (city) params.append('city', city);
  const queryString = params.toString();
  return await fetchAPI(`/api/advisory/presets${queryString ? '?' + queryString : ''}`);
}

export async function generateAdvisory(city, audience, temp, severity) {
  const params = new URLSearchParams({ city, audience });
  if (temp) params.append('temp', temp);
  if (severity) params.append('severity', severity);
  return await fetchAPI(`/api/advisory/generate?${params.toString()}`);
}

// ============================================
// ANALYTICS SERVICE APIs
// ============================================

export async function fetchDashboardStats() {
  return await fetchAPI('/api/analytics/dashboard');
}

export async function fetchAnalyticsTrends() {
  return await fetchAPI('/api/analytics/trends');
}

export async function fetchReports(type = null) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  const queryString = params.toString();
  return await fetchAPI(`/api/analytics/reports${queryString ? '?' + queryString : ''}`);
}

export async function fetchMapData() {
  return await fetchAPI('/api/analytics/map-data');
}

// ============================================
// HEALTH CHECK APIs
// ============================================

export async function checkServiceHealth(service) {
  const endpoints = {
    weather: '/api/weather/health',
    alerts: '/api/alerts/health',
    advisory: '/api/advisory/health',
    analytics: '/api/analytics/health',
    gateway: '/gateway/health',
  };
  return await fetchAPI(endpoints[service] || endpoints.gateway);
}

export async function checkAllServicesHealth() {
  const services = ['weather', 'alerts', 'advisory', 'analytics', 'gateway'];
  const results = await Promise.all(
    services.map(async (service) => ({
      service,
      health: await checkServiceHealth(service),
    }))
  );
  return results;
}
