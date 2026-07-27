import httpx
from fastapi import HTTPException
from app.config import settings
from app.utils.heat_index import calculate_heat_index

WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"
GEO_URL = "http://api.openweathermap.org/geo/1.0/direct"

async def get_coordinates(city: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            GEO_URL,
            params={
                "q": city,
                "limit": 1,
                "appid": settings.OPENWEATHERMAP_API_KEY
            }
        )
        if response.status_code != 200 or not response.json():
            raise HTTPException(status_code=404, detail="City not found")
        data = response.json()[0]
        return data["lat"], data["lon"], data["name"], data.get("country", "")

async def get_current_weather(city: str):
    lat, lon, name, country = await get_coordinates(city)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            WEATHER_URL,
            params={
                "lat": lat,
                "lon": lon,
                "units": "metric",
                "appid": settings.OPENWEATHERMAP_API_KEY
            }
        )
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Error fetching weather data")
        
        data = response.json()
        temp_c = data["main"]["temp"]
        rh = data["main"]["humidity"]
        heat_index = calculate_heat_index(temp_c, rh)
        
        return {
            "city": name,
            "country": country,
            "temp": temp_c,
            "feels_like": data["main"]["feels_like"],
            "heat_index": heat_index,
            "humidity": rh,
            "wind_speed": data["wind"]["speed"],
            "description": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"],
            "timestamp": data["dt"]
        }

async def get_forecast(city: str):
    lat, lon, name, country = await get_coordinates(city)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            FORECAST_URL,
            params={
                "lat": lat,
                "lon": lon,
                "units": "metric",
                "appid": settings.OPENWEATHERMAP_API_KEY
            }
        )
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Error fetching forecast data")
        
        return response.json()
