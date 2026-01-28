from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import document, chatbot, analysis, scoring

app = FastAPI(title="ResuMetrix API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(router=document.doc_router, prefix="/documents", tags=["documents"])
app.include_router(router=scoring.scoring_router, prefix="/scoring", tags=["scoring"])
app.include_router(router=analysis.analysis_router, prefix="/analysis", tags=["analysis"])
app.include_router(router=chatbot.chatbot_router, prefix="/chatbot", tags=["chatbot"])

@app.get("/")
async def read_root():
    return {"message": "ResuMetrix API is running", "version": "1.0.0"}
