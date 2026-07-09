import jsPDF from "jspdf";
import { AnalysisResponse } from "@/types/analysis";

export function downloadReport(report: AnalysisResponse) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("InvestIQ AI", 20, y);

  y += 10;

  doc.setFontSize(16);
  doc.text("Investment Research Report", 20, y);

  y += 15;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Company: ${report.analysis.company}`, 20, y);
  y += 8;

  doc.text(`Industry: ${report.analysis.industry}`, 20, y);
  y += 8;

  doc.text(`Growth Potential: ${report.analysis.growthPotential}`, 20, y);
  y += 8;

  doc.text(`Recommendation: ${report.analysis.recommendation}`, 20, y);
  y += 8;

  doc.text(`Confidence: ${report.analysis.confidence}%`, 20, y);
  y += 8;

  doc.text(`Decision: ${report.decision.decision}`, 20, y);
  y += 15;

  doc.setFont("helvetica", "bold");
  doc.text("Overview", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const overview = doc.splitTextToSize(report.analysis.overview, 170);
  doc.text(overview, 20, y);

  y += overview.length * 7 + 8;

  doc.setFont("helvetica", "bold");
  doc.text("Strengths", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  report.analysis.strengths.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 7;
  });

  y += 5;

  doc.setFont("helvetica", "bold");
  doc.text("Risks", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  (report.analysis.risks ?? []).forEach((item: string) => {
  doc.text(`• ${item}`, 25, y);
  y += 7;
});

  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("AI Decision", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const reason = doc.splitTextToSize(report.decision.reason, 170);
  doc.text(reason, 20, y);

  doc.save(`Investment_Report_${report.analysis.company}.pdf`);
}