import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Grid, Button, Box, Chip, Avatar, useTheme, Fade, Divider, Zoom
} from "@mui/material";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell
} from "recharts";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

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
const COLORS = ["#7C4DFF", "#00BFAE", "#FFD600"];


export default function Dashboard() {
  const [behavior, setBehavior] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [loadingBehavior, setLoadingBehavior] = useState(false);
  const [loadingMaint, setLoadingMaint] = useState(false);
  const theme = useTheme();

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
      setMaintenance({ error: "Failed to fetch" });
    } finally {
      setLoadingMaint(false);
    }
  };

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(120deg, #232526 0%, #353a40 100%)'
        : 'linear-gradient(120deg, #f6f8fc 0%, #e9eef6 100%)',
      py: 4,
      px: 2,
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(124,77,255,0.08) 100%)',
      }} />
    <Container maxWidth="lg" sx={{ mt: 0, pt: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
  <Typography variant="h3" fontWeight={800} align="center" gutterBottom sx={{ letterSpacing: 0.5, mb: 2, mt: 0, pt: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: 32, sm: 40 } }}>
          <DirectionsCarIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1, color: theme.palette.primary.main }} />
          Dashboard
        </Typography>

  <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ flex: 1, alignItems: 'center', minHeight: 400 }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
            <Zoom in timeout={700}>
              <Card elevation={8} sx={{
                borderRadius: 5,
                p: 4,
                bgcolor: theme.palette.background.paper,
                minWidth: 340,
                minHeight: 400,
                width: 1,
                height: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: `2px solid ${theme.palette.primary.light}`,
                boxShadow: '0 8px 32px 0 rgba(124,77,255,0.10)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                willChange: 'transform',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-16px) scale(1.04)',
                  boxShadow: '0 16px 48px 0 rgba(124,77,255,0.18)',
                },
              }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <SpeedIcon color="primary" fontSize="small" />
                    <Typography variant="h6" fontWeight={500} sx={{ fontSize: 17 }}>Driver Behavior</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1.5, mt: 1, alignItems: 'center' }}>
                    <Button variant="contained" onClick={callBehavior} disabled={loadingBehavior} size="medium" sx={{ borderRadius: 2, fontWeight: 500, boxShadow: 1, fontSize: 14, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
                      {loadingBehavior ? "Checking..." : "Check Driver Behavior"}
                    </Button>
                    {behavior && behavior.predicted_behavior_label && (
                      <Zoom in>
                        <Chip
                          label={behavior.predicted_behavior_label}
                          color={behavior.predicted_behavior_code === 1 ? "error" : "success"}
                          icon={<EngineeringIcon fontSize="small" />}
                          sx={{ fontWeight: 500, fontSize: 13, px: 1.5, borderRadius: 1, boxShadow: 1 }}
                        />
                      </Zoom>
                    )}
                  </Box>
                  {behavior && behavior.error && (
                    <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>{behavior.error}</Typography>
                  )}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, fontSize: 13 }}>Confidence timeline</Typography>
                    <LineChart width={340} height={160} data={lineData} style={{ margin: '0 auto' }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" fontSize={11} />
                      <YAxis domain={[0, 1]} fontSize={11} />
                      <Tooltip />
                      <Line type="monotone" dataKey="confidence" stroke={theme.palette.primary.main} strokeWidth={2} dot={{ r: 3 }} isAnimationActive animationDuration={800} />
                    </LineChart>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
            <Zoom in timeout={900}>
              <Card elevation={8} sx={{
                borderRadius: 5,
                p: 4,
                bgcolor: theme.palette.background.paper,
                minWidth: 340,
                minHeight: 400,
                width: 1,
                height: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: `2px solid #7C4DFF`,
                boxShadow: '0 8px 32px 0 rgba(124,77,255,0.10)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                willChange: 'transform',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px 0 rgba(124,77,255,0.18)',
                },
              }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <BuildCircleIcon color="primary" fontSize="small" />
                    <Typography variant="h6" fontWeight={500} sx={{ fontSize: 17 }}>Maintenance Insights</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1.5, mt: 1, alignItems: 'center' }}>
                    <Button variant="contained" onClick={callMaintenance} disabled={loadingMaint} size="medium" sx={{ borderRadius: 2, fontWeight: 500, boxShadow: 1, fontSize: 14, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
                      {loadingMaint ? "Checking..." : "Check Maintenance"}
                    </Button>
                  </Box>
                  {maintenance && maintenance.error && (
                    <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>{maintenance.error}</Typography>
                  )}
                  <Box sx={{ mt: 1.5 }}>
                    {maintenance ? (
                      maintenance.error ? null : (
                        <Grid container spacing={0.5}>
                          <Grid item xs={12} sm={4}>
                            <Zoom in>
                              <Chip
                                avatar={<Avatar sx={{ bgcolor: '#7C4DFF', width: 22, height: 22 }}><BatteryChargingFullIcon fontSize="small" /></Avatar>}
                                label={maintenance.battery}
                                color={maintenance.battery?.toLowerCase().includes('low') ? 'error' : 'success'}
                                sx={{ width: '100%', mb: 0.5, fontWeight: 400, fontSize: 12, borderRadius: 1, boxShadow: 1 }}
                              />
                            </Zoom>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Zoom in>
                              <Chip
                                avatar={<Avatar sx={{ bgcolor: '#00BFAE', width: 22, height: 22 }}><EngineeringIcon fontSize="small" /></Avatar>}
                                label={maintenance.brakes}
                                color={maintenance.brakes?.toLowerCase().includes('service') ? 'error' : 'success'}
                                sx={{ width: '100%', mb: 0.5, fontWeight: 400, fontSize: 12, borderRadius: 1, boxShadow: 1 }}
                              />
                            </Zoom>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Zoom in>
                              <Chip
                                avatar={<Avatar sx={{ bgcolor: '#FFD600', width: 22, height: 22 }}><DirectionsCarIcon fontSize="small" /></Avatar>}
                                label={maintenance.engine}
                                color={maintenance.engine?.toLowerCase().includes('high') ? 'error' : 'success'}
                                sx={{ width: '100%', mb: 0.5, fontWeight: 400, fontSize: 12, borderRadius: 1, boxShadow: 1 }}
                              />
                            </Zoom>
                          </Grid>
                        </Grid>
                      )
                    ) : (
                      <Typography color="text.secondary" sx={{ fontSize: 13 }}>No maintenance data yet — click above to fetch.</Typography>
                    )}
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, fontSize: 13 }}>Maintenance categories</Typography>
                    <PieChart width={220} height={130} style={{ margin: '0 auto' }}>
                      <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={45} label isAnimationActive animationDuration={800}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

