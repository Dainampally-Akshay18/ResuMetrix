from PyPDF2 import PdfReader
from docx import Document
from ..models.resume import ResumeData, Experience, Education
import io
import re

class ResumeParser:
    """
    Parse PDF/DOCX resumes and extract structured data
    """
    
    def parse(self, file_content: bytes, filename: str) -> dict:
        """
        Main parsing method
        """
        if filename.endswith(".pdf"):
            text = self._parse_pdf(file_content)
        elif filename.endswith(".docx"):
            text = self._parse_docx(file_content)
        else:
            raise ValueError("Unsupported file format. Only PDF and DOCX allowed")
        
        # Normalize and structure the text
        resume_data = self._normalize_resume(text)
        
        return resume_data.model_dump()
    
    def _parse_pdf(self, content: bytes) -> str:
        """Extract text from PDF"""
        pdf = PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
        return text
    
    def _parse_docx(self, content: bytes) -> str:
        """Extract text from DOCX"""
        doc = Document(io.BytesIO(content))
        text = "\n".join([para.text for para in doc.paragraphs])
        return text
    
    def _normalize_resume(self, text: str) -> ResumeData:
        """
        Normalize resume text into structured JSON
        """
        lines = text.split("\n")
        
        # Extract email
        email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        email = None
        for line in lines:
            match = re.search(email_pattern, line)
            if match:
                email = match.group()
                break
        
        # Extract phone
        phone_pattern = r"(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
        phone = None
        for line in lines:
            match = re.search(phone_pattern, line)
            if match:
                phone = match.group()
                break
        
        # Extract name (usually first line)
        name = lines[0].strip() if lines else None
        
        # Extract skills, summary, experience, education
        skills = self._extract_skills(text)
        summary = self._extract_summary(text)
        
        resume_data = ResumeData(
            name=name,
            email=email,
            phone=phone,
            summary=summary,
            skills=skills,
            raw_text=text
        )
        
        return resume_data
    
    def _extract_skills(self, text: str) -> list:
        """Extract skills section"""
        skills_pattern = r"(?:Skills|Technical Skills)(.*?)(?:\n\n|Experience|Education|$)"
        match = re.search(skills_pattern, text, re.IGNORECASE | re.DOTALL)
        
        if match:
            skills_text = match.group(1)
            # Split by comma, bullet points, or newlines
            skills = re.split(r"[,•\n]", skills_text)
            return [s.strip() for s in skills if s.strip()]
        return []
    
    def _extract_summary(self, text: str) -> str:
        """Extract professional summary"""
        summary_pattern = r"(?:Summary|Professional Summary|About)(.*?)(?:\n\n|Skills|Experience|$)"
        match = re.search(summary_pattern, text, re.IGNORECASE | re.DOTALL)
        
        if match:
            return match.group(1).strip()
        return ""