from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List
import json
from app.config import settings

class ResumeFeedback(BaseModel):
    """AI Feedback structure"""
    overall_critique: str = Field(description="High-level critique of the resume")
    strengths: List[str] = Field(description="Resume strengths")
    weaknesses: List[str] = Field(description="Resume weaknesses")
    score_reasoning: str = Field(description="Explanation of ATS score")

class SectionImprovement(BaseModel):
    """Section-wise improvement suggestions"""
    section: str = Field(description="Section name")
    current_quality: str = Field(description="Assessment of current section")
    suggestions: List[str] = Field(description="Specific improvement suggestions")

class KeywordSuggestions(BaseModel):
    """Keyword optimization suggestions"""
    missing_keywords: List[str] = Field(description="Missing ATS keywords")
    suggested_additions: List[str] = Field(description="Keywords to add to resume")
    reasoning: str = Field(description="Why these keywords matter")

class AIAnalyser:
    """
    AI-powered resume analysis using LangChain + Groq
    LLM only explains scores, never decides them (deterministic backend decides)
    """
    
    def __init__(self):
        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            api_key=settings.GROQ_API_KEY,
            temperature=0.3  # Low temp for consistent output
        )
    
    async def analyze_resume(self, resume_data: dict, ats_scores: dict) -> dict:
        """
        Comprehensive resume analysis
        Combines ATS scores with AI insights
        """
        
        feedback = await self._get_feedback(resume_data, ats_scores)
        section_improvements = await self._get_section_improvements(resume_data, ats_scores)
        keyword_suggestions = await self._get_keyword_suggestions(resume_data, ats_scores)
        
        return {
            "feedback": feedback,
            "section_improvements": section_improvements,
            "keyword_suggestions": keyword_suggestions
        }
    
    async def _get_feedback(self, resume_data: dict, ats_scores: dict) -> dict:
        """
        Get high-level feedback from LLM
        Explain the ATS score, not decide it
        """
        
        prompt = ChatPromptTemplate.from_template(
            """You are an expert ATS consultant and career coach.
            
Resume Data:
Name: {name}
Email: {email}
Summary: {summary}
Skills: {skills}

ATS Scores (Already Calculated by Deterministic System):
- Overall ATS Score: {ats_score}/100
- Summary Score: {summary_score}/100
- Skills Score: {skills_score}/100
- Experience Score: {experience_score}/100
- Education Score: {education_score}/100

Your task:
1. Provide a HIGH-LEVEL CRITIQUE (2-3 sentences) explaining what the resume does well and what needs improvement
2. List 3-4 STRENGTHS observed in the resume
3. List 3-4 WEAKNESSES preventing higher ATS score
4. Explain the SCORE REASONING (why it got {ats_score}/100, NOT changing the score)

Keep it concise, actionable, and focus on explaining the deterministic score.

Respond in JSON format:
{{
    "overall_critique": "...",
    "strengths": ["...", "...", "..."],
    "weaknesses": ["...", "...", "..."],
    "score_reasoning": "..."
}}"""
        )
        
        parser = JsonOutputParser(pydantic_object=ResumeFeedback)
        
        chain = prompt | self.llm | parser
        
        result = await chain.ainvoke({
            "name": resume_data.get("name", "N/A"),
            "email": resume_data.get("email", "N/A"),
            "summary": resume_data.get("summary", "N/A")[:500],
            "skills": ", ".join(resume_data.get("skills", [])[:15]),
            "ats_score": ats_scores.get("ats_score", 0),
            "summary_score": ats_scores.get("section_scores", {}).get("summary", 0),
            "skills_score": ats_scores.get("section_scores", {}).get("skills", 0),
            "experience_score": ats_scores.get("section_scores", {}).get("experience", 0),
            "education_score": ats_scores.get("section_scores", {}).get("education", 0),
        })
        
        return result
    
    async def _get_section_improvements(self, resume_data: dict, ats_scores: dict) -> List[dict]:
        """
        Get section-wise improvement suggestions
        """
        
        prompt = ChatPromptTemplate.from_template(
            """You are a resume optimization expert.

For the {section} section of a resume:

Current Content: {content}
Current Score: {score}/100
Weakness Identified: {weakness}

Provide 3-4 SPECIFIC, ACTIONABLE improvements to strengthen this section.
Do NOT rewrite the entire section.
Focus on what's missing or weak.

Respond in JSON format:
{{
    "section": "{section}",
    "current_quality": "Brief assessment of current state",
    "suggestions": [
        "Specific suggestion 1",
        "Specific suggestion 2",
        "Specific suggestion 3"
    ]
}}"""
        )
        
        parser = JsonOutputParser(pydantic_object=SectionImprovement)
        chain = prompt | self.llm | parser
        
        weaknesses = ats_scores.get("weaknesses", [])
        improvements = []
        
        for weakness in weaknesses[:3]:  # Top 3 weaknesses
            section = weakness.get("section")
            score = weakness.get("score")
            
            content_map = {
                "summary": resume_data.get("summary", "")[:300],
                "skills": ", ".join(resume_data.get("skills", [])[:10]),
                "experience": resume_data.get("raw_text", "")[:500],
                "education": resume_data.get("raw_text", "")[:500]
            }
            
            result = await chain.ainvoke({
                "section": section,
                "content": content_map.get(section, ""),
                "score": score,
                "weakness": weakness.get("severity", "medium")
            })
            
            improvements.append(result)
        
        return improvements
    
    async def _get_keyword_suggestions(self, resume_data: dict, ats_scores: dict) -> dict:
        """
        Suggest missing ATS keywords
        """
        
        missing_keywords = ats_scores.get("jd_match", {}).get("missing_keywords", [])
        current_skills = resume_data.get("skills", [])
        
        prompt = ChatPromptTemplate.from_template(
            """You are an ATS keyword optimization expert.

Current Resume Skills: {current_skills}
Current Keyword Score: {keyword_score}/100

If missing JD keywords: {missing_keywords}

Suggest 5-7 ADDITIONAL keywords/skills that would:
1. Improve ATS keyword matching
2. Be relevant to tech industry
3. Be natural to include in a resume

Explain why these keywords matter for ATS systems.

Respond in JSON format:
{{
    "missing_keywords": {missing_keywords},
    "suggested_additions": [
        "Keyword 1",
        "Keyword 2",
        ...
    ],
    "reasoning": "Why these keywords matter for ATS and recruiters"
}}"""
        )
        
        parser = JsonOutputParser(pydantic_object=KeywordSuggestions)
        chain = prompt | self.llm | parser
        
        result = await chain.ainvoke({
            "current_skills": ", ".join(current_skills[:15]),
            "keyword_score": ats_scores.get("keyword_score", 0),
            "missing_keywords": missing_keywords[:5] if missing_keywords else "None detected"
        })
        
        return result