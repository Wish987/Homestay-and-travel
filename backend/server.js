const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const homestayRoutes = require("./routes/homestays");
app.use("/api/homestays", homestayRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Travel & Homestay Backend API Running Successfully 🚀"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});