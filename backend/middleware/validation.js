const { body, validationResult } = require("express-validator");

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Auth validation rules
const validateRegister = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors
];

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors
];

// Homestay validation rules
const validateHomestay = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Homestay name is required"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),
  body("description")
    .optional()
    .trim(),
  handleValidationErrors
];

// Booking validation rules
const validateBooking = [
  body("checkIn")
    .isISO8601()
    .withMessage("Check-in date must be valid"),
  body("checkOut")
    .isISO8601()
    .withMessage("Check-out date must be valid"),
  body("homestayId")
    .isInt({ min: 1 })
    .withMessage("Homestay ID must be a valid number"),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateRegister,
  validateLogin,
  validateHomestay,
  validateBooking
};
