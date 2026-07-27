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

manager = ConnectionManager()

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
