from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.user import User
from app.models.region import Region
from app.routers.deps import get_current_admin_user
from pydantic import BaseModel
from uuid import UUID

router = APIRouter(prefix="/api/admin", tags=["admin"])

class ThresholdUpdate(BaseModel):
    threshold: float

@router.get("/thresholds")
async def get_thresholds(db: AsyncSession = Depends(get_db), current_admin: User = Depends(get_current_admin_user)):
    result = await db.execute(select(Region).order_by(Region.city_name))
    return result.scalars().all()

@router.put("/thresholds/{region_id}")
async def update_threshold(region_id: UUID, data: ThresholdUpdate, db: AsyncSession = Depends(get_db), current_admin: User = Depends(get_current_admin_user)):
    result = await db.execute(select(Region).where(Region.id == region_id))
    region = result.scalars().first()
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    
    region.alert_threshold_celsius = data.threshold
    await db.commit()
    return {"message": "Threshold updated successfully", "threshold": region.alert_threshold_celsius}

class RegionCreate(BaseModel):
    city_name: str
    country_code: str = "IN"
    alert_threshold_celsius: float = 40.0

@router.get("/regions")
async def get_regions(db: AsyncSession = Depends(get_db), current_admin: User = Depends(get_current_admin_user)):
    result = await db.execute(select(Region).order_by(Region.city_name))
    return result.scalars().all()

@router.post("/regions")
async def add_region(data: RegionCreate, db: AsyncSession = Depends(get_db), current_admin: User = Depends(get_current_admin_user)):
    new_region = Region(**data.dict())
    db.add(new_region)
    await db.commit()
    await db.refresh(new_region)
    return new_region

@router.delete("/regions/{region_id}")
async def remove_region(region_id: UUID, db: AsyncSession = Depends(get_db), current_admin: User = Depends(get_current_admin_user)):
    result = await db.execute(select(Region).where(Region.id == region_id))
    region = result.scalars().first()
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    
    await db.delete(region)
    await db.commit()
    return {"message": "Region removed"}

@router.get("/users")
async def get_users(db: AsyncSession = Depends(get_db), current_admin: User = Depends(get_current_admin_user)):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    return result.scalars().all()

class UserRoleUpdate(BaseModel):
    role: str
    is_active: bool

@router.patch("/users/{user_id}")
async def update_user(user_id: UUID, data: UserRoleUpdate, db: AsyncSession = Depends(get_db), current_admin: User = Depends(get_current_admin_user)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.role = data.role
    user.is_active = data.is_active
    await db.commit()
    return {"message": "User updated"}
