"use client";

import { useState } from "react";
import { AnalysisResponse } from "@/types/analysis";
import {
  saveHistory,
  getHistory,
  clearHistory,
} from "@/lib/storage";
import { downloadReport } from "@/lib/pdf";

export default function Home() {
  const [company, setCompany] = useState("");
  const [result, setResult] =
    useState<AnalysisResponse | null>(null);

  const [history, setHistory] = useState<AnalysisResponse[]>(() =>
    getHistory()
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [thinkingStep, setThinkingStep] =
    useState("");

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleAnalyze = async () => {
    if (!company.trim()) {
      setError("Please enter a company name.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      setThinkingStep("🔍 Researching company...");
      await sleep(500);

      setThinkingStep("🏭 Analyzing industry...");
      await sleep(500);

      setThinkingStep("📊 Running SWOT analysis...");
      await sleep(500);

      setThinkingStep("⚠️ Calculating risk...");
      await sleep(500);

      setThinkingStep("🤖 Making investment decision...");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: company.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Analysis failed"
        );
      }

      setResult(data as AnalysisResponse);

      saveHistory(data);

      setHistory(getHistory());
    } catch (err) {
      console.error(err);

      setError(
        "Unable to analyze company. Please try again."
      );
    } finally {
      setLoading(false);

      setThinkingStep("");
    }
  };

  const copyReport = () => {
    if (!result) return;

    navigator.clipboard.writeText(
`Company : ${result.analysis.company}

Recommendation : ${result.decision.decision}

Confidence : ${result.analysis.confidence}%

Overview

${result.analysis.overview}

Strengths

${result.analysis.strengths.join("\n")}

Risks

${(result.analysis.risks ?? []).join("\n")}

Reason

${result.decision.reason}
`
    );

    alert("Report copied successfully.");
  };

  const decisionColor = (decision: string) => {
    switch (decision) {
      case "BUY":
        return "text-green-400";

      case "HOLD":
        return "text-yellow-400";

      case "PASS":
        return "text-red-400";

      default:
        return "text-white";
    }
  };

  const confidenceColor = (
    confidence: number
  ) => {
    if (confidence >= 80)
      return "bg-green-500";

    if (confidence >= 60)
      return "bg-yellow-500";

    return "bg-red-500";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white scroll-smooth">

      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl shadow-lg">
              📈
            </div>

            <div>

              <h1 className="text-2xl font-bold text-white">
                InvestIQ AI
              </h1>

              <p className="text-xs text-slate-400">
                AI Investment Research Dashboard
              </p>

            </div>

          </div>

          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2 py-2 md:flex">

            <a
              href="#dashboard"
              className="rounded-full px-5 py-2 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              🏠 Dashboard
            </a>

            <a
              href="#history"
              className="rounded-full px-5 py-2 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              🕒 History
            </a>

            <a
              href="#about"
              className="rounded-full px-5 py-2 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              ℹ️ About
            </a>

          </div>

        </div>

      </nav>

      {/* anchor so Dashboard link works from landing */}
      <div id="dashboard" />

      {!result ? (

        <div className="flex min-h-screen items-center justify-center px-6">

          <div className="w-full max-w-3xl">

            <div className="text-center">

              <h1 className="text-6xl font-extrabold tracking-tight">
                📈 InvestIQ AI
              </h1>

              <p className="mt-5 text-xl text-gray-400">
                AI Investment Research Agent
              </p>

              <p className="mt-2 text-gray-500">
                Research • Risk Analysis • Investment Decision
              </p>

            </div>

            <div className="mt-14 rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

              <input
                type="text"
                placeholder="Enter company name..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-6 py-5 text-lg outline-none transition focus:border-blue-500"
              />

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-blue-600 px-6 py-5 text-lg font-semibold transition hover:bg-blue-700 disabled:bg-gray-600"
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Company"}
              </button>

              {loading && (

                <div className="mt-8 rounded-2xl border border-blue-700 bg-blue-900/20 p-6">

                  <div className="flex items-center gap-3">

                    <div className="h-4 w-4 animate-ping rounded-full bg-blue-500"></div>

                    <h2 className="text-xl font-semibold">
                      AI Agent Working...
                    </h2>

                  </div>

                  <p className="mt-4 text-blue-300">{thinkingStep}</p>

                </div>

              )}

              {error && (

                <div className="mt-6 rounded-xl border border-red-700 bg-red-900/20 p-4 text-red-300">

                  {error}

                </div>

              )}

            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <div className="text-4xl">🔍</div>

                <h3 className="mt-4 text-xl font-bold">Research</h3>

                <p className="mt-2 text-gray-400">Analyze company fundamentals and business model.</p>

              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <div className="text-4xl">⚠️</div>

                <h3 className="mt-4 text-xl font-bold">Risk Analysis</h3>

                <p className="mt-2 text-gray-400">Evaluate investment risks using AI.</p>

              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <div className="text-4xl">🤖</div>

                <h3 className="mt-4 text-xl font-bold">Decision</h3>

                <p className="mt-2 text-gray-400">Generate BUY, HOLD or PASS recommendations.</p>

              </div>

            </div>

          </div>

        </div>

      ) : (
        <div className="min-h-screen bg-slate-950">

          <div id="dashboard" className="mx-auto max-w-7xl px-6 py-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div>

                <h1 className="text-4xl font-bold">📈 InvestIQ AI</h1>

                <p className="mt-2 text-gray-400">AI Investment Research Dashboard</p>

              </div>

              <div className="flex w-full max-w-2xl gap-3">

                <input
                  type="text"
                  placeholder="Search another company..."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 outline-none focus:border-blue-500"
                />

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="rounded-xl bg-blue-600 px-8 font-semibold hover:bg-blue-700 disabled:bg-gray-600"
                >
                  Analyze
                </button>

              </div>

            </div>

            {loading && (

              <div className="mt-8 rounded-xl border border-blue-700 bg-blue-900/20 p-5">

                <h3 className="text-xl font-bold">🧠 AI Agent Working...</h3>

                <p className="mt-3 text-blue-300">{thinkingStep}</p>

              </div>

            )}

            <div className="mt-10 grid gap-5 lg:grid-cols-4">

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <p className="text-gray-400">Decision</p>

                <h2 className={`mt-3 text-4xl font-bold ${decisionColor(result.decision.decision)}`}>
                  {result.decision.decision}
                </h2>

              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <p className="text-gray-400">Investment Score</p>

                <h2 className="mt-3 text-4xl font-bold text-cyan-400">{result.decision.investmentScore}/100</h2>

              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <p className="text-gray-400">Confidence</p>

                <h2 className="mt-3 text-4xl font-bold">{result.analysis.confidence}%</h2>

                <div className="mt-4 h-3 rounded-full bg-slate-700">

                  <div
                    className={`h-3 rounded-full ${confidenceColor(result.analysis.confidence)}`}
                    style={{
                      width: `${result.analysis.confidence}%`,
                    }}
                  />

                </div>

              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <p className="text-gray-400">Risk Level</p>

                <h2 className="mt-3 text-4xl font-bold text-orange-400">{result.risk.level}</h2>

                <p className="mt-3">Score : {result.risk.score}/100</p>

              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => downloadReport(result)}
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
              >
                📄 Download PDF
              </button>

              <button
                onClick={copyReport}
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700"
              >
                📋 Copy Report
              </button>

            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <h2 className="mb-5 text-2xl font-bold">🏢 Company Information</h2>

                <div className="space-y-5">

                  <div>
                    <p className="text-gray-400">Company</p>

                    <p className="mt-1 text-xl font-semibold">{result.analysis.company}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Industry</p>

                    <p className="mt-1 text-xl font-semibold">{result.analysis.industry}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Growth Potential</p>

                    <p className="mt-1 text-xl font-semibold text-green-400">{result.analysis.growthPotential}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">AI Recommendation</p>

                    <p className="mt-1 text-xl font-semibold text-blue-400">{result.analysis.recommendation}</p>
                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-blue-700 bg-blue-900/20 p-6">

                <h2 className="mb-5 text-2xl font-bold">🤖 AI Decision</h2>

                <p className="leading-8 text-gray-300">{result.decision.reason}</p>

              </div>

            </div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">

              <h2 className="mb-5 text-2xl font-bold">📖 Company Overview</h2>

              <p className="leading-8 text-gray-300">{result.analysis.overview}</p>

            </div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">

              <h2 className="mb-5 text-2xl font-bold">📅 Long-Term Outlook</h2>

              <p className="leading-8 text-gray-300">{result.analysis.longTermOutlook}</p>

            </div>

            <div className="mt-10">

              <h2 className="mb-6 text-3xl font-bold">📈 SWOT Analysis</h2>

              <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-green-700 bg-green-900/20 p-6">

                  <h3 className="mb-4 text-xl font-bold text-green-400">✅ Strengths</h3>

                  <ul className="space-y-3 list-disc pl-6">
                    {result.analysis.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                </div>

                <div className="rounded-2xl border border-red-700 bg-red-900/20 p-6">

                  <h3 className="mb-4 text-xl font-bold text-red-400">❌ Weaknesses</h3>

                  <ul className="space-y-3 list-disc pl-6">
                    {result.analysis.weaknesses.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                </div>

                <div className="rounded-2xl border border-blue-700 bg-blue-900/20 p-6">

                  <h3 className="mb-4 text-xl font-bold text-blue-400">🚀 Opportunities</h3>

                  <ul className="space-y-3 list-disc pl-6">
                    {result.analysis.opportunities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                </div>

                <div className="rounded-2xl border border-yellow-700 bg-yellow-900/20 p-6">

                  <h3 className="mb-4 text-xl font-bold text-yellow-400">⚠️ Threats</h3>

                  <ul className="space-y-3 list-disc pl-6">
                    {result.analysis.threats.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                </div>

              </div>

            </div>

            <div id="history" className="mt-12 rounded-2xl border border-slate-700 bg-slate-900 p-6">

              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <h2 className="text-3xl font-bold">🕒 Recent Analysis</h2>

                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
                >
                  Clear History
                </button>

              </div>

              <div className="grid gap-5">

                {history.length === 0 ? (

                  <div className="rounded-xl border border-slate-700 bg-slate-800 p-10 text-center text-gray-400">No analysis history yet.</div>

                ) : (

                  history.map((item, index) => (

                    <div
                      key={index}
                      onClick={() => {
                        setResult(item);
                        setCompany(item.analysis.company);
                      }}
                      className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500 hover:bg-slate-700"
                    >

                      <div className="flex flex-col justify-between gap-4 md:flex-row">

                        <div>

                          <h3 className="text-2xl font-bold">{item.analysis.company}</h3>

                          <p className="mt-2 text-gray-400">{item.analysis.industry}</p>

                        </div>

                        <div className="text-right">

                          <p className={`text-2xl font-bold ${decisionColor(item.decision.decision)}`}>{item.decision.decision}</p>

                          <p className="mt-2">Score : {item.decision.investmentScore}/100</p>

                          <p>Confidence : {item.analysis.confidence}%</p>

                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

            <footer id="about" className="mt-16 border-t border-slate-700 py-8">

              <div className="text-center">

                <h2 className="text-2xl font-bold">📈 InvestIQ AI</h2>

                <p className="mt-3 text-gray-400">AI Investment Research Agent</p>

                <p className="mt-2 text-sm text-gray-500">Powered by Google Gemini • Next.js • TypeScript • Tailwind CSS</p>

              </div>

            </footer>

          </div>

        </div>

      )}

    </main>
  );
}
