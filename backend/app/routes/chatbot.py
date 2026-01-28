from fastapi import APIRouter

router=APIRouter()

@router.get("/ask")
async def ask_question():
    return {"message":"Question received"}

chatbot_router=router