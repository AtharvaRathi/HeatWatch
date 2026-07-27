import asyncio
import random
from datetime import date, timedelta
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.models.historical import HistoricalData
from app.models.region import Region
from app.models.user import User
from app.utils.auth import get_password_hash
from app.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

CITIES = ["Mumbai", "Delhi", "Chennai", "Ahmedabad", "Kolkata"]

async def seed_data():
    async with AsyncSessionLocal() as session:
        # 1. Seed Users
        admin_email = "admin@heatwatch.com"
        user_email = "user@heatwatch.com"
        
        # Check if admin exists
        from sqlalchemy.future import select
        admin = await session.execute(select(User).where(User.email == admin_email))
        if not admin.scalars().first():
            session.add(User(
                name="Admin User",
                email=admin_email,
                password_hash=get_password_hash("Admin@1234"),
                role="admin"
            ))
            
        # Check if user exists
        user = await session.execute(select(User).where(User.email == user_email))
        if not user.scalars().first():
            session.add(User(
                name="Test User",
                email=user_email,
                password_hash=get_password_hash("User@1234"),
                role="user"
            ))
            
        # 2. Seed Regions
        thresholds = {
            "Mumbai": 40.0,
            "Delhi": 42.0,
            "Chennai": 41.0,
            "Ahmedabad": 43.0,
            "Kolkata": 40.5
        }
        
        for city in CITIES:
            reg = await session.execute(select(Region).where(Region.city_name == city))
            if not reg.scalars().first():
                session.add(Region(
                    city_name=city,
                    country_code="IN",
                    alert_threshold_celsius=thresholds[city]
                ))
        
        # 3. Seed Historical Data (2022-2024)
        print("Seeding historical data. This may take a moment...")
        start_date = date(2022, 1, 1)
        end_date = date(2024, 12, 31)
        delta = end_date - start_date
        
        # Check if we already have data
        hist = await session.execute(select(HistoricalData).limit(1))
        if not hist.scalars().first():
            for i in range(delta.days + 1):
                current_date = start_date + timedelta(days=i)
                month = current_date.month
                
                for city in CITIES:
                    # Very rough temperature logic based on Indian seasons
                    if 4 <= month <= 6:
                        base_temp = random.uniform(35, 45) # Summer
                    elif 7 <= month <= 9:
                        base_temp = random.uniform(30, 38) # Monsoon
                    else:
                        base_temp = random.uniform(20, 32) # Winter
                        
                    humidity = random.uniform(40, 90)
                    heat_index = base_temp + (humidity / 100) * 5
                    
                    risk_level = "Low"
                    if heat_index >= 40:
                        risk_level = "Severe"
                    elif heat_index >= 27:
                        risk_level = "Moderate"
                        
                    session.add(HistoricalData(
                        city_name=city,
                        record_date=current_date,
                        max_temp_celsius=round(base_temp, 2),
                        min_temp_celsius=round(base_temp - random.uniform(5, 10), 2),
                        heat_index_celsius=round(heat_index, 2),
                        humidity_pct=round(humidity, 2),
                        risk_level=risk_level
                    ))
                
                # Commit in batches of 100 days
                if i % 100 == 0:
                    await session.commit()
            
        await session.commit()
        print("Seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_data())
