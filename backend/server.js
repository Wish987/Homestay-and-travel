const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const homestayRoutes = require("./routes/homestays");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

app.use(cors());
app.use(express.json());

app.use("/api/homestays", homestayRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Travel & Homestay Backend API Running Successfully 🚀"
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});