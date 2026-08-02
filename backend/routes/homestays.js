const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middleware/verifyToken");
const { validateHomestay } = require("../middleware/validation");
const { createLimiter } = require("../middleware/rateLimiter");

const prisma = new PrismaClient();
const router = express.Router();

// GET all homestays with pagination
router.get("/", async (req, res, next) => {
  try {
    const { skip = 0, take = 10 } = req.query;

    const homestays = await prisma.homestay.findMany({
      skip: parseInt(skip),
      take: parseInt(take),
      include: {
        bookings: {
          select: {
            id: true,
            checkIn: true,
            checkOut: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.homestay.count();

    res.json({
      success: true,
      message: "Homestays fetched successfully",
      data: homestays,
      pagination: {
        total,
        skip: parseInt(skip),
        take: parseInt(take),
      },
    });
  } catch (error) {
    next(error);
  }
});

// SEARCH homestay by location
router.get("/search/:location", async (req, res, next) => {
  try {
    const { location } = req.params;

    const results = await prisma.homestay.findMany({
      where: {
        location: {
          contains: location,
          mode: "insensitive",
        },
      },
      include: {
        bookings: {
          select: {
            id: true,
            checkIn: true,
            checkOut: true,
            status: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: "Search completed",
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

// GET homestay by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const homestay = await prisma.homestay.findUnique({
      where: { id: parseInt(id) },
      include: {
        bookings: {
          select: {
            id: true,
            checkIn: true,
            checkOut: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    res.json({
      success: true,
      message: "Homestay fetched successfully",
      data: homestay,
    });
  } catch (error) {
    next(error);
  }
});

// POST create homestay (authenticated)
router.post(
  "/",
  verifyToken,
  createLimiter,
  validateHomestay,
  async (req, res, next) => {
    try {
      const { name, location, price, image, description } = req.body;

      const newHomestay = await prisma.homestay.create({
        data: {
          name,
          location,
          price: parseFloat(price),
          image: image || "/logo.png",
          description: description || "",
        },
        include: {
          bookings: true,
        },
      });

      res.status(201).json({
        success: true,
        message: "Homestay created successfully",
        data: newHomestay,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PUT update homestay (authenticated)
router.put(
  "/:id",
  verifyToken,
  validateHomestay,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, location, price, image, description } = req.body;

      const homestay = await prisma.homestay.findUnique({
        where: { id: parseInt(id) },
      });

      if (!homestay) {
        return res.status(404).json({
          success: false,
          message: "Homestay not found",
        });
      }

      const updatedHomestay = await prisma.homestay.update({
        where: { id: parseInt(id) },
        data: {
          ...(name && { name }),
          ...(location && { location }),
          ...(price && { price: parseFloat(price) }),
          ...(image && { image }),
          ...(description && { description }),
        },
        include: {
          bookings: true,
        },
      });

      res.json({
        success: true,
        message: "Homestay updated successfully",
        data: updatedHomestay,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE homestay (authenticated)
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const homestay = await prisma.homestay.findUnique({
      where: { id: parseInt(id) },
      include: { bookings: true },
    });

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    // Check if homestay has active bookings
    const activeBookings = homestay.bookings.filter(
      (b) => b.status !== "Cancelled"
    );

    if (activeBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete homestay with active bookings",
      });
    }

    await prisma.homestay.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Homestay deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;