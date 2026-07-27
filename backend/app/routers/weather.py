from fastapi import APIRouter, Depends, Query
from app.services.weather_service import get_current_weather, get_coordinates

router = APIRouter(prefix="/api/weather", tags=["weather"])

@router.get("/current")
async def current_weather(city: str = Query(..., min_length=1)):
    return await get_current_weather(city)

@router.get("/search")
async def search_city(q: str = Query(..., min_length=1)):
    lat, lon, name, country = await get_coordinates(q)
    return {"city": name, "country": country, "lat": lat, "lon": lon}
