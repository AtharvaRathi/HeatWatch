import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';

export default function useLiveAlerts() {
  const wsRef = useRef(null);
  const user = useStore((state) => state.user);
  
  useEffect(() => {
    if (!user) return; // Only connect if logged in

    // Get the base API URL and convert it to a WebSocket URL
    let apiUrl = import.meta.env.VITE_API_URL || 'https://heatwatch-api.onrender.com';
    let wsUrl = apiUrl.replace('http://', 'ws://').replace('https://', 'wss://');
    
    // Connect to WebSocket with the user's ID as client ID
    const connectWs = () => {
      const ws = new WebSocket(`${wsUrl}/api/websocket/ws/${user.id}`);
      
      ws.onopen = () => {
        console.log('Connected to HeatWatch Live Feed');
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'alert') {
            toast.error(
              <div>
                <strong>{data.title}</strong>
                <p className="text-sm mt-1">{data.message}</p>
              </div>,
              {
                duration: 8000,
                position: 'top-right',
                style: {
                  background: '#991B1B', // Extreme danger red
                  color: '#fff',
                  border: '1px solid #EF4444'
                }
              }
            );
          } else if (data.type === 'info') {
            toast(data.message, {
              icon: 'ℹ️',
              style: {
                background: '#1F2937',
                color: '#fff',
              }
            });
          }
        } catch (err) {
          console.error("Error parsing websocket message", err);
        }
      };
      
      ws.onclose = () => {
        console.log('Disconnected from HeatWatch Live Feed. Reconnecting in 5s...');
        setTimeout(connectWs, 5000);
      };

      wsRef.current = ws;
    };

    connectWs();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [user]);
}
