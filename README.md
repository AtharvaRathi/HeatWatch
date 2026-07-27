# HeatWatch (KJS-CES-01)

HeatWatch is a production-grade, full-stack Climate Intelligence Web Application for heatwave monitoring, prediction, and early warning.

## Prerequisites
- Docker and Docker Compose
- OpenWeatherMap API Key
- SendGrid API Key (for email alerts)
- VAPID Keys (for Web Push)

## Quick Start
1. Clone the repository
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your OpenWeatherMap API Key and other configuration.
4. Start the application using Docker Compose:
   ```bash
   make dev
   ```
5. Run database migrations:
   ```bash
   make migrate
   ```
6. Seed historical data and default users:
   ```bash
   make seed
   ```
7. Train the Machine Learning model:
   ```bash
   make train
   ```

## Default Credentials
- Admin: `admin@heatwatch.com` / `Admin@1234`
- User: `user@heatwatch.com` / `User@1234`

## Accessing the Application
- Frontend: [http://localhost:5173](http://localhost:5173)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Testing
### Postman
Import `postman/KJS-CES-01.postman_collection.json` into Postman to run API test cases.

### JMeter
Run `jmeter/AlertBroadcast_LoadTest.jmx` in JMeter to load test the alert broadcasting endpoint.

## Architecture
- Frontend: React 18, Vite, Tailwind CSS, Zustand, Recharts, Leaflet
- Backend: FastAPI, PostgreSQL, Redis, Celery
- ML: scikit-learn Random Forest
