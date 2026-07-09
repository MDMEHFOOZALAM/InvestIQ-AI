interface RiskResult {
  score: number;
  level: string;
}

export function riskAgent(
  weaknesses: string[],
  threats: string[]
): RiskResult {

  const risks = [...weaknesses, ...threats];

  let score = 0;

  for (const risk of risks) {

    const text = risk.toLowerCase();

    if (
      text.includes("debt") ||
      text.includes("cash flow")
    ) {
      score += 25;
    }

    else if (
      text.includes("regulation") ||
      text.includes("government")
    ) {
      score += 20;
    }

    else if (
      text.includes("competition")
    ) {
      score += 15;
    }

    else if (
      text.includes("technology")
    ) {
      score += 10;
    }

    else if (
      text.includes("market")
    ) {
      score += 15;
    }

    else {
      score += 8;
    }

  }

  score = Math.min(score, 100);

  let level = "Low";

  if (score >= 70) {

    level = "High";

  }

  else if (score >= 40) {

    level = "Medium";

  }

  return {
    score,
    level,
  };
}