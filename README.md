# AI-Driven Heatwave Detection & Early Advisory System

[![React 19](https://img.shields.io/badge/React-19.0.0-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1.1-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED.svg?logo=docker)](https://www.docker.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![Nginx](https://img.shields.io/badge/Nginx-API%20Gateway-009639.svg?logo=nginx)](https://nginx.org/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF.svg?logo=github-actions)](https://github.com/features/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A full-stack climate resilience platform with **Microservices Architecture**, **3-Tier Architecture**, **Monolithic Architecture**, Docker containerization, Nginx API Gateway, and CI/CD pipeline. Combines satellite remote sensing, deep learning models, and automated advisories to mitigate heatwave risks across India.

---

## Table of Contents

- [Architecture Overview](#-architecture-overview)
- [3-Tier Architecture](#-3-tier-architecture)
- [Microservices vs Monolithic](#-microservices-vs-monolithic)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start Guide](#-quick-start-guide)
- [Docker Deployment](#-docker-deployment)
- [API Endpoints](#-api-endpoints)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Key Features](#-key-features)

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                             │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    NGINX API GATEWAY (:8080)                        │
│              Reverse Proxy / Load Balancer / Router                 │
│                                                                      │
│  /api/weather/*  → Weather Service     /api/alerts/*  → Alert Svc   │
│  /api/advisory/* → Advisory Service    /api/analytics/* → Analytics │
│  /*              → React Frontend                                    │
└────┬─────────────────┬──────────────────┬───────────────┬────────────┘
     │                 │                  │               │
     ▼                 ▼                  ▼               ▼
┌──────────┐   ┌──────────┐   ┌───────────────┐   ┌──────────────┐
│ Weather  │   │  Alert   │   │   Advisory    │   │  Analytics   │
│ Service  │   │ Service  │   │   Service     │   │   Service    │
│  :5001   │   │  :5002   │   │    :5003      │   │    :5004     │
└────┬─────┘   └────┬─────┘   └──────┬────────┘   └──────┬───────┘
     │              │                │                    │
     └──────────────┴────────────────┴────────────────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │   MongoDB :27017   │
                    │  (Containerized)   │
                    └────────────────────┘
```

---

## 3-Tier Architecture

| Tier | Technology | Description |
|------|-----------|-------------|
| **Presentation Tier** | React 19 + Vite 8 + Tailwind CSS v4 | Interactive dashboard, GIS heat maps, alert panels |
| **Application Tier** | Node.js + Express.js (Microservices / Monolithic) | REST APIs, business logic, data processing |
| **Data Tier** | MongoDB 7.0 (Containerized) | Persistent storage for weather, alerts, advisories, analytics |

---

## Microservices vs Monolithic

### Microservices Architecture (Default)
```bash
docker-compose up --build
```
- **4 independent services**, each with own Express server, database, and Dockerfile
- Services communicate through the **Nginx API Gateway**
- Each service can be **scaled, deployed, and updated independently**
- Fault isolation: if one service fails, others continue working

### Monolithic Architecture (For Comparison)
```bash
docker-compose -f docker-compose.monolithic.yml up --build
```
- **Single Express server** handling ALL API endpoints
- Single database, single process, tightly coupled
- Simpler to develop but harder to scale
- Single point of failure

### Comparison Table

| Aspect | Microservices | Monolithic |
|--------|--------------|------------|
| **Services** | 4 independent containers | 1 single container |
| **Scaling** | Scale individual services | Scale entire application |
| **Deployment** | Independent per service | Full redeploy required |
| **Fault Tolerance** | Isolated failures | Single point of failure |
| **Database** | Separate DB per service | Single shared database |
| **Complexity** | Higher (networking, orchestration) | Lower (single process) |
| **Docker Containers** | 7 (4 services + frontend + nginx + mongodb) | 4 (server + frontend + nginx + mongodb) |

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB 7.0 (Mongoose ODM) |
| **API Gateway** | Nginx (Reverse Proxy) |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |
| **Visualization** | Recharts, SVG GIS Maps |
| **State Management** | React Context API |

---

## Project Structure

```
HeatwavePrediction/
├── frontend/                              # Presentation Tier (React)
│   ├── src/
│   │   ├── components/                    # Reusable UI components
│   │   ├── pages/                         # Route page views
│   │   ├── services/
│   │   │   └── api.js                     # API client (backend integration)
│   │   ├── data/
│   │   │   └── mockData.js               # Fallback mock data
│   │   ├── context/                       # Theme provider
│   │   └── utils/                         # Utility functions
│   ├── Dockerfile                         # Frontend container
│   ├── .env                               # API base URL config
│   └── package.json
│
├── backend/                               # Application Tier
│   ├── microservices/                     # Microservices Architecture
│   │   ├── weather-service/              # Port 5001
│   │   │   ├── server.js                 # Express server
│   │   │   ├── routes/weatherRoutes.js   # REST endpoints
│   │   │   ├── models/Weather.js         # Mongoose schemas
│   │   │   ├── seed.js                   # Database seeder
│   │   │   ├── Dockerfile                # Container config
│   │   │   └── package.json
│   │   ├── alert-service/                # Port 5002
│   │   ├── advisory-service/             # Port 5003
│   │   └── analytics-service/            # Port 5004
│   │
│   └── monolithic/                        # Monolithic Architecture
│       ├── server.js                      # Single Express server (Port 5000)
│       ├── models.js                      # All models in one file
│       ├── routes/                        # All routes bundled
│       ├── seed.js                        # Single seeder for all data
│       ├── Dockerfile
│       └── package.json
│
├── nginx/                                 # API Gateway
│   ├── nginx.conf                        # Microservices routing config
│   ├── nginx.monolithic.conf             # Monolithic routing config
│   └── Dockerfile
│
├── .github/workflows/
│   └── ci-cd.yml                          # CI/CD Pipeline
│
├── docker-compose.yml                     # Microservices deployment
├── docker-compose.monolithic.yml          # Monolithic deployment
├── .dockerignore
├── .env.example
└── README.md
```

---

## Quick Start Guide

### Prerequisites
- **Docker Desktop** installed and running
- **Node.js** v18+ (for local development only)
- **Git**

### Option 1: Docker (Microservices Mode) — Recommended
```bash
# Clone the repository
git clone https://github.com/your-username/HeatwavePrediction.git
cd HeatwavePrediction

# Start all services with Docker Compose
docker-compose up --build

# Seed the databases (run once)
docker exec heatwave-weather-service node seed.js
docker exec heatwave-alert-service node seed.js
docker exec heatwave-advisory-service node seed.js
docker exec heatwave-analytics-service node seed.js
```
Access the app at: **http://localhost:8080**

### Option 2: Docker (Monolithic Mode)
```bash
# Start monolithic architecture
docker-compose -f docker-compose.monolithic.yml up --build

# Seed the database
docker exec heatwave-monolithic-server node seed.js
```

### Option 3: Local Development (Frontend Only)
```bash
cd frontend
npm install
npm run dev
```
Frontend works standalone with mock data fallback at **http://localhost:5173**

---

## Docker Deployment

### View Running Containers
```bash
docker ps
```

Expected output (Microservices mode):
```
CONTAINER ID   IMAGE                         STATUS    PORTS
xxxx           heatwave-nginx-gateway        Up        0.0.0.0:8080->80/tcp
xxxx           heatwave-weather-service      Up        0.0.0.0:5001->5001/tcp
xxxx           heatwave-alert-service        Up        0.0.0.0:5002->5002/tcp
xxxx           heatwave-advisory-service     Up        0.0.0.0:5003->5003/tcp
xxxx           heatwave-analytics-service    Up        0.0.0.0:5004->5004/tcp
xxxx           heatwave-frontend             Up        0.0.0.0:5173->5173/tcp
xxxx           mongo:7.0                     Up        0.0.0.0:27017->27017/tcp
```

### Stop All Services
```bash
docker-compose down        # Microservices
docker-compose -f docker-compose.monolithic.yml down  # Monolithic
```

---

## API Endpoints

### Weather Service (`:5001`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/health` | Service health check |
| GET | `/api/weather/cities` | All city weather data |
| GET | `/api/weather/cities/:id` | Single city weather |
| GET | `/api/weather/forecast` | Weekly forecast |

### Alert Service (`:5002`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alerts/health` | Service health check |
| GET | `/api/alerts` | All alerts (filterable) |
| GET | `/api/alerts/:id` | Single alert |
| GET | `/api/alerts/severity/:level` | Alerts by severity |

### Advisory Service (`:5003`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/advisory/health` | Service health check |
| GET | `/api/advisory/presets` | Advisory presets |
| GET | `/api/advisory/generate` | Generate AI advisory |

### Analytics Service (`:5004`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/health` | Service health check |
| GET | `/api/analytics/dashboard` | Dashboard statistics |
| GET | `/api/analytics/trends` | Analytics trend data |
| GET | `/api/analytics/reports` | Generated reports |
| GET | `/api/analytics/map-data` | India states map data |

---

## CI/CD Pipeline

The GitHub Actions pipeline runs on every push to `main` and `develop`:

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  🧪 Test    │────▶│  🐳 Build Docker │────▶│  ✅ Validate    │────▶│ 🔗 Integration   │
│  Lint+Unit  │     │  Images (7x)     │     │  Compose Files  │     │  Health Checks   │
└─────────────┘     └──────────────────┘     └─────────────────┘     └──────────────────┘
```

1. **Test**: ESLint + Vitest unit tests
2. **Build**: Docker images for all 7 services (parallel matrix)
3. **Validate**: Docker Compose config validation
4. **Integration**: Health check all services in Docker

---

## Key Features

- 📊 **Executive Dashboard** — Real-time heatwave KPIs
- 🗺️ **Interactive GIS Heat Map** — District-level thermal visualization
- 🌤️ **Weather Monitoring** — Multi-sensor telemetry tracking
- 🔥 **Hotspot Detection** — Urban heat island analysis
- 🚨 **Early Warning System** — Red/Orange/Yellow alert broadcasts
- 🤖 **AI Advisory Generator** — Persona-targeted mitigation strategies
- 📈 **Climate Analytics** — Historical trend analysis
- 📄 **Disaster Reports** — Exportable PDF/CSV summaries

---

## License

This project is licensed under the **MIT License**.