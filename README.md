# Helachat

Helachat is a React Native chat application built with Expo and TypeScript. It provides a mobile client for real-time chat using a socket-based backend. This repository contains the Expo app (client) and the source organized under src/ including screens, components, API helpers and socket code.

## Table of contents
- Project overview
- Features
- Tech stack
- Requirements
- Architecture & How it works
- Getting started (local development)
- Configuration
- Running the app
- Usage examples
- Development workflow
- Contributing
- License

## Project overview
Helachat is a lightweight mobile chat client built with Expo and React Native (TypeScript). It connects to a socket-based backend (not included in this repository unless you have a separate server) to exchange messages in real time. The app includes screens for authentication, chat lists, and chat rooms, and utilities for managing API calls and socket connections.

## Features
- Real-time messaging via sockets (client-side socket code in src/socket)
- Screens and components scaffolded under src/screens and src/components
- Async storage helpers for local persistence
- Navigation using React Navigation

## Tech stack
- Expo (React Native)
- React Native + TypeScript
- React Navigation
- @react-native-async-storage/async-storage
- Socket client implementation (see src/socket)

## Requirements
- Node.js 16+ (recommended)
- npm or yarn
- Expo CLI (optional but recommended): npm install -g expo-cli
- A running chat server endpoint (WebSocket / Socket.IO or equivalent) for real-time messaging

## Architecture & How it works
1. The Expo app (client) provides UI screens and uses a socket client to connect to a chat server.
2. On startup, the app initializes navigation and socket connection logic (src/socket).
3. The user authenticates (if the server requires it) and the client stores the token locally using AsyncStorage.
4. When entering a chat room, the client joins a socket room and emits/receives message events. Messages may also be fetched/sent via REST endpoints defined in src/api.
5. The UI listens for incoming socket events and updates the chat message list in real time.

## Getting started (local development)
1. Clone the repo:
   git clone https://github.com/Achintha-999/helachat.git
   cd helachat

2. Install dependencies:
   npm install
   # or
   yarn install

3. If you use Expo CLI, run:
   expo start

4. Open the project in Expo Go on your phone or an emulator. Use the QR code in the Metro bundler.

Note: The app expects a backend server for real-time functionality. Check src/config or src/api for where the API base URL or socket URL is defined and update it to point to your server.

## Configuration
- Look for a config file or variables that define API_URL / SOCKET_URL. If none exists, create a simple file (e.g., src/config/index.ts) exporting constants:

  export const API_URL = 'https://your-server.example.com';
  export const SOCKET_URL = 'https://your-server.example.com';

- If the project uses environment variables, follow the pattern used in the codebase (eg. react-native-dotenv or .env files).

## Running the app
- Development:
  expo start

- Android emulator / iOS simulator:
  Use Expo CLI to open in simulator or scan QR with Expo Go.

## Usage examples
- Connect socket (example):
  const socket = initSocket(SOCKET_URL, token);
  socket.emit('join-room', { roomId });
  socket.on('message', (msg) => setMessages(prev => [...prev, msg]));

- Send message (example):
  socket.emit('send-message', { roomId, text });

## Development workflow
- Use branches named feature/<name> or fix/<name>
- Run linting and type checks if configured
- Commit with clear messages and open PRs for reviews

## Contributing
- Fork the repository, create a branch, and open a PR with a description of changes.

## License
Specify the project license (e.g., MIT) in LICENSE file.

## Where to go next
- If you want, I can:
  - Inspect the client to auto-fill exact environment keys and commands
  - Add example config file (src/config) and a small .env.example
  - Create a PR that includes README and optional helper files
