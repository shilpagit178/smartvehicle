from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__)

# Configure CORS to allow your Vercel domain
CORS(app, origins=[
    "https://smartvehicle.vercel.app",
    "http://localhost:3000", 
    "http://127.0.0.1:3000"
], 
supports_credentials=True,
allow_headers=['Content-Type', 'Authorization'],
methods=['GET', 'POST', 'OPTIONS'])

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS")
        response.headers.add('Access-Control-Allow-Credentials', "true")
        return response

# Load the model
try:
    with open('trip_driver_model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def calculate_maintenance_status(mileage, last_service_date, engine_hours):
    """Calculate maintenance status based on vehicle data"""
    try:
        # Parse last service date
        last_service = datetime.strptime(last_service_date, "%Y-%m-%d")
        days_since_service = (datetime.now() - last_service).days
        
        # Maintenance logic
        needs_oil_change = mileage % 5000 < 500 or days_since_service > 180
        needs_brake_check = mileage % 20000 < 1000
        needs_tire_rotation = mileage % 10000 < 500
        high_engine_hours = engine_hours > 3000
        
        issues = []
        if needs_oil_change:
            issues.append("Oil change recommended")
        if needs_brake_check:
            issues.append("Brake system inspection due")
        if needs_tire_rotation:
            issues.append("Tire rotation needed")
        if high_engine_hours:
            issues.append("Engine maintenance check required")
        
        # Determine status
        if len(issues) >= 3 or high_engine_hours:
            status = "Critical"
            confidence = 0.95
        elif len(issues) >= 1:
            status = "Needs Attention"
            confidence = 0.85
        else:
            status = "Good"
            confidence = 0.90
            
        # Calculate next maintenance date
        next_maintenance = datetime.now() + timedelta(days=90)
        
        return {
            "status": status,
            "confidence": confidence,
            "next_maintenance": next_maintenance.strftime("%Y-%m-%d"),
            "issues": issues
        }
    except:
        # Fallback to random prediction
        statuses = ["Good", "Needs Attention", "Critical"]
        weights = [0.6, 0.3, 0.1]
        status = np.random.choice(statuses, p=weights)
        
        return {
            "status": status,
            "confidence": random.uniform(0.75, 0.95),
            "next_maintenance": (datetime.now() + timedelta(days=90)).strftime("%Y-%m-%d"),
            "issues": ["Schedule routine inspection"] if status != "Good" else []
        }

def classify_driver_behavior(harsh_brake_count, harsh_accel_count, sharp_turn_count, overspeeding_seconds):
    """Classify driver as Safe or Aggressive based on behavior metrics"""
    
    # Calculate behavior score (0-100, lower is better)
    brake_score = min(harsh_brake_count * 10, 40)
    accel_score = min(harsh_accel_count * 10, 30)
    turn_score = min(sharp_turn_count * 15, 20)
    speed_score = min(overspeeding_seconds / 10, 10)
    
    total_score = brake_score + accel_score + turn_score + speed_score
    
    # Classify based on total score
    if total_score <= 30:
        driver_type = "Safe"
        risk_score = int(total_score)
        recommendations = [
            "Excellent driving behavior!",
            "Maintain current driving habits",
            "Keep following traffic rules"
        ]
    else:
        driver_type = "Aggressive"
        risk_score = min(int(total_score + 20), 100)
        recommendations = [
            "Consider reducing harsh braking",
            "Avoid rapid acceleration",
            "Maintain safe following distance",
            "Practice smoother driving techniques"
        ]
    
    # Calculate confidence based on how definitive the classification is
    confidence = min(0.95, 0.7 + abs(total_score - 50) / 100)
    
    return {
        "driver_type": driver_type,
        "confidence": confidence,
        "risk_score": risk_score,
        "recommendations": recommendations
    }

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"message": "Smart Vehicle API is running", "status": "healthy"})

@app.route('/predict_maintenance_status', methods=['POST'])
def predict_maintenance():
    try:
        data = request.get_json()
        
        mileage = data.get('mileage', 45000)
        last_service = data.get('last_service', '2024-08-15')
        engine_hours = data.get('engine_hours', 2500)
        
        prediction = calculate_maintenance_status(mileage, last_service, engine_hours)
        
        return jsonify(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict_trip_behavior', methods=['POST'])
def predict_trip_behavior():
    try:
        data = request.get_json()
        
        harsh_brake_count = data.get('harsh_brake_count', 0)
        harsh_accel_count = data.get('harsh_accel_count', 0)
        sharp_turn_count = data.get('sharp_turn_count', 0)
        overspeeding_seconds = data.get('overspeeding_seconds', 0)
        
        if model is None:
            # Use rule-based classification
            prediction = classify_driver_behavior(
                harsh_brake_count, harsh_accel_count, 
                sharp_turn_count, overspeeding_seconds
            )
        else:
            # Use ML model if available
            features = np.array([[
                harsh_brake_count, harsh_accel_count,
                sharp_turn_count, overspeeding_seconds
            ]])
            
            pred = model.predict(features)[0]
            confidence = model.predict_proba(features)[0].max()
            
            # Map model predictions to Safe/Aggressive
            if pred.lower() in ['careful', 'safe', '0']:
                driver_type = "Safe"
                risk_score = int((1 - confidence) * 50)
                recommendations = [
                    "Keep up the excellent work!",
                    "Maintain steady driving patterns",
                    "Continue following traffic rules"
                ]
            else:
                driver_type = "Aggressive"
                risk_score = int(50 + (1 - confidence) * 50)
                recommendations = [
                    "Try to drive more carefully",
                    "Reduce harsh braking and acceleration",
                    "Maintain safe following distance"
                ]
            
            prediction = {
                "driver_type": driver_type,
                "confidence": float(confidence),
                "risk_score": risk_score,
                "recommendations": recommendations
            }
        
        return jsonify(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        # Mock authentication
        if email == "admin@vahanai.com" and password == "admin123":
            return jsonify({
                "token": "mock_jwt_token_12345",
                "user": {
                    "id": 1,
                    "email": email,
                    "name": "Admin User"
                }
            })
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/auth/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        # Mock signup
        return jsonify({
            "token": "mock_jwt_token_67890",
            "user": {
                "id": 2,
                "email": data.get('email'),
                "name": data.get('name', 'New User')
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)