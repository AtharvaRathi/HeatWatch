from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.middleware.response_time import add_process_time_header

from ml.predict import load_model

@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.database import engine, Base
    import app.models  # Ensure models are loaded
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    load_model()
    yield
    # Cleanup here later

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan,
    version="1.0.0"
)

# CORS
origins = [
    settings.FRONTEND_URL,
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Middlewares
app.middleware("http")(add_process_time_header)

from app.routers import auth, weather, predict, alerts, history, admin, websocket
app.include_router(auth.router)
app.include_router(weather.router)
app.include_router(predict.router)
app.include_router(alerts.router)
app.include_router(history.router)
app.include_router(admin.router)
app.include_router(websocket.router)

@app.get("/")
async def root():
    return {"message": "Welcome to HeatWatch API"}
