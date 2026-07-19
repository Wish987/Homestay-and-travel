const { generateTravelGuide } = require("../services/geminiService");

const generateTravel = async (req, res, next) => {
  try {
    const { destination } = req.body;

    if (!destination || typeof destination !== "string" || !destination.trim()) {
      return res.status(400).json({
        success: false,
        error: "Destination is required and must be a valid string"
      });
    }

    const travelGuide = await generateTravelGuide(destination.trim());

    return res.json({
      success: true,
      result: travelGuide.result
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to generate travel guide. Please try again."
    });
  }
};

module.exports = {
  generateTravel
};
