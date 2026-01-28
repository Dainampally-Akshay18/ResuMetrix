from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage
from typing import List, Dict
from app.config import settings

class Message:
    """Message structure for conversation history"""
    def __init__(self, role: str, content: str):
        self.role = role  # "user" or "assistant"
        self.content = content

class ResumeContextChatbot:
    """
    Context-aware chatbot that answers questions about the user's resume.
    Only responds to resume-related queries.
    """
    
    def __init__(self):
        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            api_key=settings.GROQ_API_KEY,
            temperature=0.5  # Moderate temperature for natural conversation
        )
        self.conversation_history: List[Dict] = []
        self.resume_context = None
        self.ats_scores = None
    
    def set_resume_context(self, resume_data: dict, ats_scores: dict = None):
        """
        Set resume context for the chatbot
        This is called after resume upload and scoring
        """
        self.resume_context = resume_data
        self.ats_scores = ats_scores
    
    async def chat(self, user_message: str) -> Dict:
        """
        Main chat method
        Returns: AI response with relevance check
        """
        
        # Check if question is resume-related
        is_relevant = await self._check_relevance(user_message)
        
        if not is_relevant:
            return {
                "status": "error",
                "message": "I can only answer questions about your resume. Please ask something related to your resume, skills, or ATS score.",
                "relevant": False
            }
        
        # Add user message to history
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })
        
        # Get AI response
        ai_response = await self._generate_response(user_message)
        
        # Add AI response to history
        self.conversation_history.append({
            "role": "assistant",
            "content": ai_response
        })
        
        return {
            "status": "success",
            "message": ai_response,
            "relevant": True,
            "conversation_length": len(self.conversation_history)
        }
    
    async def _check_relevance(self, user_message: str) -> bool:
        """
        Check if the question is resume-related
        Uses LLM for intelligent relevance detection
        """
        
        relevance_prompt = ChatPromptTemplate.from_template(
            """Is the following question related to a resume, job search, ATS, skills, experience, or career?

Question: "{question}"

Answer with ONLY "yes" or "no" (lowercase, no explanation)."""
        )
        
        chain = relevance_prompt | self.llm
        
        result = await chain.ainvoke({"question": user_message})
        
        response_text = result.content.strip().lower()
        return "yes" in response_text
    
    async def _generate_response(self, user_message: str) -> str:
        """
        Generate contextual response based on resume
        """
        
        # Build context string from resume data
        context = self._build_resume_context_string()
        
        # Build conversation history for context
        history_str = self._build_conversation_history()
        
        response_prompt = ChatPromptTemplate.from_template(
            """You are a helpful career advisor assistant that helps job seekers optimize their resumes.

RESUME CONTEXT (User's Resume Information):
{resume_context}

CONVERSATION HISTORY:
{history}

IMPORTANT RULES:
1. Only answer questions about the user's resume, skills, experience, or job search
2. Be specific and reference actual content from their resume when possible
3. Provide actionable advice
4. Keep responses concise (2-3 sentences, max 150 words)
5. If asked about something not in their resume, suggest adding it
6. Never provide generic career advice unrelated to their resume
7. Be encouraging but honest about areas for improvement

User Question: {question}

Provide a helpful, specific response:"""
        )
        
        chain = response_prompt | self.llm
        
        result = await chain.ainvoke({
            "resume_context": context,
            "history": history_str,
            "question": user_message
        })
        
        return result.content.strip()
    
    def _build_resume_context_string(self) -> str:
        """
        Build a formatted string of resume context
        """
        if not self.resume_context:
            return "No resume uploaded yet"
        
        context = []
        
        # Basic info
        context.append(f"Name: {self.resume_context.get('name', 'N/A')}")
        context.append(f"Email: {self.resume_context.get('email', 'N/A')}")
        context.append(f"Phone: {self.resume_context.get('phone', 'N/A')}")
        
        # Summary
        summary = self.resume_context.get('summary', '')
        if summary:
            context.append(f"\nProfessional Summary:\n{summary[:300]}")
        
        # Skills
        skills = self.resume_context.get('skills', [])
        if skills:
            context.append(f"\nSkills: {', '.join(skills[:20])}")
        
        # ATS Scores (if available)
        if self.ats_scores:
            context.append(f"\nATS Score: {self.ats_scores.get('ats_score', 'N/A')}/100")
            section_scores = self.ats_scores.get('section_scores', {})
            if section_scores:
                context.append(f"Section Scores: Summary={section_scores.get('summary', 0)}, Skills={section_scores.get('skills', 0)}, Experience={section_scores.get('experience', 0)}, Education={section_scores.get('education', 0)}")
        
        return "\n".join(context)
    
    def _build_conversation_history(self) -> str:
        """
        Build conversation history for context
        Keep last 3 exchanges to maintain context without token overflow
        """
        if not self.conversation_history:
            return "No previous conversation"
        
        # Keep last 6 messages (3 exchanges)
        recent_history = self.conversation_history[-6:]
        
        history_str = []
        for msg in recent_history:
            role = "User" if msg["role"] == "user" else "Assistant"
            history_str.append(f"{role}: {msg['content'][:200]}")
        
        return "\n".join(history_str)
    
    def clear_history(self):
        """Clear conversation history"""
        self.conversation_history = []
    
    def get_history(self) -> List[Dict]:
        """Get full conversation history"""
        return self.conversation_history