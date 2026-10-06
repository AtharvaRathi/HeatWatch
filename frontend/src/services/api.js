// ============================================
// API CLIENT LAYER
// Fetches data from backend microservices
// Falls back to mockData if API is unreachable
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Microservice-specific Base URLs (if deployed independently)
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL || API_BASE_URL;
const ALERT_API_URL = import.meta.env.VITE_ALERT_API_URL || API_BASE_URL;
const ADVISORY_API_URL = import.meta.env.VITE_ADVISORY_API_URL || API_BASE_URL;
const ANALYTICS_API_URL = import.meta.env.VITE_ANALYTICS_API_URL || API_BASE_URL;

/**
 * Generic fetch wrapper with error handling and timeout
 */
async function fetchAPI(baseUrl, endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
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
  return await fetchAPI(WEATHER_API_URL, '/api/weather/cities');
}

export async function searchCityWeather(city) {
  return await fetchAPI(WEATHER_API_URL, '/api/weather/search', {
    method: 'POST',
    body: JSON.stringify({ city })
  });
}

export async function fetchCityWeather(cityId) {
  return await fetchAPI(WEATHER_API_URL, `/api/weather/cities/${cityId}`);
}

export async function fetchWeeklyForecast() {
  return await fetchAPI(WEATHER_API_URL, '/api/weather/forecast');
}

// ============================================
// ALERT SERVICE APIs
// ============================================

export async function fetchAlerts(severity = null, search = null) {
  const params = new URLSearchParams();
  if (severity) params.append('severity', severity);
  if (search) params.append('search', search);
  const queryString = params.toString();
  return await fetchAPI(ALERT_API_URL, `/api/alerts${queryString ? '?' + queryString : ''}`);
}

export async function fetchAlertById(alertId) {
  return await fetchAPI(ALERT_API_URL, `/api/alerts/${alertId}`);
}

export async function fetchAlertsBySeverity(level) {
  return await fetchAPI(ALERT_API_URL, `/api/alerts/severity/${level}`);
}

// ============================================
// ADVISORY SERVICE APIs
// ============================================

export async function fetchAdvisoryPresets(audience = null, city = null) {
  const params = new URLSearchParams();
  if (audience) params.append('audience', audience);
  if (city) params.append('city', city);
  const queryString = params.toString();
  return await fetchAPI(ADVISORY_API_URL, `/api/advisory/presets${queryString ? '?' + queryString : ''}`);
}

export async function generateAdvisory(city, audience, temp, severity) {
  const params = new URLSearchParams({ city, audience });
  if (temp) params.append('temp', temp);
  if (severity) params.append('severity', severity);
  return await fetchAPI(ADVISORY_API_URL, `/api/advisory/generate?${params.toString()}`);
}

// ============================================
// ANALYTICS SERVICE APIs
// ============================================

export async function fetchDashboardStats() {
  return await fetchAPI(ANALYTICS_API_URL, '/api/analytics/dashboard');
}

export async function fetchAnalyticsTrends() {
  return await fetchAPI(ANALYTICS_API_URL, '/api/analytics/trends');
}

export async function fetchReports(type = null) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  const queryString = params.toString();
  return await fetchAPI(ANALYTICS_API_URL, `/api/analytics/reports${queryString ? '?' + queryString : ''}`);
}

export async function fetchMapData() {
  return await fetchAPI(ANALYTICS_API_URL, '/api/analytics/map-data');
}

// ============================================
// HEALTH CHECK APIs
// ============================================

export async function checkServiceHealth(service) {
  const endpointObj = {
    weather: { url: WEATHER_API_URL, path: '/api/weather/health' },
    alerts: { url: ALERT_API_URL, path: '/api/alerts/health' },
    advisory: { url: ADVISORY_API_URL, path: '/api/advisory/health' },
    analytics: { url: ANALYTICS_API_URL, path: '/api/analytics/health' },
    gateway: { url: API_BASE_URL, path: '/gateway/health' },
  };
  const target = endpointObj[service] || endpointObj.gateway;
  return await fetchAPI(target.url, target.path);
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
