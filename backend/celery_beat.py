from celery.schedules import crontab
from celery_worker import celery_app
from app.config import settings

celery_app.conf.beat_schedule = {
    "evaluate-thresholds-every-10-minutes": {
        "task": "app.services.alert_service.evaluate_thresholds",
        "schedule": settings.ALERT_POLL_INTERVAL_SECONDS, # Poll interval from env
    },
}
