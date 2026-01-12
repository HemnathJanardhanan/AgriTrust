from fastapi import APIRouter
from app.models.rag_schema import RagRequest, RagResponse
from app.services.rag_service import ask

router = APIRouter()

@router.post("/ask", response_model=RagResponse)
def ask_rag(req: RagRequest):
    return ask(req.question)
