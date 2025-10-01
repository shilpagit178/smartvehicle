export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  PREDICT_BEHAVIOR: '/predict_trip_behavior',
  PREDICT_MAINTENANCE: '/predict_maintenance_status'
};