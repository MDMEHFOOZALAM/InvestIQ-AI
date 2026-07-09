export interface Analysis {
  company: string;
  industry: string;
  overview: string;
  growthPotential: string;
  longTermOutlook: string;
  recommendation: string;
  confidence: number;

  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  risks?: string[];
}

export interface Decision {
  investmentScore: number;
  decision: string;
  reason: string;
}

export interface AnalysisResponse {
  success: boolean;
  analysis: Analysis;

  risk: {
    score: number;
    level: string;
  };

  decision: Decision;
}