import uuid
from sqlalchemy import Column, String, Boolean, DateTime, DECIMAL, text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=text("gen_random_uuid()"))
    region_id = Column(UUID(as_uuid=True), ForeignKey("regions.id"), nullable=True)
    city_name = Column(String(100), nullable=False)
    heat_index_celsius = Column(DECIMAL(5, 2), nullable=False)
    threshold_celsius = Column(DECIMAL(5, 2), nullable=False)
    risk_level = Column(String(20), nullable=False)
    triggered_at = Column(DateTime(timezone=True), nullable=False)
    dispatched_at = Column(DateTime(timezone=True), nullable=True)
    dispatch_channel = Column(String(20), nullable=True)
    is_dispatched = Column(Boolean, default=False, server_default="false")

class UserAlert(Base):
    __tablename__ = "user_alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    alert_id = Column(UUID(as_uuid=True), ForeignKey("alerts.id"), nullable=False)
    is_read = Column(Boolean, default=False, server_default="false")
    created_at = Column(DateTime(timezone=True), server_default=text("NOW()"))
