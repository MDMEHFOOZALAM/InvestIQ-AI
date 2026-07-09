import { Analysis } from "@/types/analysis";

export function validateAnalysis(data: Partial<Analysis>): Analysis {
  return {
    company: data?.company || "Unknown",

    industry: data?.industry || "Unknown",

    overview: data?.overview || "No overview available.",

    growthPotential: data?.growthPotential || "Medium",

    longTermOutlook:
      data?.longTermOutlook || "No long-term outlook available.",

    recommendation: ["BUY", "HOLD", "PASS"].includes(
      (data?.recommendation as string) || ""
    )
      ? ((data?.recommendation as string) || "HOLD")
      : "HOLD",

    confidence: Math.min(
      100,
      Math.max(0, Number(data?.confidence) || 50)
    ),

    strengths: Array.isArray(data?.strengths)
      ? (data.strengths as string[])
      : [],

    weaknesses: Array.isArray(data?.weaknesses)
      ? (data.weaknesses as string[])
      : [],

    opportunities: Array.isArray(data?.opportunities)
      ? (data.opportunities as string[])
      : [],

    threats: Array.isArray(data?.threats)
      ? (data.threats as string[])
      : [],

    risks: Array.isArray(data?.risks)
      ? (data.risks as string[])
      : Array.isArray(data?.weaknesses)
      ? (data.weaknesses as string[])
      : [],
  };
}