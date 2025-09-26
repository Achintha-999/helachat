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
> Now includes backend integration with Hibernate ORM and SQL for real-time messaging!  
> The backend can be exposed via ngrok for local development and testing.

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- Smartphone or emulator (iOS/Android)
- (Optional) [VS Code](https://code.visualstudio.com/) for development
- [ngrok](https://ngrok.com/) or NGROCK for exposing backend server
- **Java Backend:** Hibernate ORM, MySQL database

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

# 5️⃣ Start the backend server (see backend directory for instructions)

# 6️⃣ Expose backend with ngrok
ngrok http 8080
# This will give you a public URL (e.g., https://abcd1234.ngrok.io)

# 7️⃣ Configure the app to use your backend URL
# Change the backend/API endpoint in the app config to point to your ngrok URL.
# Example: In your app's config or .env file, set:
# API_URL=https://abcd1234.ngrok.io
```

---

## 🏗️ Backend Integration (Java, Hibernate, MySQL)

The backend uses Java with Hibernate ORM for mapping entities to SQL tables.  
**Entities mapped:** User, Chat, FriendList.

### Hibernate Configuration Example

Your Hibernate configuration (typically in `hibernate.cfg.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC 
    "-//Hibernate/Hibernate Configuration DTD 3.0//EN" 
    "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/chat_app?useSSL=false&amp;allowPublicKeyRetrieval=true</property>
        <property name="hibernate.connection.username">YOUR_SQL_USERNAME</property>
        <property name="hibernate.connection.password">YOUR_SQL_PASSWORD</property>
        <property name="hibernate.hbm2ddl.auto">update</property>
        <property name="hibernate.show_sql">true</property>
        <mapping class = "entity.User"/>
        <mapping class = "entity.Chat"/>
        <mapping class = "entity.FriendList"/>
    </session-factory>
</hibernate-configuration>
```

**Replace** `YOUR_SQL_USERNAME` and `YOUR_SQL_PASSWORD` with your actual MySQL credentials.  
> **Security Tip:** For production and team development, use environment variables or a secure config file.  
> **Do NOT commit actual credentials to public repositories.**

### How Hibernate Works

- Maps Java classes (`User`, `Chat`, `FriendList`) to SQL tables.
- Handles database CRUD operations transparently.
- SQL credentials are required for connecting to the MySQL database.

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
   - Real-time chat powered by backend (Java/Hibernate/MySQL).
   - (Feature in progress) More messaging features coming soon!

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
- **Java + Hibernate (Backend)**
- **MySQL**
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
