from fastapi import APIRouter

router=APIRouter()

@router.get("/upload-resume")
def upload_resume():
    return {"message":"Resume uploaded successfully"}

doc_router=router