# Travel & Homestay Backend API

A production-ready Node.js/Express backend for the Travel & Homestay platform with JWT authentication, Prisma ORM, SQLite database, and Google Gemini AI integration.

## Features

✅ **Authentication**
- User registration with bcrypt password hashing
- JWT-based login and token verification
- Profile management
- Rate limiting on auth endpoints

✅ **Homestay Management**
- CRUD operations for homestays
- Search by location
- Pagination support
- Booking integration
- Prisma database management

✅ **Booking System**
- Create, read, update, delete bookings
- Check-in/check-out date validation
- Overlapping booking prevention
- User-specific booking queries
- Booking status tracking

✅ **AI Features**
- Google Gemini AI integration
- Generate travel plans with itineraries
- Generate destination travel tips
- Generate homestay descriptions
- Rate limiting for AI endpoints

✅ **Security**
- JWT authentication
- bcrypt password hashing
- Input validation with express-validator
- Rate limiting with express-rate-limit
- CORS configuration
- Error handling middleware

✅ **Database**
- Prisma ORM with SQLite (or PostgreSQL)
- Database migrations
- User, Homestay, and Booking models
- Proper relationships and constraints

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Edit .env with your configuration
# Required: GEMINI_API_KEY, JWT_SECRET

# Run Prisma migrations
npx prisma migrate dev --name init

# Start the server
npm start
# or for development with auto-reload
npm run dev
```

## Environment Variables

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
DATABASE_URL="file:./travel_homestay.db"
NODE_ENV=development
GEMINI_API_KEY=your_google_gemini_api_key_here
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "user",
    "email": "user@example.com",
    "createdAt": "2026-08-02T..."
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Profile fetched successfully",
  "user": {
    "id": 1,
    "name": "user",
    "email": "user@example.com",
    "phone": null,
    "createdAt": "2026-08-02T..."
  }
}
```

### Homestay Endpoints

#### Get All Homestays
```http
GET /homestays?skip=0&take=10

Response: 200 OK
{
  "success": true,
  "message": "Homestays fetched successfully",
  "data": [...],
  "pagination": {
    "total": 50,
    "skip": 0,
    "take": 10
  }
}
```

#### Search Homestays
```http
GET /homestays/search/location_name

Response: 200 OK
{
  "success": true,
  "message": "Search completed",
  "data": [...]
}
```

#### Get Homestay by ID
```http
GET /homestays/:id

Response: 200 OK
{
  "success": true,
  "message": "Homestay fetched successfully",
  "data": {
    "id": 1,
    "name": "Mountain Retreat",
    "location": "Ooty",
    "price": 4999,
    "image": "/logo.png",
    "description": "Beautiful mountain cottage...",
    "createdAt": "2026-08-02T...",
    "bookings": [...]
  }
}
```

#### Create Homestay
```http
POST /homestays
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mountain Retreat",
  "location": "Ooty",
  "price": 4999,
  "image": "https://example.com/image.jpg",
  "description": "Beautiful mountain cottage with scenic views"
}

Response: 201 Created
```

#### Update Homestay
```http
PUT /homestays/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 5999,
  "description": "Updated description"
}

Response: 200 OK
```

#### Delete Homestay
```http
DELETE /homestays/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Homestay deleted successfully"
}
```

### Booking Endpoints

#### Get User's Bookings
```http
GET /bookings
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Bookings fetched successfully",
  "data": [...]
}
```

#### Get Booking by ID
```http
GET /bookings/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Booking fetched successfully",
  "data": {
    "id": 1,
    "checkIn": "2026-08-10T...",
    "checkOut": "2026-08-15T...",
    "status": "Pending",
    "userId": 1,
    "homestayId": 1,
    "user": {...},
    "homestay": {...}
  }
}
```

#### Create Booking
```http
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "checkIn": "2026-08-10T12:00:00Z",
  "checkOut": "2026-08-15T12:00:00Z",
  "homestayId": 1
}

Response: 201 Created
```

#### Update Booking
```http
PUT /bookings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Confirmed"
}

Response: 200 OK
```

#### Cancel Booking
```http
DELETE /bookings/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

### AI Endpoints

#### Generate Travel Plan
```http
POST /ai/travel
Authorization: Bearer <token>
Content-Type: application/json

{
  "destination": "Paris",
  "days": 5,
  "interests": ["architecture", "museums", "food"]
}

Response: 200 OK
{
  "success": true,
  "message": "Travel plan generated successfully",
  "data": {
    "destination": "Paris",
    "days": 5,
    "itinerary": [...]
  }
}
```

#### Generate Travel Tips
```http
POST /ai/tips
Authorization: Bearer <token>
Content-Type: application/json

{
  "destination": "Tokyo"
}

Response: 200 OK
{
  "success": true,
  "message": "Travel tips generated successfully",
  "data": {
    "tips": [...]
  }
}
```

#### Generate Homestay Description
```http
POST /ai/description
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mountain Retreat",
  "location": "Ooty"
}

Response: 200 OK
{
  "success": true,
  "message": "Description generated successfully",
  "data": {
    "name": "Mountain Retreat",
    "location": "Ooty",
    "description": "AI generated description..."
  }
}
```

## Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Authentication**: 20 attempts per 15 minutes
- **Login**: 5 attempts per 15 minutes
- **Create Resources**: 50 per hour
- **AI Endpoints**: 10 per minute

## Database Schema

### User
- `id` (Int, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String)
- `phone` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- `bookings` (Relation to Booking)

### Homestay
- `id` (Int, Primary Key)
- `name` (String)
- `location` (String)
- `price` (Float)
- `image` (String)
- `description` (String)
- `createdAt` (DateTime)
- `bookings` (Relation to Booking)

### Booking
- `id` (Int, Primary Key)
- `checkIn` (DateTime)
- `checkOut` (DateTime)
- `status` (String, default: "Pending")
- `userId` (Int, Foreign Key)
- `homestayId` (Int, Foreign Key)
- `user` (Relation to User)
- `homestay` (Relation to Homestay)

## Deployment

### Using Vercel/Railway/Render

1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables in platform dashboard
4. Deploy

### Production Environment Variables

```env
PORT=5000
JWT_SECRET=<strong-secret-key>
DATABASE_URL=<production-database-url>
NODE_ENV=production
GEMINI_API_KEY=<your-api-key>
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 5000

CMD ["npm", "start"]
```

## Project Structure

```
backend/
├── middleware/
│   ├── verifyToken.js        # JWT verification
│   ├── errorHandler.js       # Global error handling
│   ├── validation.js         # Input validation rules
│   └── rateLimiter.js        # Rate limiting configuration
├── routes/
│   ├── auth.js               # Authentication endpoints
│   ├── homestays.js          # Homestay CRUD
│   ├── bookings.js           # Booking CRUD
│   └── ai.js                 # AI endpoints
├── services/
│   └── aiService.js          # Google Gemini AI integration
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── .env                      # Environment variables
├── .env.example              # Example environment
├── server.js                 # Main server file
├── package.json              # Dependencies
└── README.md                 # Documentation
```

## Error Handling

All endpoints return standardized JSON responses:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]
}
```

### Common Error Codes
- `400` - Bad Request / Validation Error
- `401` - Unauthorized / Invalid Token
- `403` - Forbidden / Insufficient Permission
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `429` - Too Many Requests (Rate Limit)
- `500` - Internal Server Error

## Security Best Practices

✅ Always use HTTPS in production
✅ Store sensitive data in environment variables
✅ Validate and sanitize all inputs
✅ Use rate limiting to prevent abuse
✅ Implement proper CORS policy
✅ Use bcrypt for password hashing
✅ Implement JWT with short expiration times
✅ Monitor and log errors
✅ Regular security audits

## Testing

```bash
# Unit tests (if available)
npm run test

# Integration tests (if available)
npm run test:integration
```

## Performance Optimization

- ✅ Database indexing on frequently queried fields
- ✅ Pagination for large datasets
- ✅ Caching strategies
- ✅ Query optimization with Prisma
- ✅ Connection pooling

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL in .env
- Ensure SQLite file has write permissions
- Run migrations: `npx prisma migrate dev`

### AI API Error
- Verify GEMINI_API_KEY is valid
- Check API rate limits
- Ensure network connectivity

### JWT Token Error
- Verify JWT_SECRET is set
- Check token expiration
- Ensure token format: `Bearer <token>`

### Rate Limit Error
- Wait for the specified duration
- Check X-RateLimit headers in response

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [repository-url/issues](/)
- Email: support@travelandstay.com

## Changelog

### v1.0.0 (2026-08-02)
- Initial release
- User authentication with JWT
- Homestay CRUD operations
- Booking management system
- Google Gemini AI integration
- Rate limiting and error handling
- Prisma ORM with SQLite
