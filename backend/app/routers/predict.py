from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from app.services.weather_service import get_forecast
from app.utils.heat_index import calculate_heat_index
from ml.predict import predict_risk

router = APIRouter(prefix="/api/predict", tags=["predict"])

@router.get("/{city}")
async def get_prediction(city: str):
    try:
        forecast_data = await get_forecast(city)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error fetching forecast data")
    
    # Process 5-day forecast
    days = []
    # OpenWeatherMap returns 3-hour chunks, we need to aggregate daily
    daily_data = {}
    
    for item in forecast_data["list"]:
        date_str = item["dt_txt"].split(" ")[0] # YYYY-MM-DD
        if date_str not in daily_data:
            daily_data[date_str] = {
                "temps": [],
                "humidities": [],
                "wind_speeds": [],
                "uv_indices": [] # OWM standard forecast doesn't include UV, might need separate call or mock for MVP
            }
        
        daily_data[date_str]["temps"].append(item["main"]["temp"])
        daily_data[date_str]["humidities"].append(item["main"]["humidity"])
        daily_data[date_str]["wind_speeds"].append(item["wind"]["speed"])
        daily_data[date_str]["uv_indices"].append(5.0) # Mock UV index for now
        
    for date_str, metrics in list(daily_data.items())[:5]: # Max 5 days
        max_temp = max(metrics["temps"])
        min_temp = min(metrics["temps"])
        avg_humidity = sum(metrics["humidities"]) / len(metrics["humidities"])
        avg_wind = sum(metrics["wind_speeds"]) / len(metrics["wind_speeds"])
        avg_uv = sum(metrics["uv_indices"]) / len(metrics["uv_indices"])
        
        heat_index = calculate_heat_index(max_temp, avg_humidity)
        
        features = {
            "max_temp_celsius": max_temp,
            "heat_index_celsius": heat_index,
            "humidity_pct": avg_humidity,
            "wind_speed_kmh": avg_wind,
            "uv_index": avg_uv,
            "month": datetime.strptime(date_str, "%Y-%m-%d").month
        }
        
        prediction = predict_risk(features)
        
        days.append({
            "date": date_str,
            "max_temp": round(max_temp, 2),
            "min_temp": round(min_temp, 2),
            "heat_index": round(heat_index, 2),
            "risk_level": prediction["risk_level"],
            "risk_score": prediction["risk_score"],
            "confidence": round(prediction["confidence"], 2)
        })
        
    # Overall prediction based on next day
    overall = days[0] if days else {}
    
    return {
        "city": forecast_data["city"]["name"],
        "risk_level": overall.get("risk_level", "Low"),
        "risk_score": overall.get("risk_score", 0),
        "confidence": overall.get("confidence", 1.0),
        "forecast_days": days
    }
