import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Grid, Button, Box, Chip, Avatar, useTheme, Fade, Divider, Zoom
} from "@mui/material";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
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
  { time: "10:20", confidence: 0.82 },
  { time: "10:25", confidence: 0.88 },
];

const pieData = [
  { name: "Battery", value: 85 },
  { name: "Brakes", value: 70 },
  { name: "Engine", value: 92 },
];

const COLORS = ["#FF6B35", "#F7931E", "#4CAF50"];

export default function Dashboard({ user }) {
  const [behavior, setBehavior] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [loadingBehavior, setLoadingBehavior] = useState(false);
  const [loadingMaint, setLoadingMaint] = useState(false);
  const theme = useTheme();

  // Mock data generators for guest mode
  const generateMockBehavior = () => {
    const mockResponses = [
      {
        predicted_behavior_label: "Safe Driving",
        predicted_behavior_code: 0,
        confidence: 87,
        user: user?.username || "DEMO_USER",
        vehicle_no: user?.vehicleNumber || `DEMO-${Math.floor(Math.random() * 9999)}`,
      },
      {
        predicted_behavior_label: "Risky Driving",
        predicted_behavior_code: 1,
        confidence: 73,
        user: user?.username || "DEMO_USER",
        vehicle_no: user?.vehicleNumber || `DEMO-${Math.floor(Math.random() * 9999)}`,
      },
      {
        predicted_behavior_label: "Safe Driving",
        predicted_behavior_code: 0,
        confidence: 92,
        user: user?.username || "DEMO_USER",
        vehicle_no: user?.vehicleNumber || `DEMO-${Math.floor(Math.random() * 9999)}`,
      }
    ];
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  };

  const generateMockMaintenance = () => {
    const mockResponses = [
      {
        battery: "Battery Good (12.5V)",
        brakes: "Brakes Service Soon (3.2mm)",
        engine: "Engine Normal (85°C)",
        overall_health: 78,
        user: user?.username || "DEMO_USER",
        vehicle_no: user?.vehicleNumber || `DEMO-${Math.floor(Math.random() * 9999)}`,
      },
      {
        battery: "Battery Low (11.2V)",
        brakes: "Brakes Good (8.5mm)",
        engine: "Engine High Temp (102°C)",
        overall_health: 65,
        user: user?.username || "DEMO_USER",
        vehicle_no: user?.vehicleNumber || `DEMO-${Math.floor(Math.random() * 9999)}`,
      },
      {
        battery: "Battery Good (12.8V)",
        brakes: "Brakes Good (7.1mm)",
        engine: "Engine Normal (78°C)",
        overall_health: 92,
        user: user?.username || "DEMO_USER",
        vehicle_no: user?.vehicleNumber || `DEMO-${Math.floor(Math.random() * 9999)}`,
      }
    ];
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  };

  const callBehavior = async () => {
    setLoadingBehavior(true);
    try {
      if (!user) {
        // Guest mode - use mock data
        setTimeout(() => {
          setBehavior(generateMockBehavior());
          setLoadingBehavior(false);
        }, 1500);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login.');
      }

      const res = await axios.post("http://localhost:5000/predict_trip_behavior", {
        harsh_brake_count: 3,
        harsh_accel_count: 2,
        sharp_turn_count: 1,
        overspeeding_seconds: 45
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBehavior(res.data);
    } catch (err) {
      setBehavior({ error: err.message || "Failed to fetch behavior data" });
    } finally {
      setLoadingBehavior(false);
    }
  };

  const callMaintenance = async () => {
    setLoadingMaint(true);
    try {
      if (!user) {
        // Guest mode - use mock data
        setTimeout(() => {
          setMaintenance(generateMockMaintenance());
          setLoadingMaint(false);
        }, 1500);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login.');
      }

      const res = await axios.post("http://localhost:5000/predict_maintenance_status", {
        battery_voltage: 11.8,
        brake_pad_thickness: 2.5,
        engine_temp: 95
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMaintenance(res.data);
    } catch (err) {
      setMaintenance({ error: err.message || "Failed to fetch maintenance data" });
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
        ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
      py: 4,
      px: 2,
    }}>
      {/* Background overlay matching LandingPage */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(120deg, rgba(255, 107, 53, 0.05) 0%, rgba(247, 147, 30, 0.05) 100%)'
          : 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255, 107, 53, 0.08) 100%)',
      }} />

      <Container maxWidth="lg" sx={{ 
        mt: 0, 
        pt: 0, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        position: 'relative', 
        zIndex: 2 
      }}>
        {/* Header with LandingPage styling */}
        <Typography 
          variant="h3" 
          fontWeight={800} 
          align="center" 
          gutterBottom 
          sx={{ 
            letterSpacing: 0.5, 
            mb: 4, 
            mt: 0, 
            pt: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: { xs: 32, sm: 40, md: 48 },
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #fff 30%, #FF6B35 70%, #F7931E 90%)'
              : 'linear-gradient(45deg, #333 30%, #FF6B35 70%, #F7931E 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          <DirectionsCarIcon 
            sx={{ 
              verticalAlign: 'middle', 
              mr: 2, 
              color: '#FF6B35',
              fontSize: { xs: 40, sm: 48, md: 56 }
            }} 
          />
          Smart Vehicle Dashboard
        </Typography>

        {/* User greeting */}
        {user ? (
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 4, 
              color: theme.palette.text.secondary,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Welcome back, {user.username}! Monitor your vehicle's performance and safety.
          </Typography>
        ) : (
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 4, 
              color: theme.palette.text.secondary,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            🚀 Demo Mode - Experience AI-powered vehicle analytics with sample data
          </Typography>
        )}

        {/* Cards Grid */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ flex: 1, alignItems: 'center' }}>
          {/* Driver Behavior Card */}
          <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
            <Zoom in timeout={700}>
              <Card elevation={12} sx={{
                borderRadius: 4,
                p: 3,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                minWidth: { xs: '100%', sm: 380, lg: 420 },
                minHeight: { xs: 450, sm: 480, lg: 520 },
                width: '100%',
                maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '2px solid #FF6B35',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(255, 107, 53, 0.15)'
                  : '0 8px 32px rgba(255, 107, 53, 0.10)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  borderColor: '#F7931E',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 16px 48px rgba(255, 107, 53, 0.25)'
                    : '0 16px 48px rgba(255, 107, 53, 0.18)',
                },
              }}>
                <CardContent sx={{ 
                  p: 3, 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  height: '100%' 
                }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: '#FF6B35', 
                      width: 48, 
                      height: 48,
                      boxShadow: 2
                    }}>
                      <SpeedIcon fontSize="medium" />
                    </Avatar>
                    <Typography 
                      variant="h5" 
                      fontWeight={700} 
                      sx={{ 
                        fontSize: { xs: 18, sm: 20, md: 22 },
                        color: '#FF6B35'
                      }}
                    >
                      Driver Behavior Analysis
                    </Typography>
                  </Box>

                  {/* Action Button */}
                  <Button 
                    variant="contained" 
                    onClick={callBehavior} 
                    disabled={loadingBehavior} 
                    size="large"
                    sx={{ 
                      borderRadius: 3, 
                      fontWeight: 600, 
                      fontSize: { xs: 14, sm: 16 },
                      py: 1.5,
                      px: 4,
                      mb: 3,
                      background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 4px 15px rgba(255, 107, 53, 0.4)'
                        : '0 4px 15px rgba(255, 107, 53, 0.3)',
                      '&:hover': { 
                        background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
                        boxShadow: theme.palette.mode === 'dark' 
                          ? '0 6px 20px rgba(255, 107, 53, 0.6)'
                          : '0 6px 20px rgba(255, 107, 53, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loadingBehavior ? "Analyzing..." : user ? "Analyze Driver Behavior" : "Try Demo Analysis"}
                  </Button>

                  {/* Results Display */}
                  {behavior && !behavior.error && (
                    <Fade in>
                      <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                        <Zoom in>
                          <Chip
                            label={behavior.predicted_behavior_label}
                            color={behavior.predicted_behavior_code === 1 ? "error" : "success"}
                            icon={<SpeedIcon fontSize="small" />}
                            sx={{ 
                              fontWeight: 600, 
                              fontSize: { xs: 14, sm: 16 },
                              py: 2,
                              px: 2,
                              height: 'auto',
                              borderRadius: 3,
                              mb: 2,
                              '& .MuiChip-icon': {
                                fontSize: 18
                              }
                            }}
                          />
                        </Zoom>
                        {behavior.confidence && (
                          <Typography 
                            variant="body1" 
                            fontWeight={600}
                            sx={{ 
                              color: theme.palette.text.secondary,
                              fontSize: { xs: 14, sm: 16 }
                            }}
                          >
                            Confidence: {behavior.confidence}%
                          </Typography>
                        )}
                        {!user && (
                          <Chip 
                            label="DEMO DATA" 
                            color="info"
                            variant="outlined"
                            size="small"
                            sx={{ mt: 1, fontWeight: 600 }}
                          />
                        )}
                      </Box>
                    </Fade>
                  )}

                  {behavior && behavior.error && (
                    <Typography 
                      color="error" 
                      sx={{ 
                        mt: 1, 
                        fontSize: { xs: 13, sm: 14 },
                        textAlign: 'center'
                      }}
                    >
                      {behavior.error}
                    </Typography>
                  )}

                  {/* Chart */}
                  <Box sx={{ width: '100%', flex: 1, minHeight: 200 }}>
                    <Typography 
                      variant="subtitle1" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1, 
                        fontSize: { xs: 13, sm: 14 },
                        textAlign: 'center',
                        fontWeight: 600
                      }}
                    >
                      Confidence Timeline
                    </Typography>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                        <XAxis 
                          dataKey="time" 
                          fontSize={11} 
                          stroke={theme.palette.text.secondary}
                        />
                        <YAxis 
                          domain={[0, 1]} 
                          fontSize={11}
                          stroke={theme.palette.text.secondary}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 8
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="confidence" 
                          stroke="#FF6B35" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: '#FF6B35' }}
                          activeDot={{ r: 6, fill: '#F7931E' }}
                          isAnimationActive 
                          animationDuration={800} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Maintenance Card */}
          <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
            <Zoom in timeout={900}>
              <Card elevation={12} sx={{
                borderRadius: 4,
                p: 3,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                minWidth: { xs: '100%', sm: 380, lg: 420 },
                minHeight: { xs: 450, sm: 480, lg: 520 },
                width: '100%',
                maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '2px solid #F7931E',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(247, 147, 30, 0.15)'
                  : '0 8px 32px rgba(247, 147, 30, 0.10)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  borderColor: '#FF6B35',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 16px 48px rgba(247, 147, 30, 0.25)'
                    : '0 16px 48px rgba(247, 147, 30, 0.18)',
                },
              }}>
                <CardContent sx={{ 
                  p: 3, 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center' 
                }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, justifyContent: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: '#F7931E', 
                      width: 48, 
                      height: 48,
                      boxShadow: 2
                    }}>
                      <BuildCircleIcon fontSize="medium" />
                    </Avatar>
                    <Typography 
                      variant="h5" 
                      fontWeight={700} 
                      sx={{ 
                        fontSize: { xs: 18, sm: 20, md: 22 },
                        color: '#F7931E'
                      }}
                    >
                      Maintenance Insights
                    </Typography>
                  </Box>

                  {/* Action Button */}
                  <Button 
                    variant="contained" 
                    onClick={callMaintenance} 
                    disabled={loadingMaint} 
                    size="large"
                    sx={{ 
                      borderRadius: 3, 
                      fontWeight: 600, 
                      fontSize: { xs: 14, sm: 16 },
                      py: 1.5,
                      px: 4,
                      mb: 3,
                      background: 'linear-gradient(45deg, #F7931E, #FF6B35)',
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 4px 15px rgba(247, 147, 30, 0.4)'
                        : '0 4px 15px rgba(247, 147, 30, 0.3)',
                      '&:hover': { 
                        background: 'linear-gradient(45deg, #FB9D2B, #FF8A50)',
                        boxShadow: theme.palette.mode === 'dark' 
                          ? '0 6px 20px rgba(247, 147, 30, 0.6)'
                          : '0 6px 20px rgba(247, 147, 30, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loadingMaint ? "Analyzing..." : user ? "Check Maintenance Status" : "Try Demo Check"}
                  </Button>

                  {/* Error Display */}
                  {maintenance && maintenance.error && (
                    <Typography 
                      color="error" 
                      sx={{ 
                        mt: 1, 
                        fontSize: { xs: 13, sm: 14 },
                        textAlign: 'center'
                      }}
                    >
                      {maintenance.error}
                    </Typography>
                  )}

                  {/* Results Display */}
                  <Box sx={{ mt: 1.5 }}>
                    {maintenance && !maintenance.error ? (
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Zoom in>
                            <Chip
                              avatar={<Avatar sx={{ bgcolor: '#FF6B35', width: 24, height: 24 }}><BatteryChargingFullIcon fontSize="small" /></Avatar>}
                              label={maintenance.battery}
                              color={maintenance.battery?.toLowerCase().includes('low') ? 'error' : 'success'}
                              sx={{ 
                                width: '100%', 
                                mb: 1, 
                                fontWeight: 500, 
                                fontSize: { xs: 12, sm: 13 },
                                borderRadius: 2, 
                                boxShadow: 1,
                                height: 'auto',
                                py: 1
                              }}
                            />
                          </Zoom>
                        </Grid>
                        <Grid item xs={12}>
                          <Zoom in>
                            <Chip
                              avatar={<Avatar sx={{ bgcolor: '#F7931E', width: 24, height: 24 }}><EngineeringIcon fontSize="small" /></Avatar>}
                              label={maintenance.brakes}
                              color={maintenance.brakes?.toLowerCase().includes('service') ? 'error' : 'success'}
                              sx={{ 
                                width: '100%', 
                                mb: 1, 
                                fontWeight: 500, 
                                fontSize: { xs: 12, sm: 13 },
                                borderRadius: 2, 
                                boxShadow: 1,
                                height: 'auto',
                                py: 1
                              }}
                            />
                          </Zoom>
                        </Grid>
                        <Grid item xs={12}>
                          <Zoom in>
                            <Chip
                              avatar={<Avatar sx={{ bgcolor: '#4CAF50', width: 24, height: 24 }}><DirectionsCarIcon fontSize="small" /></Avatar>}
                              label={maintenance.engine}
                              color={maintenance.engine?.toLowerCase().includes('high') ? 'error' : 'success'}
                              sx={{ 
                                width: '100%', 
                                mb: 2, 
                                fontWeight: 500, 
                                fontSize: { xs: 12, sm: 13 },
                                borderRadius: 2, 
                                boxShadow: 1,
                                height: 'auto',
                                py: 1
                              }}
                            />
                          </Zoom>
                        </Grid>
                        {!user && (
                          <Grid item xs={12}>
                            <Chip 
                              label="DEMO DATA" 
                              color="info"
                              variant="outlined"
                              size="small"
                              sx={{ fontWeight: 600, mb: 2 }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    ) : !maintenance ? (
                      <Typography 
                        color="text.secondary" 
                        sx={{ 
                          fontSize: { xs: 13, sm: 14 },
                          textAlign: 'center',
                          mb: 2
                        }}
                      >
                        No maintenance data yet — click above to analyze.
                      </Typography>
                    ) : null}
                  </Box>

                  {/* Chart */}
                  <Box sx={{ mt: 2, flex: 1, minHeight: 160 }}>
                    <Typography 
                      variant="subtitle1" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1, 
                        fontSize: { xs: 13, sm: 14 },
                        textAlign: 'center',
                        fontWeight: 600
                      }}
                    >
                      System Health Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={pieData} 
                          dataKey="value" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={60}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                          isAnimationActive 
                          animationDuration={800}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 8
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        {/* Footer for guest mode */}
        {!user && (
          <Box sx={{ 
            mt: 4, 
            p: 3, 
            textAlign: 'center',
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 30, 0.8)'
              : 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
            border: '1px solid rgba(255, 107, 53, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: 13, sm: 14 } }}
            >
              🎯 <strong>Demo Mode:</strong> You're experiencing our AI capabilities with sample data. 
              Create an account to connect your real vehicle data and get personalized insights!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}