from celery import Celery
from app.config import settings

celery_app = Celery(
    "heatwatch_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["app.services.alert_service", "app.services.email_service"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)
