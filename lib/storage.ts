import { AnalysisResponse } from "@/types/analysis";

export function saveHistory(report: AnalysisResponse) {
  if (typeof window === "undefined") return;

  try {
    const history: AnalysisResponse[] = JSON.parse(
      localStorage.getItem("investiq-history") || "[]"
    );

    history.unshift(report);

    localStorage.setItem(
      "investiq-history",
      JSON.stringify(history.slice(0, 10))
    );
  } catch {
    // If parsing fails, overwrite with the single report
    localStorage.setItem("investiq-history", JSON.stringify([report]));
  }
}

export function getHistory(): AnalysisResponse[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(
      localStorage.getItem("investiq-history") || "[]"
    ) as AnalysisResponse[];
  } catch {
    return [];
  }
}

export function clearHistory() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("investiq-history");
}