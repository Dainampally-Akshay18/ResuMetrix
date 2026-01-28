from fastapi import APIRouter, HTTPException
from ..services.ats_scorer import ATSScorer
from ..routes.document import resume_storage
from pydantic import BaseModel
from typing import Optional

router = APIRouter()
scorer = ATSScorer()

class JDInput(BaseModel):
    jd_text: str

@router.get("/score-resume")
async def get_ats_score():
    """
    Get ATS score for uploaded resume
    """
    if "current_resume" not in resume_storage:
        raise HTTPException(status_code=404, detail="No resume uploaded yet")
    
    resume_data = resume_storage["current_resume"]
    scores = scorer.score_resume(resume_data)
    
    # Store scores for AI analysis
    resume_storage["current_scores"] = scores
    
    return {
        "status": "success",
        "scores": scores
    }

@router.post("/score-with-jd")
async def score_with_jd(jd_input: JDInput):
    """
    Score resume with job description matching
    """
    if "current_resume" not in resume_storage:
        raise HTTPException(status_code=404, detail="No resume uploaded yet")
    
    resume_data = resume_storage["current_resume"]
    scores = scorer.score_resume(resume_data, jd_input.jd_text)
    
    resume_storage["current_scores"] = scores
    
    return {
        "status": "success",
        "scores": scores
    }

scoring_router = router