# Travel & Homestay Backend

## Project Overview
This backend powers the Travel & Homestay application. It includes:
- Express.js REST API
- JWT authentication with bcrypt and rate limiting
- Prisma schema for User, Homestay, and Booking models
- CRUD endpoints for homestays
- Local fallback behavior when a database connection is unavailable

## Installation
1. Navigate to the backend folder
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the server
   ```bash
   npm start
   ```

## Database
The project is configured to use Prisma with a PostgreSQL-style DATABASE_URL. If Supabase or PostgreSQL is not reachable, the API still runs using safe fallback logic for homestays.

## API Endpoints
### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Homestays
- GET /api/homestays
- GET /api/homestays/:id
- POST /api/homestays
- PUT /api/homestays/:id
- DELETE /api/homestays/:id
- GET /api/homestays/search/:location

## Folder Structure
- controllers/ — request handlers
- middleware/ — auth, error, and 404 handling
- routes/ — API route definitions
- prisma/ — Prisma schema, client, and seed scripts
- models/ — in-memory auth storage

## Running Instructions
```bash
cd backend
npm install
npm start
```

The API will be available at:
- http://localhost:5000/
- http://localhost:5000/api/homestays
- http://localhost:5000/api/auth/register
