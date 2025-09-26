<h1 align="center">🚀 React Native Messenger</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Expo-%5E49.0.0-blue?logo=expo" alt="Expo Version">
  <img src="https://img.shields.io/badge/TypeScript-%5E5.3.3-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-%5E3.4.1-blue?logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow?logo=githubactions" alt="Project Status">
</p>
<p align="center">
  <img width="220" src="assets/logo.png" alt="App Logo">
</p>

---

## 💬 About the Project

**React Native Messenger** is a modern cross-platform messaging app built with [Expo](https://expo.dev/), [React Native](https://reactnative.dev/), [TailwindCSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/).

> 🚧 **This project is actively under development.**
> Now includes backend integration for real-time messaging!  
> The backend uses a server that can be exposed via ngrok/NGROCK for testing and development.

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- Smartphone or emulator (iOS/Android)
- (Optional) [VS Code](https://code.visualstudio.com/) for development
- **(New)** [ngrok](https://ngrok.com/) or NGROCK for exposing backend server
- **(New)** Hibernate & SQL (if using Java backend)

---

## ⚡ Installation & Running Locally

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Achintha-999/react-native-messenger.git
cd react-native-messenger

# 2️⃣ Install dependencies
yarn install
# or
npm install

# 3️⃣ Start Expo development server
yarn start
# or
npm start

# 4️⃣ Run the app on your device or emulator
# - Scan the QR code in Expo Go (iOS/Android)
# - Or launch on your simulator/emulator from the Expo dashboard

# 5️⃣ (New) Start the backend server (see backend directory for instructions)

# 6️⃣ (New) Expose backend with ngrok/NGROCK
ngrok http 8080
# This will give you a public URL (e.g., https://abcd1234.ngrok.io)

# 7️⃣ (New) Configure the app to use your backend URL
# Change the backend/API endpoint in the app config to point to your ngrok URL.
# Example: In your app's config or .env file, set:
# API_URL=https://abcd1234.ngrok.io
```

---

## 🏗️ Backend Integration & Configuration

- The backend server handles authentication, messaging, and data storage.
- For local development, expose your backend using ngrok/NGROCK (`ngrok http 8080`).
- Update your API URL in the project to use the public ngrok URL.
- **Note:** Backend is still being developed and may have breaking changes.

### Hibernate Mapping & SQL Setup

If your backend uses Java with Hibernate ORM for database mapping:

- Hibernate is used to map Java objects to SQL tables for user, messages, and other entities.
- The database connection (SQL username and password) must be configured in your backend settings file (`application.properties`, `.env`, or similar).

**Example `application.properties` configuration:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/messengerdb
spring.datasource.username=YOUR_SQL_USERNAME
spring.datasource.password=YOUR_SQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**How Hibernate works:**
- Maps your Java entities (e.g., User, Message) to database tables.
- Handles CRUD operations automatically.
- SQL credentials are required to connect to your MySQL/PostgreSQL/etc. database.

> ⚠️ **Do not commit sensitive information (real SQL username/password) to the repository. Use environment variables or a `.env` file for local development.**

---

## 🎨 How the App Works

1. **Splash Screen:** Loads with smooth animation and branding.
2. **Sign Up Flow:**  
   - Enter your name, select your country, and phone number.  
   - Pick a profile image (upload or avatar).
3. **Theme Selection:**  
   - Change between light and dark mode.
4. **Contacts:**  
   - Allow access to contacts to discover friends.
5. **Home & Messaging:**  
   - Messaging interface connects to backend (via ngrok URL).
   - (Feature in progress) Real-time chat coming soon!

---

## ✨ Features Preview

- 🌙 **Theme Switch:** Personalize your chat experience.
- 👤 **Profile Setup:** Avatar or upload, you decide.
- 📱 **Contact Sync:** Find friends easily.
- ⚡ **Fast & Responsive:** Built with NativeWind and Expo for performance.
- 🔗 **Backend Integration:** Connects to a live server for messaging.
- 🗄️ **Hibernate ORM Mapping:** Java objects map to SQL tables for robust data management.

---

## 📦 Tech Stack

- **React Native** / **Expo**
- **TypeScript**
- **TailwindCSS** (NativeWind)
- **React Navigation**
- **Reanimated**
- **Context API** (for user management)
- **Animated Splash and UI elements**
- **Express (Backend, WIP)**
- **Java + Hibernate (Backend, WIP)**
- **ngrok/NGROCK for local tunneling**

---

## 🚧 Project Status

> ⚠️ **This app is currently in development.**
> Messaging, chat, notifications, and backend features are actively being added!

---

## 📝 License & Contributing

This project does not yet specify a license.  
Want to contribute, suggest features, or report bugs?  
👉 [Open an issue](https://github.com/Achintha-999/react-native-messenger/issues) or submit a pull request!

---

<p align="center">
  <img src="https://img.icons8.com/color/96/000000/chat--v1.png"/>
  <br>
  <b>Messenger built for the future. Start the conversation TODAY.</b>
</p>

---

<p align="center">
  <a href="https://github.com/Achintha-999/react-native-messenger">
    <img src="https://img.shields.io/github/stars/Achintha-999/react-native-messenger?style=social" alt="GitHub stars">
  </a>
</p>
