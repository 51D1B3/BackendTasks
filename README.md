# Task Manager Backend

Minimal Node.js + Express backend for managing team tasks.

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:
   ```
   npm install
   ```
3. Start server (dev):
   ```
   npm run dev
   ```
4. Endpoints:
   - POST /api/auth/register
   - POST /api/auth/login
   - GET/POST/PUT/DELETE /api/tasks (protected)

## Notes
- Uses JWT for auth.
- DB connection uses `MONGO_URI`.
