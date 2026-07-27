from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import extract
from app.database import get_db
from app.models.historical import HistoricalData
from typing import Optional

router = APIRouter(prefix="/api/history", tags=["history"])

@router.get("")
async def get_history(
    city: str,
    year: int,
    risk_level: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(HistoricalData).where(
        HistoricalData.city_name == city,
        extract('year', HistoricalData.record_date) == year
    )
    
    if risk_level:
        query = query.where(HistoricalData.risk_level == risk_level)
        
    query = query.order_by(HistoricalData.record_date)
    
    result = await db.execute(query)
    data = result.scalars().all()
    
    return [
        {
            "date": item.record_date.isoformat(),
            "max_temp": item.max_temp_celsius,
            "min_temp": item.min_temp_celsius,
            "heat_index": item.heat_index_celsius,
            "humidity": item.humidity_pct,
            "risk_level": item.risk_level
        }
        for item in data
    ]
