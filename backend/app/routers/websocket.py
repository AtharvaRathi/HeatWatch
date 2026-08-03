from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict
import asyncio
import json
from app.services.weather_service import get_current_weather

router = APIRouter(prefix="/ws", tags=["websocket"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, city: str):
        await websocket.accept()
        if city not in self.active_connections:
            self.active_connections[city] = []
        self.active_connections[city].append(websocket)

    def disconnect(self, websocket: WebSocket, city: str):
        if city in self.active_connections:
            self.active_connections[city].remove(websocket)
            if not self.active_connections[city]:
                del self.active_connections[city]

    async def broadcast(self, message: str, city: str):
        if city in self.active_connections:
            for connection in self.active_connections[city]:
                await connection.send_text(message)

    async def broadcast_to_user(self, user_id: str, message: dict):
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                await connection.send_text(json.dumps(message))

manager = ConnectionManager()

# We will start this listener in main.py lifespan
import redis.asyncio as redis_async
from app.config import settings
redis_client = redis_async.from_url(settings.REDIS_URL)

async def listen_for_alerts():
    pubsub = redis_client.pubsub()
    await pubsub.subscribe("user_alerts")
    async for message in pubsub.listen():
        if message["type"] == "message":
            try:
                data = json.loads(message["data"])
                user_id = str(data.get("user_id"))
                if user_id:
                    await manager.broadcast_to_user(user_id, data)
            except Exception as e:
                print(f"Error processing pubsub message: {e}")

@router.websocket("/live-feed")
async def websocket_endpoint(websocket: WebSocket, city: str):
    await manager.connect(websocket, city)
    try:
        # Send initial data immediately
        try:
            weather_data = await get_current_weather(city)
            await websocket.send_text(json.dumps(weather_data))
        except Exception as e:
            await websocket.send_text(json.dumps({"error": str(e)}))
            
        # Then poll every 60s
        while True:
            await asyncio.sleep(60)
            try:
                weather_data = await get_current_weather(city)
                await manager.broadcast(json.dumps(weather_data), city)
            except Exception as e:
                # Log error, don't crash loop
                print(f"Error in websocket loop for {city}: {e}")
                
    except WebSocketDisconnect:
        manager.disconnect(websocket, city)

@router.websocket("/alerts/{user_id}")
async def alerts_websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    try:
        # Keep the connection alive
        while True:
            await asyncio.sleep(60)
            await websocket.send_text(json.dumps({"type": "ping"}))
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)
