const express = require("express");
const router = express.Router();
const {
  listHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays
} = require("../controllers/homestaysController");

router.get("/", listHomestays);
router.get("/search/:location", searchHomestays);
router.get("/:id", getHomestayById);
router.post("/", createHomestay);
router.put("/:id", updateHomestay);
router.delete("/:id", deleteHomestay);

module.exports = router;