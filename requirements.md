# AuraMeet Requirements

## Project Overview
AuraMeet is a web-based video and audio calling application allowing users to connect in real-time. The application will be built using the MERN stack and allows for 1-on-1 calls.

## Core Features

### 1. User Authentication
- **Sign Up**: Users can create an account with email and password.
- **Login**: Secure login with JWT (JSON Web Tokens).
- **Profile**: Basic user profile (Name, Avatar).

### 2. Communication (Video/Audio)
- **1-on-1 Calls**: Users can initiate video or audio-only calls with another user.
- **Incoming Call Notification**: Real-time alert when receiving a call.
- **Call Controls**: 
  - Mute/Unmute Audio
  - Turn Video On/Off
  - End Call
- **Screen Sharing** (Optional/Phase 2).

### 3. User Interface
- **Dashboard**: Contact list or "Call by ID" feature.
- **Responsive Design**: Works on desktop and mobile browsers.
- **Modern Aesthetics**: Clean, dark-mode friendly UI with glassmorphism elements.

## Technical Requirements

### Stack (MERN)
- **Frontend**: React.js (Vite), CSS (Modules or Tailwind - user preference needed, defaulting to CSS Modules/Styled Components for custom look).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Store users, call logs - optional).
- **Real-time Communication**: 
  - **WebRTC**: For peer-to-peer media streaming.
  - **Socket.io**: For signaling (handshakes, joining rooms).
  
### Hosting/Deployment
- **Frontend**: Vercel or Netlify.
- **Backend**: Render, Railway, or Heroku.
- **Database**: MongoDB Atlas.

## Non-Functional Requirements
- **Low Latency**: Optimized signaling and peer connections.
- **Security**: Secure handling of passwords (hashing) and protected routes.
- **Scalability**: Basic structure to support more users.
