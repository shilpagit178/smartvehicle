from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, verify_jwt_in_request, get_jwt_identity
import joblib
import numpy as np
import os
from datetime import timedelta

app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

# Simple in-memory user storage (replace with database in production)
users = {}

# Load the pre-trained TRIP-BASED model
try:
    model = joblib.load('trip_driver_model.pkl')
    model_features = ['harsh_brake_count', 'harsh_accel_count', 'sharp_turn_count', 'overspeeding_seconds']
except FileNotFoundError:
    print("Model file not found! Please run train_trip_model.py first.")
    model = None

# Health check endpoint
@app.route('/')
def home():
    return "✅ Backend is running! Use /predict_trip_behavior and /predict_maintenance_status (POST)."

# User registration endpoint
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        vehicle_number = data.get('vehicleNumber')

        if not all([username, email, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        if email in users:
            return jsonify({'error': 'User already exists'}), 400

        # Store user (in production, hash the password!)
        users[email] = {
            'username': username,
            'email': email,
            'password': password,  # In production: hash this!
            'vehicle_number': vehicle_number
        }

        # Create access token
        access_token = create_access_token(identity=email)

        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': {
                'username': username,
                'email': email,
                'vehicleNumber': vehicle_number
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# User login endpoint
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return jsonify({'error': 'Missing email or password'}), 400

        # Check if user exists
        user = users.get(email)
        if not user or user['password'] != password:
            return jsonify({'error': 'Invalid credentials'}), 401

        # Create access token
        access_token = create_access_token(identity=email)

        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'username': user['username'],
                'email': user['email'],
                'vehicleNumber': user.get('vehicle_number')
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Protected route decorator
def token_required(f):
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid or missing token'}), 401
    decorated.__name__ = f.__name__
    return decorated

# Trip behavior prediction endpoint (protected)
@app.route('/predict_trip_behavior', methods=['POST'])
@token_required
def predict_trip_behavior():
    if model is None:
        return jsonify({'error': 'Model not loaded. Please check server logs.'}), 500

    try:
        current_user = get_jwt_identity()
        user = users.get(current_user)
        
        data = request.get_json(force=True)
        print(f"Received data: {data}")

        brake_count = data.get('harsh_brake_count', 0)
        accel_count = data.get('harsh_accel_count', 0)
        turn_count = data.get('sharp_turn_count', 0)
        overspeed_seconds = data.get('overspeeding_seconds', 0)

        input_features = np.array([[brake_count, accel_count, turn_count, overspeed_seconds]])
        prediction_code = model.predict(input_features)[0]
        
        # Calculate confidence (mock for now)
        confidence = np.random.randint(75, 95)
        
        behavior_label = 'Risky Driving' if prediction_code == 1 else 'Safe Driving'

        return jsonify({
            'predicted_behavior_code': int(prediction_code),
            'predicted_behavior_label': behavior_label,
            'confidence': confidence,
            'user': user['username'],
            'vehicle_no': user.get('vehicle_number', 'N/A')
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Vehicle maintenance prediction endpoint (protected)
@app.route('/predict_maintenance_status', methods=['POST'])
@token_required
def predict_maintenance_status():
    try:
        current_user = get_jwt_identity()
        user = users.get(current_user)
        
        data = request.get_json(force=True)
        
        battery_voltage = data.get("battery_voltage", 12.5)
        brake_thickness = data.get("brake_pad_thickness", 5)
        engine_temp = data.get("engine_temp", 90)
        
        battery_status = f"Battery {'Low' if battery_voltage < 12 else 'Good'} ({battery_voltage}V)"
        brake_status = f"Brakes {'Service Soon' if brake_thickness < 3 else 'Good'} ({brake_thickness}mm)"
        engine_status = f"Engine {'High Temp' if engine_temp > 100 else 'Normal'} ({engine_temp}°C)"
        
        # Calculate overall health
        health_score = 100
        if battery_voltage < 12: health_score -= 15
        if brake_thickness < 3: health_score -= 20
        if engine_temp > 100: health_score -= 25
        
        return jsonify({
            "battery": battery_status,
            "brakes": brake_status,
            "engine": engine_status,
            "overall_health": max(health_score, 0),
            "user": user['username'],
            "vehicle_no": user.get('vehicle_number', 'N/A')
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
