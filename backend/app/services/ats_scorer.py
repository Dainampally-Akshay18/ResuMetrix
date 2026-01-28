from typing import Dict, List
import re
from collections import Counter

class ATSScorer:
    """
    Deterministic ATS scoring system
    Score Range: 0-100
    
    Breakdown:
    - Section Completeness: 30 pts
    - Keyword Matching: 35 pts
    - Experience Quality: 25 pts
    - Formatting & Safety: 10 pts
    """
    
    # Common ATS keywords by category
    TECHNICAL_KEYWORDS = {
        "programming": ["python", "java", "javascript", "c++", "c#", "golang", "rust", "typescript"],
        "frontend": ["react", "vue", "angular", "html", "css", "webpack", "next.js"],
        "backend": ["django", "fastapi", "nodejs", "express", "spring", "flask"],
        "database": ["sql", "mysql", "postgresql", "mongodb", "redis", "elasticsearch"],
        "cloud": ["aws", "azure", "gcp", "docker", "kubernetes", "terraform"],
        "tools": ["git", "jenkins", "gitlab", "github", "docker", "terraform"]
    }
    
    def score_resume(self, resume_data: dict, jd_text: str = None) -> dict:
        """
        Main scoring method
        Returns: Complete ATS score breakdown
        """
        
        # Extract resume components
        name = resume_data.get("name", "")
        email = resume_data.get("email", "")
        phone = resume_data.get("phone", "")
        summary = resume_data.get("summary", "")
        skills = resume_data.get("skills", [])
        raw_text = resume_data.get("raw_text", "")
        
        # Calculate section scores
        section_scores = {
            "summary": self._score_summary(summary),
            "skills": self._score_skills(skills),
            "experience": self._score_experience(raw_text),
            "education": self._score_education(raw_text),
            "contact": self._score_contact(name, email, phone)
        }
        
        # Calculate keyword match score
        keyword_score = self._score_keywords(skills, raw_text)
        
        # Calculate formatting score
        formatting_score = self._score_formatting(raw_text)
        
        # JD matching (if provided)
        jd_match = {}
        if jd_text:
            jd_match = self._match_with_jd(skills, raw_text, jd_text)
        
        # Calculate total score (weighted)
        total_score = self._calculate_total_score(section_scores, keyword_score, formatting_score)
        
        return {
            "ats_score": total_score,
            "section_scores": section_scores,
            "keyword_score": keyword_score,
            "formatting_score": formatting_score,
            "jd_match": jd_match,
            "weaknesses": self._identify_weaknesses(section_scores, keyword_score)
        }
    
    def _score_summary(self, summary: str) -> int:
        """
        Score professional summary section
        Max: 30 pts (but normalized to 100 for section)
        """
        score = 0
        
        # Presence (10 pts)
        if summary and len(summary.strip()) > 0:
            score += 10
        
        # Length (10 pts) - ideal 50-200 words
        word_count = len(summary.split())
        if 50 <= word_count <= 200:
            score += 10
        elif 30 <= word_count <= 250:
            score += 5
        
        # Keywords (10 pts) - contains action verbs
        action_verbs = ["led", "managed", "developed", "designed", "implemented", "achieved", "driven"]
        if any(verb in summary.lower() for verb in action_verbs):
            score += 10
        
        return min(score, 100)
    
    def _score_skills(self, skills: List[str]) -> int:
        """
        Score skills section
        Max: 100
        """
        score = 0
        
        # Presence (20 pts)
        if skills and len(skills) > 0:
            score += 20
        
        # Quantity (20 pts) - ideal 10-20 skills
        if 10 <= len(skills) <= 20:
            score += 20
        elif 5 <= len(skills) < 10:
            score += 10
        elif len(skills) > 20:
            score += 15
        
        # Diversity (30 pts) - mix of technical and soft skills
        technical_count = sum(1 for skill in skills if self._is_technical_skill(skill))
        if 0.3 <= (technical_count / max(len(skills), 1)) <= 0.8:
            score += 30
        elif technical_count > 0:
            score += 15
        
        # Relevance (30 pts) - contains known tech keywords
        relevant_skills = sum(1 for skill in skills if self._is_known_keyword(skill))
        relevance_pct = (relevant_skills / max(len(skills), 1)) * 100
        if relevance_pct >= 50:
            score += 30
        elif relevance_pct >= 25:
            score += 15
        
        return min(score, 100)
    
    def _score_experience(self, text: str) -> int:
        """
        Score experience section
        Max: 100
        """
        score = 0
        
        # Check for experience keywords
        exp_keywords = ["experience", "worked", "employed", "project", "responsibility"]
        has_experience = any(keyword in text.lower() for keyword in exp_keywords)
        
        if has_experience:
            score += 30
        
        # Check for metrics/achievements
        metrics_pattern = r"(\d+%|increased|decreased|improved|grew|\$\d+)"
        if re.search(metrics_pattern, text):
            score += 30
        
        # Check for duration indicators
        duration_pattern = r"(\d+\s+(?:years?|months?))"
        if re.search(duration_pattern, text):
            score += 20
        
        # Check for job titles
        job_titles = ["manager", "engineer", "developer", "analyst", "specialist", "lead", "architect"]
        if any(title in text.lower() for title in job_titles):
            score += 20
        
        return min(score, 100)
    
    def _score_education(self, text: str) -> int:
        """
        Score education section
        Max: 100
        """
        score = 0
        
        # Check for education keywords
        edu_keywords = ["degree", "bachelor", "master", "phd", "university", "college", "institute"]
        has_education = any(keyword in text.lower() for keyword in edu_keywords)
        
        if has_education:
            score += 40
        
        # Check for major/field
        field_keywords = ["computer science", "engineering", "information technology", "business", "mathematics"]
        if any(field in text.lower() for field in field_keywords):
            score += 30
        
        # Check for graduation year
        year_pattern = r"(20\d{2}|19\d{2})"
        if re.search(year_pattern, text):
            score += 30
        
        return min(score, 100)
    
    def _score_contact(self, name: str, email: str, phone: str) -> int:
        """
        Score contact information
        Max: 100
        """
        score = 0
        
        if name and len(name.strip()) > 0:
            score += 30
        if email and "@" in email:
            score += 35
        if phone and len(phone.replace("-", "").replace(" ", "")) >= 10:
            score += 35
        
        return min(score, 100)
    
    def _score_keywords(self, skills: List[str], text: str) -> int:
        """
        Score keyword presence (35 pts in total)
        Normalized to 100
        """
        score = 0
        text_lower = text.lower()
        
        # Count known technical keywords
        keyword_count = 0
        for category, keywords in self.TECHNICAL_KEYWORDS.items():
            keyword_count += sum(1 for keyword in keywords if keyword in text_lower)
        
        # Scoring based on keyword density
        if keyword_count >= 15:
            score += 40
        elif keyword_count >= 10:
            score += 30
        elif keyword_count >= 5:
            score += 20
        elif keyword_count >= 2:
            score += 10
        
        # Bonus for industry-specific keywords
        if self._has_industry_keywords(text):
            score += 20
        
        # Penalty for keyword stuffing
        if keyword_count > 50:
            score -= 10
        
        return min(score, 100)
    
    def _score_formatting(self, text: str) -> int:
        """
        Score formatting & safety (10 pts in total)
        Normalized to 100
        """
        score = 50  # Base score
        
        # Check for reasonable length
        word_count = len(text.split())
        if 300 <= word_count <= 1500:
            score += 25
        elif word_count > 100:
            score += 15
        
        # Check for special characters/corruption
        special_char_ratio = sum(1 for c in text if not c.isalnum() and c not in " \n\t.,()-:") / max(len(text), 1)
        if special_char_ratio < 0.05:
            score += 25
        elif special_char_ratio > 0.2:
            score -= 20
        
        return min(score, 100)
    
    def _calculate_total_score(self, section_scores: dict, keyword_score: int, formatting_score: int) -> int:
        """
        Calculate weighted total ATS score (0-100)
        
        Weights:
        - Section Completeness: 30%
        - Keyword Matching: 35%
        - Experience Quality: 25%
        - Formatting: 10%
        """
        # Average section scores (30 pts)
        section_avg = sum(section_scores.values()) / len(section_scores) * 0.3
        
        # Keyword score (35 pts)
        keyword_weighted = keyword_score * 0.35
        
        # Experience score (25 pts)
        experience_weighted = section_scores.get("experience", 0) * 0.25
        
        # Formatting score (10 pts)
        formatting_weighted = formatting_score * 0.10
        
        total = section_avg + keyword_weighted + experience_weighted + formatting_weighted
        
        return int(min(total, 100))
    
    def _identify_weaknesses(self, section_scores: dict, keyword_score: int) -> List[dict]:
        """
        Identify weak sections for AI feedback
        """
        weaknesses = []
        
        for section, score in section_scores.items():
            if score < 50:
                weaknesses.append({
                    "section": section,
                    "score": score,
                    "severity": "critical" if score < 30 else "high"
                })
            elif score < 70:
                weaknesses.append({
                    "section": section,
                    "score": score,
                    "severity": "medium"
                })
        
        if keyword_score < 50:
            weaknesses.append({
                "section": "keywords",
                "score": keyword_score,
                "severity": "critical" if keyword_score < 30 else "high"
            })
        
        return sorted(weaknesses, key=lambda x: x["score"])
    
    def _match_with_jd(self, skills: List[str], text: str, jd_text: str) -> dict:
        """
        Match resume with job description
        """
        jd_lower = jd_text.lower()
        resume_lower = text.lower()
        
        # Extract JD keywords
        jd_keywords = self._extract_keywords(jd_text)
        
        # Calculate match percentage
        matching_keywords = sum(1 for keyword in jd_keywords if keyword in resume_lower)
        match_percentage = (matching_keywords / max(len(jd_keywords), 1)) * 100
        
        # Identify missing keywords
        missing_keywords = [kw for kw in jd_keywords if kw not in resume_lower]
        
        return {
            "match_percentage": int(match_percentage),
            "matching_keywords": matching_keywords,
            "total_jd_keywords": len(jd_keywords),
            "missing_keywords": missing_keywords[:10]  # Top 10 missing
        }
    
    def _is_technical_skill(self, skill: str) -> bool:
        """Check if skill is technical"""
        technical_terms = ["python", "java", "sql", "aws", "docker", "react", "api", "git"]
        return any(term in skill.lower() for term in technical_terms)
    
    def _is_known_keyword(self, skill: str) -> bool:
        """Check if skill is a known industry keyword"""
        for keywords in self.TECHNICAL_KEYWORDS.values():
            if any(keyword in skill.lower() for keyword in keywords):
                return True
        return False
    
    def _has_industry_keywords(self, text: str) -> bool:
        """Check for industry-specific keywords"""
        industry_keywords = ["agile", "scrum", "ci/cd", "devops", "microservices", "rest api", "sql", "nosql"]
        return any(keyword in text.lower() for keyword in industry_keywords)
    
    def _extract_keywords(self, text: str) -> List[str]:
        """Extract important keywords from text"""
        # Simple keyword extraction (can be enhanced)
        words = re.findall(r'\b[a-z+#]+\b', text.lower())
        return list(set(words))