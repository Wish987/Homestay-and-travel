const prisma = require("../prisma/client");
const fallbackHomestays = require("../data/homestays");

let inMemoryHomestays = [...fallbackHomestays];

const isDatabaseError = (error) => {
  const message = error?.message || "";
  return message.includes("connect") || message.includes("env") || message.includes("PrismaClientInitializationError");
};

const validateHomestayPayload = (body) => {
  const errors = [];

  if (!body || typeof body !== "object") {
    return [{ field: "body", message: "Request body is required" }];
  }

  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!body.location || typeof body.location !== "string" || !body.location.trim()) {
    errors.push({ field: "location", message: "Location is required" });
  }

  if (!body.image || typeof body.image !== "string" || !body.image.trim()) {
    errors.push({ field: "image", message: "Image is required" });
  }

  if (!body.description || typeof body.description !== "string" || !body.description.trim()) {
    errors.push({ field: "description", message: "Description is required" });
  }

  if (body.price === undefined || body.price === null || Number.isNaN(Number(body.price)) || Number(body.price) <= 0) {
    errors.push({ field: "price", message: "Price must be a positive number" });
  }

  return errors;
};

const listHomestays = async (req, res, next) => {
  try {
    const homestays = await prisma.homestay.findMany({
      orderBy: { createdAt: "desc" }
    });

    return res.json(homestays);
  } catch (error) {
    if (isDatabaseError(error)) {
      return res.json(inMemoryHomestays);
    }

    next(error);
  }
};

const getHomestayById = async (req, res, next) => {
  try {
    const homestay = await prisma.homestay.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!homestay) {
      return res.status(404).json({ message: "Homestay not found" });
    }

    return res.json(homestay);
  } catch (error) {
    if (isDatabaseError(error)) {
      const fallback = inMemoryHomestays.find((item) => item.id === Number(req.params.id));
      if (!fallback) {
        return res.status(404).json({ message: "Homestay not found" });
      }
      return res.json(fallback);
    }

    next(error);
  }
};

const createHomestay = async (req, res, next) => {
  const errors = validateHomestayPayload(req.body);
  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const homestay = await prisma.homestay.create({
      data: {
        name: req.body.name.trim(),
        location: req.body.location.trim(),
        price: Number(req.body.price),
        image: req.body.image.trim(),
        description: req.body.description.trim()
      }
    });

    return res.status(201).json(homestay);
  } catch (error) {
    if (isDatabaseError(error)) {
      const newHomestay = {
        id: inMemoryHomestays.length + 1,
        name: req.body.name.trim(),
        location: req.body.location.trim(),
        price: Number(req.body.price),
        image: req.body.image.trim(),
        description: req.body.description.trim()
      };

      inMemoryHomestays.push(newHomestay);
      return res.status(201).json(newHomestay);
    }

    next(error);
  }
};

const updateHomestay = async (req, res, next) => {
  const errors = validateHomestayPayload(req.body);
  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const homestay = await prisma.homestay.update({
      where: { id: Number(req.params.id) },
      data: {
        name: req.body.name.trim(),
        location: req.body.location.trim(),
        price: Number(req.body.price),
        image: req.body.image.trim(),
        description: req.body.description.trim()
      }
    });

    return res.json(homestay);
  } catch (error) {
    if (isDatabaseError(error)) {
      const index = inMemoryHomestays.findIndex((item) => item.id === Number(req.params.id));
      if (index === -1) {
        return res.status(404).json({ message: "Homestay not found" });
      }

      inMemoryHomestays[index] = {
        ...inMemoryHomestays[index],
        name: req.body.name.trim(),
        location: req.body.location.trim(),
        price: Number(req.body.price),
        image: req.body.image.trim(),
        description: req.body.description.trim()
      };

      return res.json(inMemoryHomestays[index]);
    }

    next(error);
  }
};

const deleteHomestay = async (req, res, next) => {
  try {
    await prisma.homestay.delete({
      where: { id: Number(req.params.id) }
    });

    return res.json({ message: "Homestay deleted successfully" });
  } catch (error) {
    if (isDatabaseError(error)) {
      const index = inMemoryHomestays.findIndex((item) => item.id === Number(req.params.id));
      if (index === -1) {
        return res.status(404).json({ message: "Homestay not found" });
      }

      inMemoryHomestays.splice(index, 1);
      return res.json({ message: "Homestay deleted successfully" });
    }

    next(error);
  }
};

const searchHomestays = async (req, res, next) => {
  try {
    const homestays = await prisma.homestay.findMany({
      where: {
        location: {
          contains: req.params.location,
          mode: "insensitive"
        }
      }
    });

    return res.json(homestays);
  } catch (error) {
    if (isDatabaseError(error)) {
      const filtered = inMemoryHomestays.filter((item) =>
        item.location.toLowerCase().includes(req.params.location.toLowerCase())
      );
      return res.json(filtered);
    }

    next(error);
  }
};

module.exports = {
  listHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays
};
