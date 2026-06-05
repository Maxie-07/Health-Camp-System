# Health Camp Application

Monorepo for managing health camp operations: beneficiary registration, visits, stock tracking, reporting, and offline mobile sync.

## Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 21, Spring Boot 4.x, PostgreSQL 18, Redis 7.2, Flyway |
| Web | Angular 20 |
| Mobile | React Native 0.73.6 |
| Infra | Docker Compose |

## Prerequisites

- JDK 21+
- Maven 3.9+
- Node.js 20.19+ (for Angular 20)
- Docker 25+

## Quick Start

```bash
# Copy environment template
cp docker/.env.example docker/.env

# Start all services
docker compose up --build
```

| Service | URL |
|---------|-----|
| Backend API | http://localhost:5000 |
| Swagger UI | http://localhost:5000/swagger-ui.html |
| Web (nginx) | http://localhost:8081 |
| PostgreSQL | localhost:5433 |
| Redis | localhost:6380 |

### Default admin credentials

- Username: `admin`
- Password: `admin123`

## Local development

### Backend only

```bash
cd backend
docker compose up -d   # postgres + redis
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Web

```bash
cd web
npm install
npm start
```

### Mobile

```bash
cd mobile
npm install
npx react-native start
# In another terminal:
npx react-native run-android
```

## Project structure

```
backend/   Spring Boot REST API
web/       Angular admin dashboard
mobile/    React Native field app
docker/    Dockerfiles and nginx config
docs/      API docs and guides
```

## API documentation

See [docs/api/openapi.yaml](docs/api/openapi.yaml) or Swagger UI when the backend is running.
