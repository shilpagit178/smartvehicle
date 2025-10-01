from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load the pre-trained TRIP-BASED model
try:
    model = joblib.load('trip_driver_model.pkl')
    # Model expects: ['harsh_brake_count', 'harsh_accel_count', 'sharp_turn_count', 'overspeeding_seconds']
    model_features = ['harsh_brake_count', 'harsh_accel_count', 'sharp_turn_count', 'overspeeding_seconds']
except FileNotFoundError:
    print("Model file not found! Please run train_trip_model.py first.")
    model = None

# Health check endpoint
@app.route('/')
def home():
    return "✅ Backend is running! Use /predict_trip_behavior and /predict_maintenance_status (POST)."

# Trip behavior prediction endpoint
@app.route('/predict_trip_behavior', methods=['POST'])
def predict_trip_behavior():
    if model is None:
        return jsonify({'error': 'Model not loaded. Please check server logs.'}), 500

    try:
        # Get trip summary data from POST request
        data = request.get_json(force=True)
        print(f"Received data: {data}")

        # Extract features with default values
        brake_count = data.get('harsh_brake_count', 0)
        accel_count = data.get('harsh_accel_count', 0)
        turn_count = data.get('sharp_turn_count', 0)
        overspeed_seconds = data.get('overspeeding_seconds', 0)

        # Prepare input for model (2D array required)
        input_features = np.array([[brake_count, accel_count, turn_count, overspeed_seconds]])

        # Make prediction
        prediction_code = model.predict(input_features)[0]
        behavior_label = 'Aggressive' if prediction_code == 1 else 'Safe'

        return jsonify({
            'predicted_behavior_code': int(prediction_code),
            'predicted_behavior_label': behavior_label
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Vehicle maintenance prediction endpoint
@app.route('/predict_maintenance_status', methods=['POST'])
def predict_maintenance_status():
    try:
        data = request.get_json(force=True)
        return jsonify({
            "battery": "Low Battery Detected" if data.get("battery_voltage", 12.5) < 12 else "Battery OK",
            "brakes": "Service Required" if data.get("brake_pad_thickness", 5) < 3 else "Brakes OK",
            "engine": "Engine Temperature High" if data.get("engine_temp", 90) > 100 else "Engine Health is Good"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # Use Railway's PORT or default 5000
    app.run(host='0.0.0.0', port=port)
