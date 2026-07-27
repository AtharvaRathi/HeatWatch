import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os

def create_synthetic_data(num_samples=5000):
    np.random.seed(42)
    # Generate realistic synthetic data
    month = np.random.randint(1, 13, num_samples)
    
    # Summer months (4, 5, 6) are hotter
    base_temp = 25
    temp_variation = np.where((month >= 4) & (month <= 6), np.random.uniform(10, 20, num_samples), np.random.uniform(-5, 10, num_samples))
    max_temp = base_temp + temp_variation
    
    humidity = np.random.uniform(20, 95, num_samples)
    wind_speed = np.random.uniform(0, 30, num_samples)
    uv_index = np.random.uniform(0, 11, num_samples)
    
    # Calculate heat index approximation for labels
    heat_index = max_temp + (humidity / 100) * 5 # Simplified
    
    # Labels
    # 0 = Low (heat index < 27)
    # 1 = Moderate (27 <= heat index < 40)
    # 2 = Severe (heat index >= 40)
    
    risk_level = np.zeros(num_samples, dtype=int)
    risk_level[(heat_index >= 27) & (heat_index < 40)] = 1
    risk_level[heat_index >= 40] = 2
    
    data = {
        'max_temp_celsius': max_temp,
        'heat_index_celsius': heat_index,
        'humidity_pct': humidity,
        'wind_speed_kmh': wind_speed,
        'uv_index': uv_index,
        'month': month,
        'risk_level': risk_level
    }
    
    return pd.DataFrame(data)

def train_model():
    print("Generating synthetic data...")
    df = create_synthetic_data()
    
    X = df[['max_temp_celsius', 'heat_index_celsius', 'humidity_pct', 'wind_speed_kmh', 'uv_index', 'month']]
    y = df['risk_level']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    predictions = model.predict(X_test)
    acc = accuracy_score(y_test, predictions)
    print(f"Model accuracy on test set: {acc * 100:.2f}%")
    
    model_path = os.path.join(os.path.dirname(__file__), 'heatwave_model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_model()
