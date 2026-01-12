from fastapi import APIRouter

from app.models.crop_schema import (
    CropRecommendRequest,
    CropRecommendResponse
)
from app.services.crop_service import recommend_crop

router = APIRouter()

@router.post("/crop", response_model=CropRecommendResponse)
def recommend(req: CropRecommendRequest):
    return recommend_crop(req.dict())
