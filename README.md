# DocuChat 💬

A full-stack real-time chat application with JWT authentication, real-time messaging via Socket.IO, and secure user management.

## Features

- 🔐 **Authentication** - Email/Password & Google OAuth2
- 💬 **Real-Time Chat** - WebSocket powered messaging with Socket.IO
- 👥 **Multi-Chat Support** - Create and manage multiple conversations
- 🔒 **Secure** - JWT tokens, bcrypt hashing, secure HttpOnly cookies
- 📱 **Modern Stack** - React + Vite frontend, Node.js + Express backend

## Tech Stack

**Backend:** Node.js | Express.js | MongoDB | Socket.IO | JWT | Bcrypt  
**Frontend:** React 19 | Vite | ESLint

## Quick Start

### Prerequisites

- Node.js v14+
- MongoDB (local or Atlas cloud)

### Backend Setup

```bash
cd docu-chat-server
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev
```

Server runs on `http://localhost:8000`

### Frontend Setup

```bash
cd docuchat-client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Environment Variables

Create `.env` in `docu-chat-server/`:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/docuchat
JWT_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

## API Endpoints

### Auth

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Chats

- `POST /api/chats` - Create chat
- `GET /api/chats` - Get all chats
- `GET /api/chats/:id` - Get chat
- `PUT /api/chats/:id` - Rename chat
- `DELETE /api/chats/:id` - Delete chat

### Messages

- `POST /api/messages` - Send message
- `GET /api/messages/:chatId` - Get messages
- `PUT /api/messages/:id` - Edit message
- `DELETE /api/messages/:id` - Delete message

## WebSocket Events

```javascript
// Connect with token
io("http://localhost:8000", { auth: { token } });

// Join chat room
socket.emit("join_chat", chatId);

// Send message
socket.emit("send_message", { chatId, content });

// Receive message
socket.on("receive_message", (message) => {});
```

## Development

**Backend**

```bash
npm run dev   # Start with auto-reload
npm test      # Run tests
```

**Frontend**

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint check
```

## Project Structure

```
DocuChat/
├── docu-chat-server/
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, error handling
│   │   ├── socket/         # WebSocket config
│   │   └── config/         # Database, logger
│   └── package.json
│
└── docuchat-client/
    ├── src/
    │   ├── components/     # React components
    │   └── App.jsx
    └── package.json
```

## Security

✅ Bcrypt password hashing  
✅ JWT token authentication  
✅ Secure HttpOnly cookies  
✅ CORS protection  
✅ Security headers (Helmet.js)  
✅ Input validation

## License

ISC License

---

**Connect in real-time, securely.** 🚀
