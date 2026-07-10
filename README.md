# 📈 InvestIQ AI – AI Investment Research Agent

InvestIQ AI is a multi-agent AI-powered investment research platform that analyzes publicly listed companies and generates intelligent investment recommendations. The application leverages Google's Gemini LLM to perform company research, SWOT analysis, risk assessment, and final BUY/HOLD/PASS recommendations through a modular AI agent architecture.

---

# 🚀 Overview

InvestIQ AI helps users evaluate companies by combining Large Language Models with rule-based AI agents.

Given a company name, the application:

- 🔍 Researches the company using Google's Gemini AI
- 🏢 Identifies industry and business overview
- 📊 Performs SWOT Analysis
- ⚠️ Calculates investment risk
- 🤖 Generates a BUY / HOLD / PASS recommendation
- 🎯 Calculates an Investment Score and Confidence Score
- 📄 Generates a complete investment report
- 🕒 Stores recent analysis history locally

The project is designed to demonstrate how multiple AI agents can collaborate to solve a real-world investment research problem.

---

# 🛠 Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Google Gemini API
- Local Storage
- Multi-Agent Architecture

---

# ▶️ How to Run

## 1. Clone Repository

```bash
git clone https://github.com/MDMEHFOOZALAM/InvestIQ-AI.git

cd InvestIQ-AI
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment Variable

Create a file named:

```
.env.local
```

Add your Gemini API key:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

You can obtain an API key from:

https://aistudio.google.com/app/apikey

## 4. Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🧠 How It Works

The application follows a multi-agent workflow.

```
User
   │
   ▼
Research Agent
   │
   ▼
Validation Agent
   │
   ▼
Risk Agent
   │
   ▼
Decision Agent
   │
   ▼
Report Generator
   │
   ▼
Frontend Dashboard
```

---

## 🔍 Research Agent

Responsibilities:

- Sends prompts to Gemini AI
- Retrieves structured company information
- Returns JSON response

Output includes:

- Company Overview
- Industry
- SWOT Analysis
- Growth Potential
- Long-Term Outlook
- Recommendation
- Confidence

---

## ✅ Validation Agent

Validates and sanitizes Gemini's output.

Responsibilities:

- Ensures required fields exist
- Applies default values
- Validates confidence score
- Prevents malformed JSON from breaking the application

---

## ⚠️ Risk Agent

Calculates an overall investment risk score using rule-based analysis.

It evaluates factors such as:

- Competition
- Market conditions
- Regulation
- Debt
- Technology
- Financial concerns

Outputs:

- Risk Score
- Risk Level

---

## 🤖 Decision Agent

Combines:

- Gemini Recommendation
- Confidence Score
- Growth Potential
- Risk Score

to generate:

- Investment Score
- BUY / HOLD / PASS recommendation
- Human-readable explanation

---

# 🏗 Project Structure

```
app/
│
├── api/
│   └── analyze/
│
agents/
│   ├── researchAgent.ts
│   ├── validationAgent.ts
│   ├── riskAgent.ts
│   ├── decisionAgent.ts
│   └── reportAgent.ts
│
lib/
│   ├── gemini.ts
│   ├── prompts.ts
│   ├── pdf.ts
│   └── storage.ts
│
types/
│   └── analysis.ts
```

---

# 💡 Key Design Decisions & Trade-offs

### Why Gemini?

Gemini provides fast responses, structured JSON generation, and seamless integration with Google's Generative AI SDK.

### Why Multi-Agent Architecture?

Instead of relying on a single prompt, the application separates responsibilities into specialized agents.

Benefits:

- Modular
- Easier debugging
- Better scalability
- Clear separation of concerns

### Rule-Based Risk Analysis

Instead of allowing the LLM to determine the final investment decision directly, a rule-based Risk Agent calculates a consistent risk score.

This improves explainability and makes the recommendation process easier to understand.

### Trade-offs

Current version does not include:

- Live stock prices
- Financial statements
- Real-time market news
- Historical stock charts

These were intentionally excluded to keep the project focused on AI-driven investment reasoning.

---

# 📊 Example Runs

## Example 1

### Company

Apple

### Output

```
Decision: BUY

Investment Score: 91

Confidence: 92%

Risk: Medium
```

---

## Example 2

### Company

Microsoft

### Output

```
Decision: BUY

Investment Score: 89

Confidence: 90%

Risk: Low
```

---

## Example 3

### Company

Tesla

### Output

```
Decision: HOLD

Investment Score: 71

Confidence: 75%

Risk: Medium
```

---

# 🚀 Future Improvements

With more development time, the following enhancements would be added:

- Yahoo Finance integration
- Live stock price tracking
- Financial ratio analysis
- SEC filing analysis
- News sentiment analysis
- Portfolio comparison
- Authentication
- Database for storing reports
- Interactive charts
- Report sharing
- Export to PDF with charts
- Multi-company comparison

---

# 🤖 LLM Development Process (Bonus)

This project was developed with assistance from Google's Gemini API for company analysis and ChatGPT for architectural guidance, UI refinement, debugging, and iterative development.

The development process involved:

- Prompt engineering
- Multi-agent architecture design
- Validation strategy
- Frontend improvements
- Decision engine refinement
- Risk analysis logic
- Error handling
- UI/UX enhancements

LLM interactions were used as a development assistant while all integration, debugging, architecture decisions, and implementation were completed by the developer.

---

# 📸 Screenshots

(Add screenshots here)

- Landing Page
- Dashboard
- SWOT Analysis
- Investment Report
- Analysis History

---

# 👨‍💻 Author

**Md Mehfooz Alam**

B.Tech Computer Science Engineering

Lovely Professional University

GitHub:
https://github.com/MDMEHFOOZALAM

---

# 📄 License

This project is developed for educational and internship assignment purposes.
