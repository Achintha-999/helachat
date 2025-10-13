# Helachat

[![Repo Size](https://img.shields.io/github/repo-size/Achintha-999/helachat)](https://github.com/Achintha-999/helachat)
[![Last Commit](https://img.shields.io/github/last-commit/Achintha-999/helachat)](https://github.com/Achintha-999/helachat/commits/main)
[![License](https://img.shields.io/github/license/Achintha-999/helachat)](https://github.com/Achintha-999/helachat/blob/main/LICENSE)

Helachat is a React Native chat application built with Expo and TypeScript. It provides a mobile client for real-time chat using a socket-based backend.

## Table of contents
- Project overview
- Icons
- Getting started
- Configuration
- Running the app
- Contributing
- License

## Project overview
Helachat is a lightweight mobile chat client built with Expo and React Native (TypeScript). It connects to a socket-based backend to exchange messages in real time. The app includes screens for authentication, chat lists, and chat rooms.

## Icons
The app uses an Expo app icon and platform icons. Place your icon image files in assets/icons/ using the filenames and sizes below. The repository contains placeholders and a README in assets/icons/ describing required files.

Recommended files:
- assets/icons/icon-1024.png — 1024x1024 (primary app icon used by Expo)
- assets/icons/icon-512.png — 512x512 (optional)
- assets/icons/icon-192.png — 192x192 (web / favicon fallback)
- assets/icons/ios/Icon-App-1024.png — 1024x1024 (iOS App Store)
- assets/icons/android/ic_launcher.png — 512x512 (Android launcher)

After adding icons, ensure app.json refers to "assets/icons/icon-1024.png" (or the path you choose).

## Getting started
1. Clone the repo:
   git clone https://github.com/Achintha-999/helachat.git
   cd helachat

2. Install dependencies:
   npm install
   # or
   yarn install

3. Start Expo:
   expo start

4. Update src/config/index.ts with your backend API / socket URLs.

## Configuration
See src/config/index.ts — it exports API_URL and SOCKET_URL. For Expo, app.json contains the app icon path; update it if you stored the icons elsewhere.

## Running the app
- Development:
  expo start

- Android emulator / iOS simulator:
  Use Expo CLI to open in simulator or scan the QR code with Expo Go.

## Contributing
Please read CONTRIBUTING.md for the contribution workflow and PR template.

## License
(Replace with your chosen license, e.g., MIT)  
