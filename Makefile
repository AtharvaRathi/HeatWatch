.PHONY: dev seed test train migrate

dev:
	docker-compose up --build

seed:
	docker-compose exec backend python scripts/seed.py

train:
	docker-compose exec backend python ml/train.py

test:
	docker-compose exec backend pytest tests/ -v

migrate:
	docker-compose exec backend alembic upgrade head
