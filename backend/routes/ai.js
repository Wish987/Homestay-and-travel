const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { body, validationResult } = require("express-validator");
const { aiLimiter } = require("../middleware/rateLimiter");
const {
  generateTravelPlan,
  generateTravelTips,
  generateHomestayDescription,
} = require("../services/aiService");

const router = express.Router();

// POST generate travel plan
router.post(
  "/travel",
  verifyToken,
  aiLimiter,
  [
    body("destination")
      .trim()
      .notEmpty()
      .withMessage("Destination is required"),
    body("days")
      .optional()
      .isInt({ min: 1, max: 30 })
      .withMessage("Days must be between 1 and 30"),
    body("interests")
      .optional()
      .isArray()
      .withMessage("Interests must be an array"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    try {
      const { destination, days = 3, interests = [] } = req.body;

      const travelPlan = await generateTravelPlan(destination, days, interests);

      res.json({
        success: true,
        message: "Travel plan generated successfully",
        data: travelPlan,
      });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to generate travel plan",
      });
    }
  }
);

// POST generate travel tips
router.post(
  "/tips",
  verifyToken,
  aiLimiter,
  [
    body("destination")
      .trim()
      .notEmpty()
      .withMessage("Destination is required"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    try {
      const { destination } = req.body;

      const tips = await generateTravelTips(destination);

      res.json({
        success: true,
        message: "Travel tips generated successfully",
        data: tips,
      });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to generate tips",
      });
    }
  }
);

// POST generate homestay description
router.post(
  "/description",
  verifyToken,
  aiLimiter,
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Homestay name is required"),
    body("location")
      .trim()
      .notEmpty()
      .withMessage("Location is required"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    try {
      const { name, location } = req.body;

      const description = await generateHomestayDescription(name, location);

      res.json({
        success: true,
        message: "Description generated successfully",
        data: {
          name,
          location,
          description,
        },
      });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to generate description",
      });
    }
  }
);

module.exports = router;
