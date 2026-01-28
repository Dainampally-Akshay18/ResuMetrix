from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Groq API
    GROQ_API_KEY: str
    
    # Pinecone
    PINECONE_API_KEY: str
    PINECONE_ENVIRONMENT: str
    PINECONE_INDEX_NAME: str
    
    # Backend
    BACKEND_PORT: int = 8000
    ENVIRONMENT: str = "development"
    
    class Config:
        env_file = ".env"

settings = Settings()