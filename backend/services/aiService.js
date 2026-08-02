const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateTravelPlan = async (destination, days = 3, interests = []) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an expert travel planner. Create a detailed ${days}-day travel itinerary for ${destination}. 
${interests.length > 0 ? `Focus on these interests: ${interests.join(", ")}` : ""}

Format your response as a JSON object with this structure:
{
  "destination": "${destination}",
  "days": ${days},
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "activities": ["activity 1", "activity 2"],
      "meals": ["breakfast recommendation", "lunch", "dinner"],
      "estimatedCost": "estimated cost",
      "tips": ["local tip 1", "tip 2"]
    }
  ],
  "packingList": ["item1", "item2"],
  "bestTimeToVisit": "best season",
  "localTransport": "transportation tips",
  "safetyTips": ["tip1", "tip2"],
  "budgetBreakdown": {
    "accommodation": "cost",
    "food": "cost",
    "activities": "cost",
    "transport": "cost"
  }
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      destination,
      days,
      itinerary: responseText,
      success: true,
    };
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error(`Failed to generate travel plan: ${error.message}`);
  }
};

const generateHomestayDescription = async (name, location) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Write an engaging and concise description (2-3 sentences) for a homestay called "${name}" located in "${location}". 
Make it appealing to travelers and highlight unique features.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error(`Failed to generate description: ${error.message}`);
  }
};

const generateTravelTips = async (destination) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Provide 5 essential travel tips for visiting ${destination}. Format as a JSON array of strings.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Try to extract JSON array
    const arrayMatch = responseText.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      return JSON.parse(arrayMatch[0]);
    }

    return {
      tips: responseText,
      destination,
    };
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error(`Failed to generate tips: ${error.message}`);
  }
};

module.exports = {
  generateTravelPlan,
  generateHomestayDescription,
  generateTravelTips,
};
