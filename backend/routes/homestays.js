const express = require("express");
const router = express.Router();
let homestays = require("../data/homestays");

// GET all homestays
router.get("/", (req, res) => {
  res.json(homestays);
});

// GET homestay by ID
router.get("/:id", (req, res) => {
  const homestay = homestays.find(
    h => h.id === parseInt(req.params.id)
  );

  if (!homestay) {
    return res.status(404).json({ message: "Homestay not found" });
  }

  res.json(homestay);
});

// POST create homestay
router.post("/", (req, res) => {
  const newHomestay = {
    id: homestays.length + 1,
    ...req.body
  };

  homestays.push(newHomestay);

  res.status(201).json(newHomestay);
});

// PUT update homestay
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  homestays = homestays.map(h =>
    h.id === id ? { ...h, ...req.body } : h
  );

  res.json({
    message: "Updated successfully"
  });
});

// DELETE homestay
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  homestays = homestays.filter(h => h.id !== id);

  res.json({
    message: "Deleted successfully"
  });
});

// SEARCH homestay
router.get("/search/:location", (req, res) => {
  const location = req.params.location.toLowerCase();

  const results = homestays.filter(h =>
    h.location.toLowerCase().includes(location)
  );

  res.json(results);
});

module.exports = router;