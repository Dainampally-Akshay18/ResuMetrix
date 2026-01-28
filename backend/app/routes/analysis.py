from fastapi import APIRouter, HTTPException
from ..services.ai_analyser import AIAnalyser
from ..routes.document import resume_storage

router = APIRouter()
analyser = AIAnalyser()

@router.get("/analyze-resume")
async def analyze_resume():
    """
    Get AI analysis of resume
    Requires: Uploaded resume + calculated scores
    """
    if "current_resume" not in resume_storage:
        raise HTTPException(status_code=404, detail="No resume uploaded yet")
    
    if "current_scores" not in resume_storage:
        raise HTTPException(status_code=400, detail="Please calculate ATS score first")
    
    resume_data = resume_storage["current_resume"]
    ats_scores = resume_storage["current_scores"]
    
    analysis = await analyser.analyze_resume(resume_data, ats_scores)
    
    return {
        "status": "success",
        "analysis": analysis
    }

analysis_router = router