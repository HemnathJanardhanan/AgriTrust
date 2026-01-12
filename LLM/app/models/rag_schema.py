from pydantic import BaseModel
from typing import Optional, List

class RagRequest(BaseModel):
    question: str
    crop: Optional[str] = None

class RagResponse(BaseModel):
    answer: str
    language: str
    
