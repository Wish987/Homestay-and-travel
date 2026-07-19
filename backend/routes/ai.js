const express = require("express");
const router = express.Router();
const { generateTravel } = require("../controllers/aiController");

router.post("/travel", generateTravel);

module.exports = router;
