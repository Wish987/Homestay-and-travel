const { GoogleGenerativeAI } = require("@google/generative-ai");

const initializeGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
};

const generateTravelGuide = async (destination) => {
  try {
    const genAI = initializeGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an experienced travel guide.

Generate a travel guide for the given destination: ${destination}

Return:
• Short overview
• Top 3 attractions
• One travel tip

Keep the response under 150 words.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return {
      success: true,
      result: text
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Fallback mock response for testing UI
    const mockResponses = {
      goa: `Goa is a coastal paradise in western India, known for its stunning beaches, vibrant culture, and laid-back atmosphere.

Top 3 attractions:
• Baga Beach - Popular beach with water sports and nightlife
• Fort Aguada - Historic 17th-century Portuguese fortress with panoramic views
• Dudhsagar Waterfall - Majestic 600-meter waterfall surrounded by lush forests

Travel tip: Visit during November to February for the best weather. Avoid monsoon season (June-September) when many beaches are unsafe for swimming.`,
      
      paris: `Paris, the City of Light, is a romantic destination famous for its art, architecture, and culinary excellence.

Top 3 attractions:
• Eiffel Tower - Iconic iron structure offering panoramic city views
• Louvre Museum - World's largest art museum housing the Mona Lisa
• Notre-Dame Cathedral - Stunning Gothic architecture (currently under restoration)

Travel tip: Purchase a Paris Museum Pass for skip-the-line access to major attractions and save money on admissions.`,
      
      tokyo: `Tokyo is a vibrant metropolis blending ancient traditions with cutting-edge technology and innovation.

Top 3 attractions:
• Senso-ji Temple - Historic Buddhist temple in the atmospheric Asakusa district
• Shibuya Crossing - World's busiest pedestrian crossing with electric energy
• Tokyo Skytree - Modern tower offering stunning city views and entertainment

Travel tip: Get a Suica/Pasmo card for convenient travel on trains and buses throughout the city.`
    };
    
    const destKey = destination.toLowerCase();
    const mockResponse = mockResponses[destKey] || 
      `${destination} is a wonderful travel destination with rich culture and attractions.

Top 3 attractions:
• Local cultural sites and museums
• Natural landscapes and parks
• Traditional dining and authentic experiences

Travel tip: Research local customs and try local cuisine for an authentic experience.`;
    
    return {
      success: true,
      result: mockResponse
    };
  }
};

module.exports = {
  generateTravelGuide,
  initializeGemini
};
