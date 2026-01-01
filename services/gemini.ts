
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getReviewFeedback(entry: string, phase: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a Master Watchmaker, review this student's homework entry for Phase ${phase}: "${entry}". 
      Provide constructive, highly technical feedback focusing on microns, precision, and traditional Swiss standards. 
      Keep it encouraging but rigorous.`,
      config: {
        systemInstruction: "You are a world-class WOSTEP instructor with 40 years of experience at Vacheron Constantin.",
        temperature: 0.7,
      },
    });
    return response.text || "Feedback currently unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Master is currently busy. Please try your review again later.";
  }
}

export async function getDeepDive(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide an EXHAUSTIVE technical deep dive on the topic of "${topic}". 

      Structure your response as follows:
      1. Historical Context (The origins of this mechanical principle).
      2. Material Science (Alloys, hardening, and tempering required).
      3. Mathematical Theory (Include formulas like T=Fr, Cubic Strength, or Gear Ratios).
      4. Bench Implementation (Specific tools, Bergeon reference numbers, and Moebius lubrication types).
      5. Master's Secrets (Micron-level adjustments and troubleshooting common faults).

      Write at least 1000 words. Be incredibly detailed. Use professional horological terminology (e.g., endshake, sideplay, Ra polish, epilame, draw, drop).`,
      config: {
        systemInstruction: "You are the world's leading horological historian and master watchmaker. Your goal is to provide information as dense and valuable as a 200-page textbook chapter in a concise but deeply technical summary.",
        temperature: 0.5,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error retrieving deep dive content.";
  }
}
