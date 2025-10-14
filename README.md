# 🌐 HelaChat

> A React Native-based messaging app with a modern UI — user registration, profile-image selection (upload or avatar picker), and theme customization. Built with Expo, NativeWind/Tailwind, React Navigation, and a Java (Servlet + Hibernate) backend. Work in progress.

[![Repo Size](https://img.shields.io/github/repo-size/Achintha-999/helachat)](https://github.com/Achintha-999/helachat)
[![Last Commit](https://img.shields.io/github/last-commit/Achintha-999/helachat)](https://github.com/Achintha-999/helachat/commits/main)
[![Languages](https://img.shields.io/github/languages/top/Achintha-999/helachat)](https://github.com/Achintha-999/helachat)
[![License](https://img.shields.io/github/license/Achintha-999/helachat)](https://github.com/Achintha-999/helachat/blob/main/LICENSE)

---

Table of contents
- [About](#about)
- [Status & Features](#status--features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Quickstart](#quickstart)
  - [Frontend (Expo) — run locally](#frontend-expo---run-locally)
  - [Backend (Java + Hibernate) — run locally](#backend-java--hibernate---run-locally)
- [Configuration / Environment](#configuration--environment)
- [Ngrok — exposing backend for mobile testing](#ngrok---exposing-backend-for-mobile-testing)
- [Hibernate configuration example](#hibernate-configuration-example)
- [Project structure (high-level)](#project-structure-high-level)
- [How it works (overview)](#how-it-works-overview)
- [Icons & assets](#icons--assets)
- [Testing](#testing)
- [Contributing](#contributing)
- [Roadmap / Future enhancements](#roadmap--future-enhancements)
- [License & contact](#license--contact)

---

## About

HelaChat is a mobile-first, real-time messaging client (React Native + Expo) that connects to a Java servlet/Hibernate backend for user management, message persistence and real-time events. This repo contains the mobile client and supports integration with a separately-hosted backend service.

---

## Status & Features

Current status: In development

Key features
- User registration & authentication
- Profile image selection (upload or avatar picker)
- Theme customization (light/dark)
- Conversations list and single-chat UI
- Real-time messaging via WebSocket / socket server
- Message persistence (backed by relational DB via Hibernate)

---

## Tech stack

- Frontend: Expo / React Native, TypeScript, React Navigation, NativeWind (Tailwind), AsyncStorage
- Backend: Java Servlets, Hibernate ORM (MySQL/Postgres), WebSocket (for real-time)
- Dev tooling: Ngrok (optional), Expo CLI

Languages in repo (approx.): TypeScript, Java, Other

---

## Requirements

- Node.js (v14+ recommended) and npm/yarn
- Expo CLI (optional but recommended): npm i -g expo-cli
- Java JDK 8+ (backend)
- Tomcat / GlassFish (or any Servlet container)
- MySQL or PostgreSQL (database)
- Ngrok (optional — for remote device testing)

---

## Quickstart

These quick steps get the mobile client and backend running locally for development.

### Frontend (Expo) — run locally

1. Clone the repo and install:
   ```bash
   git clone https://github.com/Achintha-999/helachat.git
   cd helachat
   npm install
   # or
   yarn install
   ```

2. Configure environment (see [Configuration / Environment](#configuration--environment)).

3. Start Expo:
   ```bash
   expo start
   ```
   - Scan the QR code with Expo Go on your physical device, or open the iOS/Android simulator.

Notes
- The mobile client expects backend REST & WebSocket endpoints. Set EXPO_PUBLIC_API_URL and EXPO_PUBLIC_WS_URL appropriately (see Configuration).

### Backend (Java + Hibernate) — run locally

1. Open the backend module (if in this repo or separate repo) with your IDE (IntelliJ / Eclipse).

2. Ensure database is running and schema exists (create DB helachat).

3. Update `hibernate.cfg.xml` (see example below).

4. Build and deploy the WAR to your Servlet container (Tomcat/GlassFish) or run with your preferred launcher.

5. Confirm REST endpoints are reachable (e.g., http://localhost:8080/helachat/api/...).

---

## Configuration / Environment

The frontend (Expo) expects environment variables prefixed with EXPO_PUBLIC_ for access in app code.

Example .env (frontend root):
```text
EXPO_PUBLIC_API_URL=https://your-backend.example.com/api
EXPO_PUBLIC_WS_URL=wss://your-backend.example.com/ws
EXPO_PUBLIC_APP_NAME=HelaChat
```

How to use them in code (example):
```ts
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/api';
const WS_URL = process.env.EXPO_PUBLIC_WS_URL ?? 'ws://localhost:8080/ws';
```

Backend: update your `hibernate.cfg.xml` with DB credentials and connection string (example below).

---

## Ngrok — exposing backend for mobile testing

When testing on a physical device, your local backend must be reachable from the device. Ngrok is useful.

1. Install ngrok (global):
```bash
npm install -g ngrok
```

2. Start ngrok pointing to your backend server port (e.g., 8080):
```bash
ngrok http 8080
```

3. Ngrok prints a public HTTPS URL (e.g., https://1234abcd.ngrok.io). Use that URL to set EXPO_PUBLIC_API_URL and EXPO_PUBLIC_WS_URL (note WS may use wss://).

Example .env entries:
```text
EXPO_PUBLIC_API_URL=https://1234abcd.ngrok.io/helachat/api
EXPO_PUBLIC_WS_URL=wss://1234abcd.ngrok.io/helachat/ws
```

Restart the Expo app after changing env variables.

---

## Hibernate configuration example

Place this snippet into your backend's `hibernate.cfg.xml` and update values accordingly:

```xml
<?xml version='1.0' encoding='utf-8'?>
<hibernate-configuration>
  <session-factory>
    <!-- Database connection settings -->
    <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
    <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/helachat?serverTimezone=UTC</property>
    <property name="hibernate.connection.username">your_username</property>
    <property name="hibernate.connection.password">your_password</property>

    <!-- SQL dialect -->
    <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>

    <!-- Show SQL for debugging -->
    <property name="hibernate.show_sql">true</property>

    <!-- Auto schema update (dev only) -->
    <property name="hibernate.hbm2ddl.auto">update</property>

    <!-- Mapped classes -->
    <!-- <mapping class="com.yourcompany.helachat.model.User"/> -->
  </session-factory>
</hibernate-configuration>
```

Important: for production, use `validate` or manage schema migrations explicitly — do NOT use `update` in production.

---

## Project structure (high-level)

A concise view of the repo layout (adjust if your structure differs):

```
HelaChat/
├── App.tsx                # Expo entry point (frontend)
├── assets/                # images, icons, splash
├── src/                   # frontend source (screens, components, api, socket)
├── backend/               # (optional) Java servlet/Hibernate backend
│   ├── src/
│   └── hibernate.cfg.xml
├── app.json               # Expo config
├── package.json
└── README.md
```

---

## How it works (overview)

- Frontend:
  - Expo app connects to backend REST API for auth and history.
  - For real-time messaging, the app establishes a WebSocket (or Socket.IO) connection and listens for message events.
  - Local persistence uses AsyncStorage for caching user/session data.

- Backend:
  - Java servlets expose REST endpoints for authentication, user/profile management and message history.
  - A WebSocket server (or a socket endpoint) handles real-time message broadcasting and room management.
  - Hibernate maps entities (User, Chat, Message) to the relational DB.

---



## Testing

- Frontend: run unit tests or e2e (if present). Example:
```bash
npm run test
```

- Backend: run JUnit or integration tests via your build tool (Maven/Gradle).

Add CI later to run tests on PRs.

---

## Contributing

Thanks for wanting to contribute! Recommended workflow:
1. Fork the repo
2. Create a branch: `feature/<name>` or `fix/<issue>`
3. Run lint & tests locally
4. Open a Pull Request with a clear description and a test plan

See `CONTRIBUTING.md` (if present) for more.

---

## Roadmap / Future enhancements

- Group chats
- Media sharing (images, video)
- Push notifications
- Improved offline support and message queueing
- Dark mode polish and theme persistence

---

## License & contact

Specify the project license in LICENSE (e.g., MIT).  
Maintainer: Achintha-999 — https://github.com/Achintha-999

---

