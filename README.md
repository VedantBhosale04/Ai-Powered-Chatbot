# AI Powered Chatbot

A modern, full-stack AI chatbot built with **React + Vite** (frontend) and **Express.js** (backend) that talks to Google Gemini 1.5 Flash. Features clean UI, image attachment support, and persistent chat history.

## 🚀 Features

- **React + Vite** frontend with plain CSS
- **Express.js** backend proxy for secure API key management
- Clean, responsive chat UI with message bubbles
- Image attachment (inlineData) support for Gemini multi-modal
- Typing indicator while generating
- Error handling and scroll anchoring
- Chat history persistence (localStorage)
- Concurrent dev mode (frontend + backend)

## 📋 Requirements

- Node.js 18+ (for global fetch support)
- Google Gemini API key

## 🔑 Get a Google Gemini API Key

1. Go to https://aistudio.google.com/
2. Sign in with your Google account
3. Click "Get API key" or navigate to "API keys" in the sidebar
4. Create a new API key and copy it
5. The app uses the `gemini-1.5-flash` model

## 🛠️ Setup

### 1. Install dependencies

```bash
cd "/c/Users/PUSHKAR/Desktop/AI Powered Chatbot"
npm run install:all
```

This installs root deps + frontend deps + backend deps.

### 2. Configure environment variables

Create `backend/.env` from the example:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and add your API key:

```
GEMINI_API_KEY=your-actual-gemini-api-key-here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Run in development mode

```bash
npm run dev
```

This starts both:
- Backend on http://localhost:5000
- Frontend on http://localhost:5173

Open http://localhost:5173 in your browser.

## 📁 Project Structure

```
.
├── backend/
│   ├── server.js          # Express API server
│   ├── package.json       # Backend dependencies
│   ├── .env.example       # Environment template
│   └── .env               # Your secrets (git-ignored)
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # API utilities
│   │   ├── App.jsx        # Main app
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets (images, icons)
│   ├── index.html         # HTML shell
│   ├── vite.config.js     # Vite config with proxy
│   └── package.json       # Frontend dependencies
├── package.json           # Root workspace scripts
└── README.md
```

## 🎯 Available Scripts

**Root level:**
- `npm run install:all` — Install all dependencies
- `npm run dev` — Run frontend + backend concurrently
- `npm run dev:frontend` — Run frontend only (port 5173)
- `npm run dev:backend` — Run backend only (port 5000)
- `npm run build` — Build frontend for production

**Frontend:**
- `cd frontend && npm run dev` — Vite dev server
- `cd frontend && npm run build` — Build static assets
- `cd frontend && npm run preview` — Preview production build

**Backend:**
- `cd backend && npm start` — Start Express server

## 🔧 How It Works

1. **Frontend** (React + Vite) serves the UI and calls `/api/chat`
2. **Vite proxy** forwards `/api/*` to the backend during dev
3. **Backend** (Express) reads `GEMINI_API_KEY` from `.env` and proxies to Gemini
4. Chat history is saved in browser localStorage

## 🐛 Troubleshooting

**503 error: "Server missing GEMINI_API_KEY"**
- Add your key to `backend/.env` and restart the backend

**401/403 from Gemini API**
- Check your API key is valid at https://aistudio.google.com/
- Ensure you have access to the `gemini-1.5-flash` model

**Frontend can't connect to backend**
- Ensure backend is running on port 5000
- Check Vite proxy config in `frontend/vite.config.js`

**CORS errors**
- The backend allows `http://localhost:5173` by default
- Update `FRONTEND_URL` in `backend/.env` if using a different port

## 🚀 Production Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```
   Static files will be in `frontend/dist/`

2. Serve frontend dist with your backend or a CDN

3. Update backend CORS settings to allow your production domain

4. Set `GEMINI_API_KEY` in your production environment (never commit .env)

## 📝 License

MIT
