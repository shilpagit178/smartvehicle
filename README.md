# VahanAI: Smart Vehicle Dashboard

A full-stack web app that classifies driving behavior (Safe / Aggressive) and flags vehicle maintenance needs, with an interactive dashboard on top.

Built for **Smart India Hackathon 2025** (Problem Statement ID: 25136) by **Team Maverick**.

**Live demo:** https://smartvehicle.vercel.app
**Demo login:** `admin@vahanai.com` / `password`

---

## Problem Statement

Build a smart vehicle dashboard that gives users insight into driver behavior and vehicle maintenance using machine learning, presented in a clean, easy-to-read interface.

## What it does

- **Driver behavior classification:** takes trip metrics (harsh braking, harsh acceleration, sharp turns, overspeeding time) and returns a Safe / Aggressive label, a confidence value, a risk score and driving recommendations.
- **Maintenance status:** takes mileage, last service date and engine hours, and returns Good / Needs Attention / Critical with a list of issues and a suggested next service date.
- **Dashboard:** confidence trend line chart, health breakdown pie chart and status cards built with Recharts and Material UI.
- **Other pages:** landing page, about page, activity logs, login and signup, light/dark theme.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, Material UI, Recharts, Axios, React Router |
| Backend | Python, Flask, Flask-CORS |
| ML | scikit-learn model (`trip_driver_model.pkl`) |
| Deployment | Vercel (frontend), Railway (backend) |

## How it works

```
React dashboard ──HTTP/JSON──> Flask API ──> scikit-learn model (driver behavior)
                                         └─> rule-based logic (maintenance)
```

- `POST /predict_trip_behavior` runs the trained model on the four trip features. If the model fails to load, it falls back to a rule-based scoring function.
- `POST /predict_maintenance_status` uses rule-based checks (service intervals, days since last service, engine hours). It is **not** a trained ML model.
- The API base URL is set through `VITE_API_URL`.

## Run locally

**Backend**
```bash
cd backend
pip install -r requirements.txt
python app.py        # runs on http://localhost:5000
```

**Frontend**
```bash
npm install
npm run dev          # runs on http://localhost:5173
```
Create a `.env` file with `VITE_API_URL=http://localhost:5000`.

## Known limitations

This was built as a hackathon prototype and my first deployed full-stack project, so some parts are simplified:

- **Authentication is a demo.** Login and signup use mock tokens, with no database and no real JWT validation yet.
- **Dashboard inputs are fixed.** The dashboard sends sample trip and vehicle values rather than live telemetry, and some chart data is generated for visualization.
- **Maintenance prediction is rule-based**, not learned from data.

## Roadmap

- Real authentication (hashed passwords, JWT, a database)
- Live data input (OBD-II / sensor feed or CSV upload)
- Train a maintenance model on real service data
- Add model training notebook and evaluation metrics to the repo

## Team

Team Maverick, SIH 2025.

| Contributor | Contribution |
|---|---|
| **Shilpa Kumari** | Entire web application: React frontend and dashboard UI, Flask backend and API design, deployment (Vercel + Railway), and integration of the ML model |
| **Shourja Banerjee** | Driver behavior ML model (training and evaluation), co-integrated with the backend |
