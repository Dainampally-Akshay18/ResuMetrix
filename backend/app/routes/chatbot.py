from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ..services.chatbot import ResumeContextChatbot
from .document import resume_storage

router = APIRouter()

# Global chatbot instance (stores conversation history per session)
chatbot_instance = ResumeContextChatbot()

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    status: str
    message: str
    relevant: Optional[bool] = None
    conversation_length: Optional[int] = None

@router.post("/ask")
async def ask_question(chat_request: ChatRequest) -> ChatResponse:
    """
    Ask a question about the resume
    Requires: Uploaded resume
    """
    if "current_resume" not in resume_storage:
        raise HTTPException(status_code=404, detail="No resume uploaded yet. Please upload a resume first.")
    
    # Set resume context if not already set
    resume_data = resume_storage["current_resume"]
    ats_scores = resume_storage.get("current_scores")
    
    chatbot_instance.set_resume_context(resume_data, ats_scores)
    
    # Get response from chatbot
    response = await chatbot_instance.chat(chat_request.message)
    
    return ChatResponse(
        status=response.get("status"),
        message=response.get("message"),
        relevant=response.get("relevant"),
        conversation_length=response.get("conversation_length")
    )

@router.get("/history")
async def get_conversation_history() -> dict:
    """
    Get full conversation history
    """
    history = chatbot_instance.get_history()
    
    return {
        "status": "success",
        "conversation_length": len(history),
        "history": history
    }

@router.delete("/clear-history")
async def clear_conversation_history() -> dict:
    """
    Clear conversation history
    """
    chatbot_instance.clear_history()
    
    return {
        "status": "success",
        "message": "Conversation history cleared"
    }

@router.post("/reset")
async def reset_chatbot() -> dict:
    """
    Reset chatbot (clear history and context)
    """
    chatbot_instance.clear_history()
    chatbot_instance.set_resume_context(None, None)
    
    return {
        "status": "success",
        "message": "Chatbot reset successfully"
    }

chatbot_router = router