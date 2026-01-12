from pydantic import BaseModel

class CropRecommendRequest(BaseModel):
    soil_type: str
    season: str
    rainfall_mm: float
    location: str

class CropRecommendResponse(BaseModel):
    recommended_crop: str
    confidence: float
