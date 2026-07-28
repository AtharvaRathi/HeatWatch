import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "HeatWatch"
    DATABASE_URL: str
    REDIS_URL: str
    OPENWEATHERMAP_API_KEY: str = ""
    JWT_SECRET_KEY: str = ""
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_EXPIRE_MINUTES: int = 30
    JWT_REFRESH_EXPIRE_DAYS: int = 7
    MAILJET_API_KEY: str = ""
    MAILJET_API_SECRET: str = ""
    ALERT_FROM_EMAIL: str = ""
    VAPID_PUBLIC_KEY: str = ""
    VAPID_PRIVATE_KEY: str = ""
    VAPID_EMAIL: str = ""
    ENVIRONMENT: str = "development"
    FRONTEND_URL: str = "http://localhost:5173"
    ALERT_POLL_INTERVAL_SECONDS: int = 600

    class Config:
        env_file = ".env"

settings = Settings()
