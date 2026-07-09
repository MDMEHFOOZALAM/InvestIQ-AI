import { NextResponse } from "next/server";

import { researchAgent } from "@/agents/researchAgent";
import { riskAgent } from "@/agents/riskAgent";
import { decisionAgent } from "@/agents/decisionAgent";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const company = body.company?.trim();

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "Company name is required",
        },
        {
          status: 400,
        }
      );
    }

    const analysis = await researchAgent(company);

    const risk = riskAgent(
      analysis.weaknesses,
      analysis.threats
    );

    const decision = decisionAgent(
      analysis.confidence,
      analysis.recommendation,
      analysis.growthPotential,
      risk.score
    );

    return NextResponse.json({
      success: true,
      analysis,
      risk,
      decision,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Analysis failed";

    console.error("Analysis Error:", error);

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      }
    );
  }
}