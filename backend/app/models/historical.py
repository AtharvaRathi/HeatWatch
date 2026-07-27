import uuid
from sqlalchemy import Column, String, Date, DECIMAL, text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class HistoricalData(Base):
    __tablename__ = "historical_data"
    __table_args__ = (
        UniqueConstraint("city_name", "record_date", name="uix_city_date"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=text("gen_random_uuid()"))
    city_name = Column(String(100), nullable=False)
    record_date = Column(Date, nullable=False)
    max_temp_celsius = Column(DECIMAL(5, 2), nullable=True)
    min_temp_celsius = Column(DECIMAL(5, 2), nullable=True)
    heat_index_celsius = Column(DECIMAL(5, 2), nullable=True)
    humidity_pct = Column(DECIMAL(5, 2), nullable=True)
    risk_level = Column(String(20), nullable=True) # Check constraint can be added in DB
