import { model } from "../lib/gemini";
import { investmentPrompt } from "../lib/prompts";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function researchCompany(company: string) {
  const prompt = investmentPrompt(company);

  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Gemini Attempt ${attempt}`);

      const result = await model.generateContent(prompt);

      const text = result.response.text();

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanedText);
    } catch (error) {
      lastError = error;

      console.log(`Attempt ${attempt} failed`);

      if (attempt < 3) {
        await sleep(1500);
      }
    }
  }

  throw lastError;
}