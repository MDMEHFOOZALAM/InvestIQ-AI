interface DecisionResult {
  investmentScore: number;
  decision: string;
  reason: string;
}

export function decisionAgent(
  confidence: number,
  recommendation: string,
  growthPotential: string,
  riskScore: number
): DecisionResult {

  let score = 50;

  score += confidence * 0.4;

  const growth = growthPotential.toLowerCase();

  if (
    growth.includes("high") ||
    growth.includes("strong")
  ) {

    score += 20;

  }

  else if (
    growth.includes("medium")
  ) {

    score += 10;

  }

  if (recommendation === "BUY") {

    score += 15;

  }

  if (recommendation === "HOLD") {

    score += 5;

  }

  if (recommendation === "PASS") {

    score -= 20;

  }

  score -= riskScore * 0.3;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let decision = "HOLD";

  if (score >= 80) {

    decision = "BUY";

  }

  else if (score < 60) {

    decision = "PASS";

  }

  let reason = "";

  if (decision === "BUY") {

    reason =
      "Strong financial outlook with manageable investment risk.";

  }

  else if (decision === "HOLD") {

    reason =
      "Company has stable fundamentals but should be monitored.";

  }

  else {

    reason =
      "Current risks outweigh expected returns.";

  }

  return {
    investmentScore: score,
    decision,
    reason,
  };
}