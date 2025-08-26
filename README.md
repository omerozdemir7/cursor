# Movie Stream MVP

Full-stack app with Next.js frontend and Express/MongoDB backend.

## Requirements
- Node.js 18+
- MongoDB running locally (or Docker) or a MongoDB Atlas URI

## Backend (Express + MongoDB)

1) Configure env:

Create `/workspace/backend/.env` (or copy from `.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/netflix_mvp
JWT_SECRET=supersecretjwt
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

2) Install deps and run:
```
cd backend
npm install
npm run dev
```
API runs at `http://localhost:4000`.

3) Seed data (10 movies + test user):
```
cd backend
npm run seed
```

If you do not have MongoDB locally, start one via Docker:
```
docker run -d --name mongo-mvp -p 27017:27017 mongo:6
```

Test user:
- Email: `test@test.com`
- Password: `123456`

## Frontend (Next.js + Tailwind)

1) Configure env:

Create `/workspace/frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

2) Install deps and run:
```
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:3000`.

## Features
- Auth (JWT): register, login
- Movies: list, get by id, filter by category, search
- Favorites: add/remove/list
- Watch History: record play and list per user
- UI: responsive, Tailwind, dark mode toggle, hover animations, modal transitions

## Notes
- Change `CORS_ORIGIN` if the frontend runs on a different origin.
- The Play button records a watch and opens a trailer when available.