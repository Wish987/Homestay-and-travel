const express = require("express");
const cors = require("cors");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Rate Limiter
app.use(apiLimiter);

// Routes
const homestayRoutes = require("./routes/homestays");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const aiRoutes = require("./routes/ai");

app.use("/api/homestays", homestayRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ai", aiRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travel & Homestay Backend API Running Successfully 🚀",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      homestays: "/api/homestays",
      bookings: "/api/bookings",
      ai: "/api/ai",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error Handler Middleware (must be last)
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});