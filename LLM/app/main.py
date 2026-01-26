from fastapi import FastAPI
from app.api import rag, recommend, health
from app.services.ndvi.gee import init_gee
from app.api.ndvi.routes import router as ndvi_router
app = FastAPI(
    title="AgriTrust AI Service",
    version="1.0.0"
)

@app.on_event("startup")
def startup():
    init_gee()

app.include_router(ndvi_router, prefix="/ndvi", tags=["NDVI"])
app.include_router(health.router)
app.include_router(rag.router, prefix="/rag", tags=["RAG"])
app.include_router(recommend.router, prefix="/recommend", tags=["Recommendation"])
