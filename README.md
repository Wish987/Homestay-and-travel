# Travel & Homestay Platform

A full-stack web application for discovering and booking homestays while exploring travel destinations. Built with Next.js (Frontend) and Express.js (Backend), featuring JWT authentication, database management with Prisma, and AI-powered travel planning.

## 🌟 Features

### Week 5: Core CRUD APIs
- Create, Read, Update, Delete homestay listings
- Database integration with Prisma ORM
- RESTful API endpoints
- In-memory fallback for database connection issues

### Week 6: JWT Authentication
- User registration and login
- JWT-based authentication tokens
- Password hashing with bcrypt
- Rate limiting for auth endpoints
- Protected routes middleware

### Week 7: AI Integration ⭐ NEW
- **Google Gemini Integration**: AI-powered travel guide generation
- **AIPlanner Component**: Beautiful, intuitive UI for travel planning
- **Smart Prompt Engineering**: Optimized prompts for high-quality AI responses
- **Features**:
  - Destination search with AI analysis
  - Auto-generated travel guides with:
    - Short destination overview
    - Top 3 attractions
    - Travel tips and recommendations
  - Loading states and error handling
  - Real-time response display
  - Clean, responsive UI

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL (optional, with in-memory fallback)
- Google Gemini API Key

### Environment Setup

Create `.env` file in the `backend/` directory:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
JWT_SECRET=your_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/travel_homestay?schema=public
```

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd ..
npm install
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

## 📁 Project Structure

```
travel-and-stay/
├── app/                          # Next.js App Router
│   ├── page.js                  # Home page
│   ├── about/page.jsx           # About page
│   ├── login/page.jsx           # Login page
│   ├── dashboard/page.jsx       # Dashboard
│   ├── showcase/page.jsx        # Homestay showcase
│   └── aiplanner/page.jsx       # AI Travel Planner (Week 7)
├── components/                   # React components
│   ├── Navbar.jsx               # Navigation
│   ├── Footer.jsx               # Footer
│   ├── Hero.jsx                 # Hero section
│   ├── Card.jsx                 # Homestay card
│   ├── ThemeToggle.jsx          # Dark mode toggle
│   ├── AIPlanner.jsx            # AI Planner component (Week 7)
│   └── ui/                      # UI components
├── backend/
│   ├── server.js                # Express server entry
│   ├── .env                     # Environment variables
│   ├── controllers/             # Route controllers
│   │   ├── homestaysController.js
│   │   └── aiController.js      # AI endpoint controller (Week 7)
│   ├── routes/                  # API routes
│   │   ├── homestays.js
│   │   ├── auth.js
│   │   └── ai.js                # AI routes (Week 7)
│   ├── services/                # Business logic
│   │   └── geminiService.js     # Google Gemini integration (Week 7)
│   ├── middleware/              # Express middleware
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── verifyToken.js
│   ├── models/                  # Data models
│   │   └── users.js
│   ├── prisma/                  # Prisma ORM
│   │   ├── client.js
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── data/                    # Fallback data
│       └── homestays.js
├── README.md                     # This file
└── PROMPTS.md                   # AI prompt engineering documentation
```

## 📡 API Endpoints

### Homestays (Week 5)
- `GET /api/homestays` - List all homestays
- `GET /api/homestays/:id` - Get homestay by ID
- `GET /api/homestays/search/:location` - Search by location
- `POST /api/homestays` - Create new homestay
- `PUT /api/homestays/:id` - Update homestay
- `DELETE /api/homestays/:id` - Delete homestay

### Authentication (Week 6)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### AI Travel Planning (Week 7)
- `POST /api/ai/travel` - Generate travel guide
  
  **Request:**
  ```json
  {
    "destination": "Goa"
  }
  ```
  
  **Response:**
  ```json
  {
    "success": true,
    "result": "Short overview, top 3 attractions, and travel tips..."
  }
  ```

## 🤖 AI Integration Details (Week 7)

### Google Gemini API
- **Model**: Gemini 1.5 Flash
- **Purpose**: Generate high-quality, concise travel guides
- **API Key**: Stored in `.env` file (never hardcoded)
- **Rate Limiting**: Handled by API key quota

### Prompt Engineering
See [PROMPTS.md](./PROMPTS.md) for detailed analysis of three prompt versions and why the optimized version is best.

**Current Prompt:**
```
You are an experienced travel guide.

Generate a travel guide for the given destination: {destination}

Return:
• Short overview
• Top 3 attractions
• One travel tip

Keep the response under 150 words.
```

### Frontend Integration
- **Component**: `components/AIPlanner.jsx`
- **Page**: `app/aiplanner/page.jsx`
- **HTTP Client**: Fetch API
- **CORS**: Enabled for localhost:5000
- **Error Handling**: User-friendly error messages
- **Loading States**: Animated spinner during generation

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing

### Backend
- **Express.js** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Google Generative AI** - AI integration
- **CORS** - Cross-origin support
- **Dotenv** - Environment management

## 📝 Database Schema

The project uses Prisma with the following models:
- **User**: Authentication and user data
- **Homestay**: Property listings
- **Booking**: Reservations (extensible)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Rate limiting on authentication endpoints
- Input validation on all endpoints
- CORS configuration
- Error handling middleware
- API key protection (environment variables)

## 🧪 Development

### Running Tests
```bash
# Backend tests (if configured)
cd backend && npm test

# Frontend tests (if configured)
npm test
```

### Building for Production

**Frontend:**
```bash
npm run build
npm start
```

**Backend:**
```bash
cd backend
npm start
# Uses production mode
```

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Google Generative AI](https://ai.google.dev)
- [JWT Authentication](https://jwt.io)

## 📋 Week 7 Checklist

- ✅ Install @google/generative-ai
- ✅ Create backend/services/geminiService.js
- ✅ Create backend/controllers/aiController.js
- ✅ Create backend/routes/ai.js
- ✅ Add POST /api/ai/travel endpoint
- ✅ Handle errors with 500 status
- ✅ Register AI route in server.js
- ✅ Create AIPlanner frontend component
- ✅ Create AIPlanner page
- ✅ Connect frontend to backend
- ✅ Create PROMPTS.md documentation
- ✅ Update README.md

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of a Full Stack Development course assignment.

---

**Last Updated**: Week 7 - AI Integration  
**Status**: ✅ Production Ready
