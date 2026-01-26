from fastapi import APIRouter
from app.services.ndvi.ndvi_compute import add_ndvi

router = APIRouter()

@router.post("/run")
def run_ndvi(job: dict):
    """
    Input:
    {
      plot_id,
      polygon,
      start_date,
      end_date
    }
    """
    return {
        "status": "accepted",
        "message": "NDVI job queued"
    }
