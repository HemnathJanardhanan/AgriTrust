from fastapi import FastAPI
from app.api import rag, recommend, health

app = FastAPI(
    title="AgriTrust AI Service",
    version="1.0.0"
)

app.include_router(health.router)
app.include_router(rag.router, prefix="/rag", tags=["RAG"])
app.include_router(recommend.router, prefix="/recommend", tags=["Recommendation"])
