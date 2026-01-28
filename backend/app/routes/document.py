from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.parser import ResumeParser
import json

router = APIRouter()

# In-memory storage for current session
resume_storage = {}

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload and parse resume (PDF/DOCX)
    Returns: Structured resume JSON
    """
    try:
        # Validate file type
        if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
            raise HTTPException(status_code=400, detail="Only PDF and DOCX files allowed")
        
        # Read file into memory
        content = await file.read()
        
        # Parse resume
        parser = ResumeParser()
        parsed_resume = parser.parse(content, file.filename)
        
        # Store in memory for this session
        resume_storage["current_resume"] = parsed_resume
        
        return {
            "status": "success",
            "message": "Resume parsed successfully",
            "resume": parsed_resume
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/current-resume")
async def get_current_resume():
    """
    Retrieve current resume from session memory
    """
    if "current_resume" not in resume_storage:
        raise HTTPException(status_code=404, detail="No resume uploaded yet")
    
    return resume_storage["current_resume"]

doc_router = router