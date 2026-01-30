## 📄 **AI Resume Analyzer — Product Requirement Document (PRD)**

## **1. Product Overview**

**Product Name:** AI Resume Analyzer

**Goal:**
Help users understand how well their resume performs in Applicant Tracking Systems (ATS) and provide **clear, actionable improvements** using:

* Deterministic scoring (backend)
* AI-powered explanations (LLM, no scoring authority)

---

## **2. Problem Statement**

* Job seekers do not know **why** their resumes fail ATS filters
* Existing tools provide **vague, inconsistent, or magical scores**
* Users want **clarity and logic**, not black-box AI decisions

---

## **3. Solution Summary**

* ATS scoring is **fully deterministic** and handled by the backend
* AI is used **only for explanations and suggestions**, never for scoring
* Clean, minimal UI with a **context-aware chatbot**

---

## **4. Target Users**

* Students and early-career professionals
* Tech job seekers
* Hackathon judges and recruiters (secondary users)

---

## **5. Functional Requirements**

### **5.1 Resume Upload & Parsing**

* Accept file formats:

  * PDF
  * DOCX
* Extract key sections:

  * Summary
  * Skills
  * Experience
  * Education
* Normalize extracted content into **structured JSON**

---

### **5.2 ATS Score Generation (Deterministic)**

* Score range: **0–100**
* Backend computes scores based on:

  * Keyword coverage
  * Section completeness
  * Formatting heuristics

**Sample Output:**

```json
{
  "ats_score": 72,
  "breakdown": {
    "keywords": 30,
    "sections": 25,
    "formatting": 17
  }
}
```

🚫 **LLM must not decide scores**

---

### **5.3 Section-wise Scoring**

**Sections evaluated:**

* Summary
* Skills
* Experience
* Education

Each section is scored **out of 100** using backend rules:

* Presence
* Length
* Relevance signals

Used for **radial progress bars** in the UI.

---

### **5.4 Job Description Matching (Optional)**

* User provides a Job Description (JD)
* Backend:

  * Extracts JD keywords
  * Calculates keyword overlap percentage
* LLM:

  * Explains alignment
  * Highlights gaps

---

### **5.5 AI Resume Feedback**

LLM provides:

* High-level resume critique
* Explanation behind low scores
* Identification of weak sections

**LLM Inputs include:**

* Resume content
* Deterministic scores
* JD match data (if available)

---

### **Backend Design & Execution Plan (Start)**

#### **High-Level Architecture**

```
Resume Upload
   ↓
Resume Parser
   ↓
Resume Normalizer (JSON)
   ↓
──────── Parallel Execution ────────
↓                                  ↓
ATS & Section Scoring          AI Analysis
(Deterministic)               (LangChain)
↓                                  ↓
────────────── Merge Results ─────────────
                ↓
        Response to Frontend
```
Perfect, continuing 👍
Here are **Pages 6–10** of your PRD, cleanly extracted and structured.



## **2.3 LangChain Layer**

The LangChain layer is **strictly limited** to explanation and reasoning tasks.

### **Uses of LangChain**

* Explaining ATS and section-wise scores
* Suggesting resume improvements
* Explaining Job Description (JD) gaps
* Handling chatbot responses

### **LLM Input Always Includes**

* Structured Resume JSON
* Deterministic scores (ATS + section-wise)
* Constraints and refusal rules

🚫 **No scoring logic is allowed inside prompts**

---

## **3. API Design**

### **API Endpoint 1 – Core Scoring**

**Trigger:** Automatically on page load

**Responsibilities:**

* Calculate ATS score
* Generate section-wise scores
* Perform JD matching (if JD is provided)

**Response Structure:**

```json
{
  "ats_score": 72,
  "section_scores": {...},
  "jd_match": {...}
}
```

---

### **API Endpoint 2 – AI Analysis**

**Trigger:** Runs in parallel with Core Scoring

**Responsibilities:**

* AI-generated resume feedback
* Section-wise improvement suggestions
* Keyword optimization suggestions

**Implementation:**

* Uses LangChain prompt templates
* Receives only precomputed backend data

---

### **API Endpoint 3 – Chatbot**

**Trigger:** Only when the user sends a message

**Responsibilities:**

* Context-aware resume Q&A
* Uses:

  * Resume JSON
  * Scores
  * Previous AI analysis

🚫 **Strict refusal policy** for unrelated or generic questions.

---

## **4. Parallel Execution Strategy**

* API Endpoint 1 and Endpoint 2 run **independently**
* Resume parsing output is:

  * Cached in memory
  * Shared between both endpoints
* Backend stack:

  * Async FastAPI
  * Background tasks for AI calls
* Frontend merges responses once both complete

---

## **5. Prompt Strategy (LangChain)**

Each feature uses a **separate prompt template**, but all prompts follow these rules:

* ❌ No scoring logic in prompts
* ✅ All numeric values injected as variables
* ✅ Clear refusal instructions
* ✅ Explanation-focused only

---



## **Final Engineering Verdict**

This system is designed as a **real-world, defensible architecture**, not a demo project.

### **Key Strengths**

* Deterministic scoring logic
* Responsible AI usage
* Clean API separation
* Minimal, purpose-driven UI

**If implemented as designed:**

* Hackathon impact: **Strong**
* Resume value: **High**
* System architecture: **Defensible**

---

## **ATS Scoring Algorithm — Detailed Design (Start)**

### **Design Principles (Non-Negotiable)**

1. **Deterministic**
   Same resume + same JD = same score every time

2. **Explainable**
   Every point must have a clear reason

3. **ATS-Inspired, not ATS-Copied**
   Simulates ATS behavior without reverse-engineering proprietary systems

4. **LLM Never Decides Numbers**
   AI explains results only

---

## **High-Level Score Breakdown (100 Points)**

| Component               | Weight  |
| ----------------------- | ------- |
| Section Completeness    | 30      |
| Keyword Matching        | 35      |
| Experience Quality      | 25      |
| Formatting & ATS Safety | 10      |
| **Total**               | **100** |

**Rationale:**

* Keywords matter most
* Sections matter second
* Formatting matters least (but still matters)



## **SECTION COMPLETENESS SCORE (30 Points)**

### **Sections Evaluated (4)**

* Summary
* Skills
* Experience
* Education

Each section is scored independently out of **100**, then normalized.

---

### **Summary Section (Out of 100)**

| Rule                           | Points |
| ------------------------------ | ------ |
| Section exists                 | 30     |
| Length between 40–120 words    | 40     |
| Role-relevant keywords present | 30     |

---

### **Skills Section (Out of 100)**

| Rule                    | Points |
| ----------------------- | ------ |
| Section exists          | 20     |
| ≥ 8 skills listed       | 40     |
| Skills are job-relevant | 40     |

---

### **Experience Section (Out of 100)**

| Rule                                | Points |
| ----------------------------------- | ------ |
| Section exists                      | 25     |
| Bullet points present               | 25     |
| Action verbs used                   | 25     |
| Quantification present (%, numbers) | 25     |

---

### **Education Section (Out of 100)**

| Rule                       | Points |
| -------------------------- | ------ |
| Section exists             | 40     |
| Degree mentioned           | 30     |
| Institution + year present | 30     |

---

### **Section Completeness Formula**

```text
section_completeness_score =
(summary_score +
 skills_score +
 experience_score +
 education_score) / 4

final_section_score =
(section_completeness_score / 100) * 30
```

📌 These raw section scores also power the **four radial progress bars** in the UI.

---

## **KEYWORD MATCHING SCORE (35 Points)**

This is the **most important ATS factor**.

### **Keyword Sources**

* Resume keywords (skills + experience)
* Job Description keywords (if provided)

### **Normalization Process**

* Lowercasing
* Lemmatization
* Stopword removal

---

### **If Job Description IS Provided**

| Metric                   | Weight |
| ------------------------ | ------ |
| Exact keyword match      | 60%    |
| Partial / semantic match | 40%    |

```text
match_ratio = matched_keywords / total_jd_keywords
keyword_score = min(match_ratio * 100, 100)
final_keyword_score = (keyword_score / 100) * 35
```

---

### **If Job Description is NOT Provided**

Fallback deterministic strategy:

* Role-agnostic ATS keywords
* Tech stack relevance
* Skill density heuristics

⚠️ Still **fully deterministic**

🚫 **Important Rule**
LLM must NOT decide missing keywords.
Backend computes missing keywords; LLM only explains why they matter.

---

## **EXPERIENCE QUALITY SCORE (25 Points)**

ATS systems look for **impact signals**, not just years.

### **Signals Evaluated**

| Signal                     | Points |
| -------------------------- | ------ |
| Total experience ≥ 1 year  | 5      |
| ≥ 3 bullet points per role | 5      |
| Action verbs used          | 5      |
| Metrics / numbers present  | 5      |
| Role relevance to JD       | 5      |

```text
experience_score = sum(signal_scores)
final_experience_score = (experience_score / 25) * 25
```

Simple, explainable, ATS-aligned.

---

## **FORMATTING & ATS SAFETY SCORE (10 Points)**

Catches **silent ATS killers**.

### **Formatting Checks**

| Check                    | Points |
| ------------------------ | ------ |
| Single-column layout     | 2      |
| No tables / text boxes   | 2      |
| Standard fonts           | 2      |
| Section headers detected | 2      |
| No images / icons        | 2      |

⚠️ Formatting failures can cap the ATS score.

---

## **FINAL ATS SCORE CALCULATION**

```text
ATS_SCORE =
section_score +
keyword_score +
experience_score +
formatting_score
```

* Final score is clamped between **0–100**

---

## **OUTPUT STRUCTURE (IMPORTANT)**

Backend returns structured, explainable JSON:

```json
{
  "ats_score": 72,
  "scores": {
    "sections": {
      "summary": 65,
      "skills": 80,
      "experience": 70,
      "education": 90
    },
    "keywords": 68,
    "experience_quality": 60,
    "formatting": 8
  },
  "weaknesses": [
    "Missing role-specific keywords",
    "Experience lacks quantifiable impact"
  ]
}
```

This feeds:

* UI
* LangChain prompts
* Chatbot context

---

## **ROLE OF LLM (CLEAR BOUNDARY)**

### **LLM Gets**

* Scores
* Missing keywords
* Section weaknesses

### **LLM Does**

* Explain why scores are low
* Suggest improvements
* Rewrite text **only on user request**

### **LLM NEVER**

* Calculates numbers
* Adjusts scores
* Decides pass/fail





