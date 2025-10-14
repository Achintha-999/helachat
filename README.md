# 🌐 HelaChat - Real-Time Chat Application

![HelaChat Logo](assets/logo.png)

HelaChat is a modern, real-time chat application built with **React Native** for the frontend and **Java Servlets** with **Hibernate** for the backend. It provides seamless communication between users with features like real-time messaging, user authentication, and profile management.

---

## 🚀 Features

- **User Authentication**: Secure login and signup functionality.
- **Real-Time Messaging**: Instant message delivery using WebSocket.
- **Chat Management**: View chat lists and individual conversations.
- **Profile Management**: Update user information and preferences.
- **Responsive Design**: Optimized for both Android and iOS devices.

---

## 🛠️ Requirements

### **Frontend**
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI**: Install using `npm install -g expo-cli`

### **Backend**
- **Java JDK** (v8 or higher)
- **Apache Tomcat** or **GlassFish** server
- **MySQL** or **PostgreSQL** database
- **Hibernate** ORM

### **Other Tools**
- **Ngrok**: For exposing the backend to the internet.

---

## 📂 Project Structure
HelaChat/ ├── .env # Environment variables ├── App.tsx # Main entry point for the React Native app ├── assets/ # Images and icons ├── src/ # Frontend source code ├── HelaChatBackend/ # Backend source code │ ├── src/ # Java backend source files │ ├── build/ # Compiled backend files │ ├── web/ # Web-related backend files ├── package.json # Frontend dependencies ├── tailwind.config.js # NativeWind configuration ├── tsconfig.json # TypeScript configuration └── README.md # Project documentation


---

## 🌐 How It Works

### **Frontend**
1. The mobile app is built using **React Native**.
2. **NativeWind** is used for consistent and responsive styling.
3. The app communicates with the backend via:
   - **WebSocket** for real-time messaging.
   - **Fetch API** for RESTful API calls (e.g., login, fetching chat history).

### **Backend**
1. The backend is built with **Java Servlets** for handling API requests.
2. **Hibernate** maps Java objects (e.g., `User`, `Chat`) to relational database tables.
3. **MySQL/PostgreSQL** stores user data, chat sessions, and messages.

---

## 🔗 Connecting Ngrok URL

To expose your backend to the internet using **Ngrok**:

1. Install Ngrok:
   ```bash
   npm install -g ngrok
   ```

  2.  Start Ngrok on your backend port (e.g., 8080):
     ngrok http 8080

3. Copy the generated public URL (e.g., https://1234abcd.ngrok.io).

4. Update the .env file in the project:
   EXPO_PUBLIC_APP_URL=https://1234abcd.ngrok.io
EXPO_PUBLIC_WS_URL=1234abcd.ngrok.io

5. Restart the frontend to apply the changes:
   expo start

   🔗 Mapping Hibernate Backend with Database
To configure Hibernate for your database:

1. Open the hibernate.cfg.xml file in the backend source directory (HelaChatBackend/src).

2. Update the database connection details:

   <hibernate-configuration>
    <session-factory>
        <!-- Database connection settings -->
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/helachat</property>
        <property name="hibernate.connection.username">your-username</property>
        <property name="hibernate.connection.password">your-password</property>

        <!-- JDBC driver -->
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>

        <!-- Dialect -->
        <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>
    </session-factory>
</hibernate-configuration>

3. Ensure the database (helachat) exists in your MySQL/PostgreSQL instance.
4. Restart the backend server to apply the changes.

   📱 Running the Project
Frontend

1. Install dependencies:
   npm install

2. Start the development server:
   expo start

   3. Scan the QR code with the Expo Go app or run the app on an emulator.
  
   Backend
Build and deploy the backend on Tomcat or GlassFish.
Ensure the database is running and accessible.
Start the backend server.
🎯 Future Enhancements
Group Chats: Add support for group conversations.
Media Sharing: Enable sharing of images, videos, and documents.
Push Notifications: Implement notifications for new messages.
Dark Mode: Add a dark theme for better user experience.
      


