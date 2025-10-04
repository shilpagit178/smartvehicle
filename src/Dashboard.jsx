import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Grid, Button, Box, Chip, Avatar, useTheme, Fade, Zoom, List, ListItem, ListItemText, ListItemIcon
} from "@mui/material";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Dashboard({ user }) {
  const [behavior, setBehavior] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [loadingBehavior, setLoadingBehavior] = useState(false);
  const [loadingMaint, setLoadingMaint] = useState(false);
  const [confidenceHistory, setConfidenceHistory] = useState([]);
  const theme = useTheme();

  const generateCorrelatedData = (confidence) => {
    const normalizedConfidence = Math.round(confidence);
    let healthScore, behaviorData, maintenanceData;
    
    if (normalizedConfidence >= 85) {
      healthScore = 90 + Math.floor((normalizedConfidence - 85) / 2);
      behaviorData = {
        driver_type: "Safe",
        confidence: normalizedConfidence,
        risk_score: Math.max(5, 20 - Math.floor((normalizedConfidence - 85) / 2)),
        safety_rating: "A+",
        category: "Excellent Driver",
        driving_events: {
          harsh_brakes: 0,
          harsh_accels: 1,
          sharp_turns: 0,
          speed_violations: 2
        }
      };
      maintenanceData = {
        status: "Excellent",
        overall_health: healthScore,
        battery: "Battery Excellent (12.8V)",
        brakes: "Brakes Perfect (8.5mm)",
        engine: "Engine Optimal (75°C)",
        health_breakdown: {
          excellent: 85,
          good: 10,
          fair: 3,
          poor: 2
        }
      };
    } else if (normalizedConfidence >= 70) {
      healthScore = 75 + Math.floor((normalizedConfidence - 70) / 2);
      behaviorData = {
        driver_type: "Safe",
        confidence: normalizedConfidence,
        risk_score: 25 + Math.floor((85 - normalizedConfidence) / 2),
        safety_rating: "B+",
        category: "Good Driver",
        driving_events: {
          harsh_brakes: 2,
          harsh_accels: 3,
          sharp_turns: 1,
          speed_violations: 5
        }
      };
      maintenanceData = {
        status: "Good",
        overall_health: healthScore,
        battery: "Battery Good (12.4V)",
        brakes: "Brakes Good (7.2mm)",
        engine: "Engine Normal (82°C)",
        health_breakdown: {
          excellent: 45,
          good: 35,
          fair: 15,
          poor: 5
        }
      };
    } else if (normalizedConfidence >= 50) {
      healthScore = 55 + Math.floor((normalizedConfidence - 50) / 2);
      behaviorData = {
        driver_type: "Aggressive",
        confidence: normalizedConfidence,
        risk_score: 50 + Math.floor((70 - normalizedConfidence) / 2),
        safety_rating: "C",
        category: "Risky Driver",
        driving_events: {
          harsh_brakes: 8,
          harsh_accels: 12,
          sharp_turns: 6,
          speed_violations: 15
        }
      };
      maintenanceData = {
        status: "Needs Attention",
        overall_health: healthScore,
        battery: "Battery Fair (11.8V)",
        brakes: "Brakes Service Soon (4.5mm)",
        engine: "Engine Warm (88°C)",
        health_breakdown: {
          excellent: 20,
          good: 25,
          fair: 35,
          poor: 20
        }
      };
    } else {
      healthScore = 35 + Math.floor(normalizedConfidence / 2);
      behaviorData = {
        driver_type: "Aggressive",
        confidence: normalizedConfidence,
        risk_score: 75 + Math.floor((50 - normalizedConfidence) / 2),
        safety_rating: "D",
        category: "Dangerous Driver",
        driving_events: {
          harsh_brakes: 15,
          harsh_accels: 20,
          sharp_turns: 12,
          speed_violations: 25
        }
      };
      maintenanceData = {
        status: "Critical",
        overall_health: healthScore,
        battery: "Battery Low (11.2V)",
        brakes: "Brakes Critical (2.1mm)",
        engine: "Engine Hot (95°C)",
        health_breakdown: {
          excellent: 5,
          good: 15,
          fair: 25,
          poor: 55
        }
      };
    }

    return { behaviorData, maintenanceData };
  };

  const generateTimeline = (currentConfidence) => {
    const target = currentConfidence / 100;
    const timePoints = ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'];
    
    return timePoints.map((time, index) => {
      const progress = index / (timePoints.length - 1);
      const startConfidence = Math.max(0.3, target - 0.2);
      const confidence = startConfidence + (target - startConfidence) * progress;
      
      return {
        time,
        confidence: Math.round(confidence * 100) / 100
      };
    });
  };

  const generateMaintenancePieData = (breakdown) => {
    if (!breakdown) return [];
    
    return [
      { name: 'Excellent', value: breakdown.excellent, color: '#4CAF50' },
      { name: 'Good', value: breakdown.good, color: '#8BC34A' },
      { name: 'Fair', value: breakdown.fair, color: '#FF9800' },
      { name: 'Poor', value: breakdown.poor, color: '#f44336' }
    ].filter(item => item.value > 0);
  };

  const callBehavior = async () => {
    setLoadingBehavior(true);
    try {
      let baseConfidence;
      
      if (!user) {
        const demoConfidences = [87, 73, 92, 45, 68, 91, 55, 83];
        baseConfidence = demoConfidences[Math.floor(Date.now() / 8000) % demoConfidences.length];
        
        setTimeout(() => {
          const { behaviorData } = generateCorrelatedData(baseConfidence);
          setBehavior(behaviorData);
          setConfidenceHistory(generateTimeline(baseConfidence));
          setLoadingBehavior(false);
        }, 1500);
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/predict_trip_behavior`, {
        harsh_brake_count: 3,
        harsh_accel_count: 2,
        sharp_turn_count: 1,
        overspeeding_seconds: 45
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });

      baseConfidence = Math.round(res.data.confidence * 100);
      const { behaviorData } = generateCorrelatedData(baseConfidence);
      
      setBehavior(behaviorData);
      setConfidenceHistory(generateTimeline(baseConfidence));
    } catch (err) {
      console.error('API Error:', err.message);
      const { behaviorData } = generateCorrelatedData(75);
      setBehavior(behaviorData);
      setConfidenceHistory(generateTimeline(75));
    } finally {
      setLoadingBehavior(false);
    }
  };

  const callMaintenance = async () => {
    setLoadingMaint(true);
    try {
      if (!user) {
        const confidenceLevel = behavior ? behavior.confidence : 75;
        
        setTimeout(() => {
          const { maintenanceData } = generateCorrelatedData(confidenceLevel);
          setMaintenance(maintenanceData);
          setLoadingMaint(false);
        }, 1500);
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/predict_maintenance_status`, {
        mileage: 47500,
        last_service: '2024-07-15',
        engine_hours: 2800
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });

      const baseHealth = res.data.confidence ? Math.round(res.data.confidence * 100) : 80;
      const { maintenanceData } = generateCorrelatedData(baseHealth);
      
      setMaintenance(maintenanceData);
    } catch (err) {
      console.error('API Error:', err.message);
      const { maintenanceData } = generateCorrelatedData(80);
      setMaintenance(maintenanceData);
    } finally {
      setLoadingMaint(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'excellent':
      case 'good': return 'success';
      case 'needs attention': return 'warning'; 
      case 'critical': return 'error';
      default: return 'info';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'excellent':
      case 'good': return <CheckCircleIcon />;
      case 'needs attention': return <WarningIcon />;
      case 'critical': return <ReportProblemIcon />;
      default: return <BuildCircleIcon />;
    }
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={11}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
      py: 4,
      px: 3,
    }}>
      <Container maxWidth="xl" sx={{ 
        width: '100%',
        maxWidth: '1800px !important',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            fontWeight={600} 
            align="center" 
            sx={{ 
              mb: 2,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(45deg, #FF6B35 30%, #F7931E 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <DirectionsCarIcon sx={{ mr: 2, color: '#FF6B35', fontSize: 40 }} />
            Smart Vehicle Dashboard
          </Typography>

          <Typography 
            variant="subtitle1" 
            align="center" 
            color="text.secondary"
            sx={{ maxWidth: '700px', mx: 'auto' }}
          >
            {user ? `Welcome ${user.username}!` : '🎯 Correlated AI Analysis - Behavior drives Maintenance'}
          </Typography>
        </Box>

        <Grid container spacing={5} sx={{ mb: 5, justifyContent: 'center', alignItems: 'stretch' }}>
          <Grid item xs={12} lg={6} sx={{ display: 'flex' }}>
            <Zoom in timeout={700}>
              <Card elevation={12} sx={{
                borderRadius: 4,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                border: '3px solid #FF6B35',
                minHeight: '520px',
                width: '100%',
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 12px 40px rgba(255, 107, 53, 0.2)'
                  : '0 12px 40px rgba(255, 107, 53, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 18px 50px rgba(255, 107, 53, 0.25)'
                    : '0 18px 50px rgba(255, 107, 53, 0.2)',
                },
              }}>
                <CardContent sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: 4
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
                    <Avatar sx={{ bgcolor: '#FF6B35', width: 40, height: 40 }}>
                      <SpeedIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600} color="#FF6B35">
                      Driver Behavior Analysis
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button 
                      variant="contained" 
                      onClick={callBehavior} 
                      disabled={loadingBehavior}
                      sx={{ 
                        py: 1.2,
                        px: 4,
                        fontWeight: 600,
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                        '&:hover': { 
                          background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
                          boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      {loadingBehavior ? "Analyzing..." : "Analyze Behavior"}
                    </Button>
                  </Box>

                  {behavior && (
                    <Fade in>
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                          <Typography 
                            variant="h2" 
                            fontWeight={700}
                            sx={{ 
                              color: behavior.driver_type === "Safe" ? '#4CAF50' : '#f44336',
                              mb: 1
                            }}
                          >
                            {behavior.driver_type}
                          </Typography>
                          <Chip
                            label={behavior.category}
                            color={behavior.driver_type === "Safe" ? "success" : "error"}
                            icon={behavior.driver_type === "Safe" ? <SecurityIcon /> : <ReportProblemIcon />}
                            sx={{ 
                              mb: 1, 
                              fontWeight: 600,
                              py: 1.5,
                              px: 2
                            }}
                          />
                          <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 600 }}>
                            {behavior.safety_rating}
                          </Typography>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                          <Grid item xs={6}>
                            <Box sx={{ 
                              textAlign: 'center', 
                              p: 2, 
                              border: '2px solid #FF6B35', 
                              borderRadius: 3,
                              background: 'rgba(255, 107, 53, 0.05)'
                            }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Confidence
                              </Typography>
                              <Typography variant="h4" fontWeight={600} color="#FF6B35">
                                {behavior.confidence}%
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ 
                              textAlign: 'center', 
                              p: 2, 
                              border: '2px solid #f44336', 
                              borderRadius: 3,
                              background: 'rgba(244, 67, 54, 0.05)'
                            }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Risk Score
                              </Typography>
                              <Typography variant="h4" fontWeight={600} color="#f44336">
                                {behavior.risk_score}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box sx={{ flex: 1, minHeight: 220 }}>
                          <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center', fontWeight: 600 }}>
                            Confidence Timeline
                          </Typography>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={confidenceHistory}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" fontSize={12} />
                              <YAxis domain={[0, 1]} fontSize={12} />
                              <Tooltip formatter={(value) => [`${(value * 100).toFixed(0)}%`, 'Confidence']} />
                              <Line 
                                type="monotone" 
                                dataKey="confidence" 
                                stroke="#FF6B35" 
                                strokeWidth={3}
                                dot={{ r: 5, fill: '#FF6B35' }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>
                      </Box>
                    </Fade>
                  )}
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          <Grid item xs={12} lg={6} sx={{ display: 'flex' }}>
            <Zoom in timeout={900}>
              <Card elevation={12} sx={{
                borderRadius: 4,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                border: '3px solid #F7931E',
                minHeight: '520px',
                width: '100%',
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 12px 40px rgba(247, 147, 30, 0.2)'
                  : '0 12px 40px rgba(247, 147, 30, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 18px 50px rgba(247, 147, 30, 0.25)'
                    : '0 18px 50px rgba(247, 147, 30, 0.2)',
                },
              }}>
                <CardContent sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: 4
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
                    <Avatar sx={{ bgcolor: '#F7931E', width: 40, height: 40 }}>
                      <BuildCircleIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600} color="#F7931E">
                      Maintenance Status Analysis
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button 
                      variant="contained" 
                      onClick={callMaintenance} 
                      disabled={loadingMaint || !behavior}
                      sx={{ 
                        py: 1.2,
                        px: 4,
                        fontWeight: 600,
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #F7931E, #FF6B35)',
                        boxShadow: '0 4px 15px rgba(247, 147, 30, 0.3)',
                        '&:hover': { 
                          background: 'linear-gradient(45deg, #FB9D2B, #FF8A50)',
                          boxShadow: '0 6px 20px rgba(247, 147, 30, 0.4)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      {loadingMaint ? "Analyzing..." : !behavior ? "Analyze Behavior First" : "Check Maintenance"}
                    </Button>
                  </Box>

                  {maintenance && (
                    <Fade in>
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                          <Chip
                            label={maintenance.status}
                            color={getStatusColor(maintenance.status)}
                            icon={getStatusIcon(maintenance.status)}
                            sx={{ 
                              mb: 2, 
                              py: 2, 
                              px: 3, 
                              fontWeight: 600,
                              height: 'auto'
                            }}
                          />
                          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Overall Health: {maintenance.overall_health}%
                          </Typography>
                        </Box>

                        <Grid container spacing={3} sx={{ mb: 2 }}>
                          <Grid item xs={6}>
                            <List sx={{ '& .MuiListItem-root': { py: 1.5, px: 0 } }}>
                              <ListItem sx={{ 
                                border: '1px solid #FF6B35', 
                                borderRadius: 2, 
                                mb: 1.5,
                                background: 'rgba(255, 107, 53, 0.05)'
                              }}>
                                <ListItemIcon>
                                  <BatteryChargingFullIcon sx={{ color: '#FF6B35', fontSize: 24 }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={maintenance.battery}
                                  primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                />
                              </ListItem>
                              <ListItem sx={{ 
                                border: '1px solid #F7931E', 
                                borderRadius: 2, 
                                mb: 1.5,
                                background: 'rgba(247, 147, 30, 0.05)'
                              }}>
                                <ListItemIcon>
                                  <EngineeringIcon sx={{ color: '#F7931E', fontSize: 24 }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={maintenance.brakes}
                                  primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                />
                              </ListItem>
                              <ListItem sx={{ 
                                border: '1px solid #4CAF50', 
                                borderRadius: 2,
                                background: 'rgba(76, 175, 80, 0.05)'
                              }}>
                                <ListItemIcon>
                                  <DirectionsCarIcon sx={{ color: '#4CAF50', fontSize: 24 }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={maintenance.engine}
                                  primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                />
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ height: 200 }}>
                              <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center', fontWeight: 600 }}>
                                Health Distribution
                              </Typography>
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={generateMaintenancePieData(maintenance.health_breakdown)}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomLabel}
                                    outerRadius={60}
                                    fill="#8884d8"
                                    dataKey="value"
                                  >
                                    {generateMaintenancePieData(maintenance.health_breakdown).map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Legend 
                                    wrapperStyle={{ fontSize: '11px' }}
                                    iconSize={8}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Fade>
                  )}

                  {!maintenance && behavior && (
                    <Typography 
                      color="text.secondary" 
                      sx={{ 
                        textAlign: 'center', 
                        mt: 3,
                        fontSize: '1rem'
                      }}
                    >
                      Click above to check maintenance status based on driving behavior
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        <Card sx={{ 
          p: 4, 
          background: 'rgba(255, 107, 53, 0.08)', 
          border: '2px solid rgba(255, 107, 53, 0.3)',
          borderRadius: 4,
          maxWidth: '1500px',
          width: '100%'
        }}>
          <Typography variant="h6" fontWeight={600} color="#FF6B35" sx={{ mb: 4, textAlign: 'center' }}>
            🔗 How AI Correlates Behavior & Maintenance
          </Typography>
          <Grid container spacing={6} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3, 
                border: '1px solid #4CAF50', 
                borderRadius: 3, 
                background: 'rgba(76, 175, 80, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: '#4CAF50' }}>
                  Excellent Drivers (85%+)
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Safe Driver → Excellent Maintenance
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Regular service, careful handling
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Health: 90-97%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3, 
                border: '1px solid #FF9800', 
                borderRadius: 3, 
                background: 'rgba(255, 152, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: '#FF9800' }}>
                  Moderate Drivers (70-84%)
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Safe Driver → Good Maintenance
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Regular care with minor issues
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Health: 75-89%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3, 
                border: '1px solid #f44336', 
                borderRadius: 3, 
                background: 'rgba(244, 67, 54, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: '#f44336' }}>
                  Risky Drivers (Below 70%)
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Aggressive Driver → Poor Maintenance
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Neglected service, system stress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Health: 35-74%
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}