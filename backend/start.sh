#!/bin/bash
set -e

# 1. Run database migrations
echo "Running database migrations..."
alembic upgrade head

# 2. Start Celery worker in the background
echo "Starting Celery worker..."
celery -A celery_worker.celery_app worker --pool=solo --loglevel=info &

# 3. Start Celery beat (scheduler) in the background
echo "Starting Celery beat scheduler..."
celery -A celery_beat.celery_app beat --loglevel=info &

# 4. Start the FastAPI web server in the foreground
echo "Starting FastAPI web server..."
uvicorn app.main:app --host 0.0.0.0 --port $PORT
