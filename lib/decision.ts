export function decideInvestment(
  confidence: number,
  strengths: string[],
  risks: string[]
) {
  const score =
    confidence +
    strengths.length * 5 -
    risks.length * 5;

  if (score >= 90) {
    return {
      decision: "BUY",
      reason:
        "The company shows strong fundamentals, high confidence, and manageable risks.",
    };
  }

  if (score >= 70) {
    return {
      decision: "HOLD",
      reason:
        "The company has potential but investors should monitor future developments.",
    };
  }

  return {
    decision: "PASS",
    reason:
      "The current risks outweigh the expected investment opportunity.",
    };
}