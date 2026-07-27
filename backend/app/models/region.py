import uuid
from sqlalchemy import Column, String, Boolean, DateTime, DECIMAL, text
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Region(Base):
    __tablename__ = "regions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=text("gen_random_uuid()"))
    city_name = Column(String(100), nullable=False)
    country_code = Column(String(5), nullable=False)
    latitude = Column(DECIMAL(9, 6), nullable=True)
    longitude = Column(DECIMAL(9, 6), nullable=True)
    alert_threshold_celsius = Column(DECIMAL(5, 2), default=40.0, server_default="40.0")
    is_active = Column(Boolean, default=True, server_default="true")
    created_at = Column(DateTime(timezone=True), server_default=text("NOW()"))
