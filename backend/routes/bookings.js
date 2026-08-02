const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middleware/verifyToken");
const { validateBooking } = require("../middleware/validation");

const prisma = new PrismaClient();
const router = express.Router();

// GET all bookings (admin only - or user's own bookings)
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        homestay: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        checkIn: "desc",
      },
    });

    res.json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
});

// GET specific booking
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        homestay: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if user owns this booking
    if (booking.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access this booking",
      });
    }

    res.json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// CREATE booking
router.post("/", verifyToken, validateBooking, async (req, res, next) => {
  try {
    const { checkIn, checkOut, homestayId } = req.body;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Check if homestay exists
    const homestay = await prisma.homestay.findUnique({
      where: { id: homestayId },
    });

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    // Check for overlapping bookings
    const existingBooking = await prisma.booking.findFirst({
      where: {
        homestayId,
        AND: [
          {
            checkIn: { lt: checkOutDate },
            checkOut: { gt: checkInDate },
          },
          {
            status: { not: "Cancelled" },
          },
        ],
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "Homestay is already booked for these dates",
      });
    }

    const booking = await prisma.booking.create({
      data: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        status: "Pending",
        userId: req.user.id,
        homestayId,
      },
      include: {
        homestay: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE booking
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, status } = req.body;

    // Get existing booking
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check ownership
    if (booking.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this booking",
      });
    }

    // Validate date update if provided
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate <= checkInDate) {
        return res.status(400).json({
          success: false,
          message: "Check-out date must be after check-in date",
        });
      }

      // Check for overlapping bookings (excluding current booking)
      const existingBooking = await prisma.booking.findFirst({
        where: {
          homestayId: booking.homestayId,
          id: { not: parseInt(id) },
          AND: [
            {
              checkIn: { lt: checkOutDate },
              checkOut: { gt: checkInDate },
            },
            {
              status: { not: "Cancelled" },
            },
          ],
        },
      });

      if (existingBooking) {
        return res.status(409).json({
          success: false,
          message: "Homestay is already booked for these dates",
        });
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        ...(checkIn && { checkIn: new Date(checkIn) }),
        ...(checkOut && { checkOut: new Date(checkOut) }),
        ...(status && { status }),
      },
      include: {
        homestay: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE booking (cancel)
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check ownership
    if (booking.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this booking",
      });
    }

    await prisma.booking.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
