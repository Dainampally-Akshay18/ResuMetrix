from fastapi import APIRouter

router=APIRouter()

@router.get("/analyze")
async def analyze_data():
    return {"message":"Data analysis complete"}

analysis_router=router