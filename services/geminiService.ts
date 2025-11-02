
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateRecipe = async (productName: string): Promise<string> => {
  try {
    const prompt = `Generate a simple and delicious recipe for a beginner cook that features ${productName} as the main ingredient. The recipe should have a catchy title, a short description, a list of ingredients, and step-by-step instructions. Format the response in Markdown.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "Sorry, I couldn't come up with a recipe right now. Please try again later.";
  }
};
