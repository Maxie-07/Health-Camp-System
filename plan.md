# Health Camp Application - Technical Specification

## Table of Contents
1. [Development Environment Setup](#1-development-environment-setup)
2. [Project Structure](#2-project-structure)
3. [Backend Technical Details](#3-backend-technical-details)
4. [Core Code Templates](#4-core-code-templates)
5. [Docker Configuration](#5-docker-configuration)
6. [Environment Variables](#6-environment-variables)
7. [Deployment Checklist](#7-deployment-checklist)
8. [Quick Start Commands](#8-quick-start-commands)

---

## 1. DEVELOPMENT ENVIRONMENT SETUP

### 1.1 Required Software (with versions)

```yaml
Backend Development:
  - JDK: OpenJDK 21 LTS (or Oracle JDK 21)
  - Maven: 3.9.6+
  - Spring Boot: 4.x
  - PostgreSQL: 18
  - Redis: 7.2.5

Mobile Development:
  - Node.js: 20.11+ LTS
  - React Native: 0.73.6

Web Frontend Development:
  - Node.js: 20.11+ LTS
  - Angular CLI: 20
  
CI/CD (Optional but recommended):
  - Docker: 25.0+
  - Kubernetes: 1.29+ (for production)
  - Jenkins / GitHub Actions



healthcamp-system/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/healthcamp/
│   │   │   │   ├── HealthCampApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── JwtConfig.java
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   ├── RedisConfig.java
│   │   │   │   │   ├── SwaggerConfig.java
│   │   │   │   │   └── AsyncConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── BeneficiaryController.java
│   │   │   │   │   ├── VisitController.java
│   │   │   │   │   ├── StockController.java
│   │   │   │   │   ├── ReportController.java
│   │   │   │   │   └── SyncController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── BeneficiaryService.java
│   │   │   │   │   ├── VisitService.java
│   │   │   │   │   ├── StockService.java
│   │   │   │   │   ├── ReportService.java
│   │   │   │   │   ├── SyncService.java
│   │   │   │   │   ├── SmsService.java
│   │   │   │   │   └── impl/
│   │   │   │   ├── repository/
│   │   │   │   │   ├── BeneficiaryRepository.java
│   │   │   │   │   ├── VisitRepository.java
│   │   │   │   │   ├── StockRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── entity/
│   │   │   │   │   │   ├── Beneficiary.java
│   │   │   │   │   │   ├── Visit.java
│   │   │   │   │   │   ├── StockItem.java
│   │   │   │   │   │   ├── User.java
│   │   │   │   │   │   └── AuditLog.java
│   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── request/
│   │   │   │   │   │   └── response/
│   │   │   │   │   └── enums/
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── JwtUtil.java
│   │   │   │   │   └── CustomUserDetailsService.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   └── CustomExceptions.java
│   │   │   │   └── util/
│   │   │   │       ├── QRCodeGenerator.java
│   │   │   │       └── DateUtil.java
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       ├── application-prod.yml
│   │   │       ├── db/migration/
│   │   │       │   ├── V1__init_schema.sql
│   │   │       │   ├── V2__add_indexes.sql
│   │   │       │   └── V3__stock_triggers.sql
│   │   │       └── logback-spring.xml
│   │   └── test/
│   │       └── java/com/healthcamp/
│   │           ├── unit/
│   │           └── integration/
│   ├── pom.xml
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QRScanner.tsx
│   │   │   ├── BeneficiaryForm.tsx
│   │   │   ├── VisitForm.tsx
│   │   │   ├── StockAlert.tsx
│   │   │   ├── OfflineIndicator.tsx
│   │   │   └── SyncStatus.tsx
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── VisitScreen.tsx
│   │   │   ├── HistoryScreen.tsx
│   │   │   ├── StockScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── navigation/
│   │   │   ├── AppNavigator.tsx
│   │   │   ├── AuthStack.tsx
│   │   │   └── MainTabNavigator.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── syncService.ts
│   │   │   ├── storageService.ts
│   │   │   └── notificationService.ts
│   │   ├── models/
│   │   │   ├── Beneficiary.ts
│   │   │   ├── Visit.ts
│   │   │   └── Stock.ts
│   │   ├── database/
│   │   │   ├── schema.ts
│   │   │   ├── migrations.ts
│   │   │   └── syncEngine.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useOfflineSync.ts
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   └── App.tsx
│   ├── android/
│   ├── ios/
│   ├── package.json
│   ├── metro.config.js
│   └── babel.config.js
│
├── web/
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── beneficiary/
│   │   │   │   ├── visits/
│   │   │   │   ├── stock/
│   │   │   │   ├── reports/
│   │   │   │   └── admin/
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   ├── models/
│   │   │   │   └── guards/
│   │   │   ├── core/
│   │   │   │   ├── interceptors/
│   │   │   │   ├── store/
│   │   │   │   └── constants/
│   │   │   └── app-routing.module.ts
│   │   ├── assets/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── docker/
│   ├── backend.Dockerfile
│   ├── web.Dockerfile
│   ├── nginx.conf
│   └── .env.example
│
└── docs/
    ├── api/
    │   └── openapi.yaml
    ├── deployment/
    ├── user-manual/
    └── technical/