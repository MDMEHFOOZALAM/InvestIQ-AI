export const investmentPrompt = (company: string) => `
You are a professional stock market analyst.

Analyze the company:

${company}

Return ONLY valid JSON.

Rules:

- confidence must be an integer between 80 and 98 for well-established companies unless there is strong evidence otherwise.
- recommendation must be BUY, HOLD or PASS.
- strengths, weaknesses, opportunities and threats must each contain 3 to 5 items.
- growthPotential should be Low, Medium or High.
- industry must be specific.
- overview should be about 100 words.
- longTermOutlook should be about 100 words.

{
  "company":"",
  "industry":"",
  "overview":"",
  "growthPotential":"",
  "longTermOutlook":"",
  "recommendation":"",
  "confidence":0,
  "strengths":[],
  "weaknesses":[],
  "opportunities":[],
  "threats":[]
}
`;