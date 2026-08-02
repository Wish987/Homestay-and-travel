const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middleware/verifyToken");
const { validateRegister, validateLogin } = require("../middleware/validation");
const { loginLimiter, authLimiter } = require("../middleware/rateLimiter");

const prisma = new PrismaClient();

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validateRegister,
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already registered"
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name: email.split("@")[0],
          email: email.toLowerCase(),
          password: hashedPassword
        }
      });

      const { password: _, ...safeUser } = user;

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: safeUser
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  loginLimiter,
  validateLogin,
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "travel_secret_key",
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email }
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/profile", verifyToken, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      }
    });

    return res.json({
      success: true,
      message: "Profile fetched successfully",
      user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;