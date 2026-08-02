const rateLimit = require("express-rate-limit");

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// Auth rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many authentication attempts. Please try again after 15 minutes.",
  skip: (req) => {
    // Skip rate limiting for GET requests
    return req.method === "GET";
  }
});

// Strict rate limiter for login attempts (very strict)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many login attempts. Please try again after 15 minutes.",
});

// Create limiter (moderate)
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 create requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many resources created. Please try again after 1 hour.",
});

// AI endpoint limiter (moderate)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 AI requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many AI requests. Please try again after 1 minute.",
});

module.exports = {
  apiLimiter,
  authLimiter,
  loginLimiter,
  createLimiter,
  aiLimiter
};
