import uuid
from sqlalchemy import Column, String, Boolean, DateTime, text, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=text("gen_random_uuid()"))
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    phone = Column(String(20), nullable=True)
    role = Column(String(20), default="user", server_default="user")
    is_active = Column(Boolean, default=True, server_default="true")
    push_subscription = Column(JSON, nullable=True)
    language_preference = Column(String(10), default="en", server_default="en")
    created_at = Column(DateTime(timezone=True), server_default=text("NOW()"))

class PasswordReset(Base):
    __tablename__ = "password_resets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True), nullable=False) # Should be FK to users
    otp_hash = Column(String, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    used = Column(Boolean, default=False, server_default="false")
