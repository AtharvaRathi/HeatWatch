import asyncio
import httpx
from datetime import datetime
from celery import shared_task
from app.database import AsyncSessionLocal
from app.models.region import Region
from app.models.alert import Alert, UserAlert
from app.models.user import User
from sqlalchemy.future import select
from app.config import settings
from app.utils.heat_index import calculate_heat_index
from ml.predict import predict_risk

WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

async def _evaluate_thresholds():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Region).where(Region.is_active == True))
        regions = result.scalars().all()
        
        async with httpx.AsyncClient() as client:
            for region in regions:
                try:
                    response = await client.get(
                        WEATHER_URL,
                        params={
                            "lat": float(region.latitude) if region.latitude else None,
                            "lon": float(region.longitude) if region.longitude else None,
                            "q": region.city_name if not region.latitude else None,
                            "units": "metric",
                            "appid": settings.OPENWEATHERMAP_API_KEY
                        }
                    )
                    if response.status_code == 200:
                        data = response.json()
                        temp_c = data["main"]["temp"]
                        rh = data["main"]["humidity"]
                        wind_speed = data["wind"]["speed"]
                        heat_index = calculate_heat_index(temp_c, rh)
                        
                        if heat_index >= float(region.alert_threshold_celsius):
                            # Predict risk to store it
                            features = {
                                "max_temp_celsius": temp_c,
                                "heat_index_celsius": heat_index,
                                "humidity_pct": rh,
                                "wind_speed_kmh": wind_speed,
                                "uv_index": 5.0, # mock
                                "month": datetime.utcnow().month
                            }
                            prediction = predict_risk(features)
                            
                            new_alert = Alert(
                                region_id=region.id,
                                city_name=region.city_name,
                                heat_index_celsius=heat_index,
                                threshold_celsius=region.alert_threshold_celsius,
                                risk_level=prediction["risk_level"],
                                triggered_at=datetime.utcnow(),
                                dispatched_at=datetime.utcnow(),
                                dispatch_channel="push,email",
                                is_dispatched=True
                            )
                            session.add(new_alert)
                            await session.flush()
                            
                            # Notify users (for simplicity, notify all users right now, usually you'd notify users in that region)
                            users_res = await session.execute(select(User).where(User.is_active == True))
                            users = users_res.scalars().all()
                            
                            import json
                            import redis.asyncio as redis_async
                            redis_client = redis_async.from_url(settings.REDIS_URL)
                            
                            for u in users:
                                session.add(UserAlert(user_id=u.id, alert_id=new_alert.id))
                                await redis_client.publish(
                                    "user_alerts",
                                    json.dumps({
                                        "type": "alert",
                                        "user_id": str(u.id),
                                        "title": f"Severe Heat Alert: {region.city_name}",
                                        "message": f"Heat index reached {heat_index:.1f}°C. Risk Level: {prediction['risk_level']}"
                                    })
                                )
                                
                            await redis_client.aclose()
                except Exception as e:
                    print(f"Error evaluating threshold for {region.city_name}: {e}")
                    
        await session.commit()

@shared_task(name="app.services.alert_service.evaluate_thresholds")
def evaluate_thresholds():
    asyncio.run(_evaluate_thresholds())
