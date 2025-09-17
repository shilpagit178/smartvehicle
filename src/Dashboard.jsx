import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Grid, Button, Box, Chip
} from "@mui/material";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell
} from "recharts";

const lineData = [
  { time: "10:00", confidence: 0.7 },
  { time: "10:05", confidence: 0.8 },
  { time: "10:10", confidence: 0.85 },
  { time: "10:15", confidence: 0.78 },
];

const pieData = [
  { name: "Battery", value: 1 },
  { name: "Brakes", value: 1 },
  { name: "Engine", value: 1 },
];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  const [behavior, setBehavior] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [loadingBehavior, setLoadingBehavior] = useState(false);
  const [loadingMaint, setLoadingMaint] = useState(false);

  const callBehavior = async () => {
    setLoadingBehavior(true);
    try {
      const res = await axios.post("http://localhost:5000/predict_trip_behavior", {
        harsh_brake_count: 3,
        harsh_accel_count: 2,
        sharp_turn_count: 1,
        overspeeding_seconds: 45
      });
      setBehavior(res.data);
    } catch (err) {
      console.error(err);
      setBehavior({ error: "Failed to fetch" });
    } finally {
      setLoadingBehavior(false);
    }
  };

  const callMaintenance = async () => {
    setLoadingMaint(true);
    try {
      const res = await axios.post("http://localhost:5000/predict_maintenance_status", {
        battery_voltage: 11.8,
        brake_pad_thickness: 2.5,
        engine_temp: 95
      });
      setMaintenance(res.data);
    } catch (err) {
      console.error(err);
      setMaintenance({ error: "Failed to fetch" });
    } finally {
      setLoadingMaint(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Driver Behavior</Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="contained" onClick={callBehavior} disabled={loadingBehavior}>
                  {loadingBehavior ? "Checking..." : "Check Driver Behavior"}
                </Button>
                {behavior && behavior.predicted_behavior_label && (
                  <Chip label={behavior.predicted_behavior_label} color={behavior.predicted_behavior_code === 1 ? "error" : "success"} />
                )}
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">Confidence timeline</Typography>
                <LineChart width={400} height={200} data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="confidence" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Maintenance Insights</Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="contained" onClick={callMaintenance} disabled={loadingMaint}>
                  {loadingMaint ? "Checking..." : "Check Maintenance"}
                </Button>
              </Box>

              <Box sx={{ mt: 3 }}>
                {maintenance ? (
                  maintenance.error ? (
                    <Typography color="error">{maintenance.error}</Typography>
                  ) : (
                    <ul>
                      <li>{maintenance.battery}</li>
                      <li>{maintenance.brakes}</li>
                      <li>{maintenance.engine}</li>
                    </ul>
                  )
                ) : (
                  <Typography color="text.secondary">No maintenance data yet — click above to fetch.</Typography>
                )}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Maintenance categories</Typography>
                <PieChart width={300} height={200}>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={60} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="caption" color="text.secondary">
          Note: Backend calls are performed on button click. Keep backend running at http://localhost:5000
        </Typography>
      </Box>
    </Container>
  );
}

