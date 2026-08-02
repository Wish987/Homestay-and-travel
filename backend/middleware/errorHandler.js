// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Prisma specific errors
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: `Unique constraint failed on field: ${err.meta?.target?.[0] || "unknown"}`,
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Record not found",
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Validation errors
  if (err.status === 400) {
    return res.status(400).json({
      success: false,
      message: err.message || "Validation error",
    });
  }

  // Default error
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
