import { model } from "@/lib/gemini";
import { investmentPrompt } from "@/lib/prompts";
import { validateAnalysis } from "./validationAgent";

export async function researchAgent(company: string) {
  const prompt = investmentPrompt(company);

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed;

  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Invalid JSON returned by Gemini:", cleaned, err);
    throw new Error("Failed to parse Gemini response.");
  }

  const analysis = validateAnalysis(parsed);

  console.log("Gemini Analysis:");
  console.log(JSON.stringify(analysis, null, 2));

  return analysis;
}