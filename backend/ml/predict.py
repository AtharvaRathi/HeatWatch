import os
import joblib
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'heatwave_model.pkl')
model = None

def load_model():
    global model
    if model is None:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
        else:
            print(f"Warning: Model file not found at {MODEL_PATH}")

def predict_risk(features: dict) -> dict:
    """
    Predict heatwave risk level.
    features: dict with keys:
    - max_temp_celsius
    - heat_index_celsius
    - humidity_pct
    - wind_speed_kmh
    - uv_index
    - month
    
    Returns: { risk_level: str, risk_score: int, confidence: float }
    """
    load_model()
    if model is None:
        # Fallback if model not trained
        hi = features.get('heat_index_celsius', 0)
        risk_score = 0
        if hi >= 40:
            risk_score = 2
        elif hi >= 27:
            risk_score = 1
        
        level_map = {0: "Low", 1: "Moderate", 2: "Severe"}
        return {
            "risk_level": level_map[risk_score],
            "risk_score": risk_score,
            "confidence": 0.5
        }
        
    X = np.array([[
        features['max_temp_celsius'],
        features['heat_index_celsius'],
        features['humidity_pct'],
        features['wind_speed_kmh'],
        features['uv_index'],
        features['month']
    ]])
    
    pred = model.predict(X)[0]
    proba = model.predict_proba(X)[0]
    confidence = float(np.max(proba))
    
    level_map = {0: "Low", 1: "Moderate", 2: "Severe"}
    
    return {
        "risk_level": level_map[pred],
        "risk_score": int(pred),
        "confidence": confidence
    }
