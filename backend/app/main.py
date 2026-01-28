from fastapi import FastAPI
from app.routes import document
from app.routes import chatbot
from app.routes import analysis

app = FastAPI()

app.include_router(router=document.doc_router, prefix="/documents", tags=["documents"])
app.include_router(router=chatbot.chatbot_router, prefix="/chatbot", tags=["chatbot"])
app.include_router(router=analysis.analysis_router, prefix="/analysis", tags=["analysis"])

@app.get("/")
async def read_root():
    return {"message": "This is a basic FastAPI Endpoint"}
