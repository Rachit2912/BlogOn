const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = `${process.env.GOOGLE_API_KEY}`;

const genAI = new GoogleGenerativeAI(API_KEY);

const generateSummary = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text;
  } catch (error) {
    console.error(
      "Error communicating with Gemini API:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate summary");
  }
};

module.exports = {
  generateSummary,
};
