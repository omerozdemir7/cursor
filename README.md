# StreamBox

Full-stack movies/series demo with Next.js (Tailwind, animations, dark mode) and Express.js + MongoDB (JWT auth, favorites, watch history).

## Requirements

- Node.js 18+
- MongoDB running at `mongodb://localhost:27017` (Docker option below)

## Getting Started

### Backend

1. Copy environment:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Start MongoDB (Docker):
   ```bash
   docker run -d --name streambox-mongo -p 27017:27017 -v streambox_mongo:/data/db mongo:7
   ```
3. Install deps and seed:
   ```bash
   cd backend
   npm i
   npm run seed
   npm run dev
   ```
   API runs at `http://localhost:4000`.

### Frontend

1. Install deps and run:
   ```bash
   cd frontend
   npm i
   npm run dev
   ```
2. Visit `http://localhost:3000`.

### Test Accounts

- Email: `test@test.com`
- Password: `123456`

## Environment

- `backend/.env`
  - `PORT=4000`
  - `MONGO_URI=mongodb://localhost:27017/streambox`
  - `JWT_SECRET=supersecretjwt`
  - `CORS_ORIGIN=http://localhost:3000`
- `frontend/.env.local` (optional)
  - `NEXT_PUBLIC_API_URL=http://localhost:4000/api`

## Features

- JWT auth (register, login)
- Movies: list, details, filter/search
- Favorites: add/remove/list per user
- Watch history: add on play, list in profile
- Responsive UI with Tailwind
- Dark mode with toggle
- Framer Motion animations

# cursor