import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  Paper,
  Stack,
  Avatar,
  Fade
} from '@mui/material';
import {
  DirectionsCar,
  History,
  Speed,
  Engineering,
  Warning,
  CheckCircle,
  Schedule
} from '@mui/icons-material';

export default function Logs() {
  const theme = useTheme();

  // Mock log data
  const logs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      type: 'Behavior Analysis',
      result: 'Safe Driving',
      confidence: 92,
      status: 'success',
      details: 'No harsh braking or acceleration detected'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:25:18',
      type: 'Maintenance Check',
      result: 'Battery Good',
      confidence: 88,
      status: 'success',
      details: 'Battery voltage: 12.5V - Normal range'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:20:45',
      type: 'Behavior Analysis',
      result: 'Risky Driving',
      confidence: 76,
      status: 'warning',
      details: 'Harsh braking detected (3 instances)'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:15:32',
      type: 'Maintenance Check',
      result: 'Brakes Service Soon',
      confidence: 65,
      status: 'warning',
      details: 'Brake pad thickness: 3.2mm - Below threshold'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:10:15',
      type: 'Behavior Analysis',
      result: 'Safe Driving',
      confidence: 95,
      status: 'success',
      details: 'Excellent driving performance'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return '#4CAF50';
      case 'warning':
        return '#F7931E';
      case 'error':
        return '#f44336';
      default:
        return '#FF6B35';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle fontSize="small" />;
      case 'warning':
        return <Warning fontSize="small" />;
      case 'error':
        return <Warning fontSize="small" />;
      default:
        return <Schedule fontSize="small" />;
    }
  };

  const getTypeIcon = (type) => {
    return type === 'Behavior Analysis' ? <Speed /> : <Engineering />;
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
        py: 4,
        px: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <Fade in timeout={600}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
              <Avatar sx={{ 
                bgcolor: '#FF6B35', 
                width: 56, 
                height: 56,
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)'
              }}>
                <History fontSize="large" />
              </Avatar>
              <Typography 
                variant="h3" 
                fontWeight={800} 
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(45deg, #fff 30%, #FF6B35 70%, #F7931E 90%)'
                    : 'linear-gradient(45deg, #333 30%, #FF6B35 70%, #F7931E 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Activity Logs
              </Typography>
            </Stack>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              Track all AI predictions and system activities
            </Typography>
          </Box>
        </Fade>

        {/* Logs Table */}
        <Fade in timeout={800}>
          <Card
            elevation={12}
            sx={{
              borderRadius: 4,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(145deg, rgba(30, 30, 30, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 107, 53, 0.2)'}`,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 20px 40px rgba(255, 107, 53, 0.15)'
                : '0 20px 40px rgba(255, 107, 53, 0.1)'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow 
                      sx={{ 
                        background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                        '& th': { 
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1rem',
                          py: 2
                        }
                      }}
                    >
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Result</TableCell>
                      <TableCell>Confidence</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs.map((log, index) => (
                      <TableRow
                        key={log.id}
                        sx={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 107, 53, 0.02)'
                              : 'rgba(255, 107, 53, 0.01)',
                          },
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 107, 53, 0.05)'
                              : 'rgba(255, 107, 53, 0.03)',
                          },
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar sx={{ 
                              bgcolor: log.type === 'Behavior Analysis' ? '#FF6B35' : '#F7931E',
                              width: 32,
                              height: 32
                            }}>
                              {getTypeIcon(log.type)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={500}>
                              {log.type}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {log.result}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${log.confidence}%`}
                            size="small"
                            sx={{
                              backgroundColor: log.confidence > 80 ? '#4CAF50' : log.confidence > 60 ? '#F7931E' : '#f44336',
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(log.status)}
                            label={log.status.toUpperCase()}
                            size="small"
                            sx={{
                              backgroundColor: getStatusColor(log.status),
                              color: 'white',
                              fontWeight: 500,
                              '& .MuiChip-icon': {
                                color: 'white'
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ 
                          maxWidth: 200, 
                          fontSize: '0.9rem',
                          color: theme.palette.text.secondary
                        }}>
                          {log.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Fade>

        {/* Summary Stats */}
        <Fade in timeout={1000}>
          <Box sx={{ mt: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Card
                elevation={6}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 3,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)',
                  border: '1px solid rgba(76, 175, 80, 0.2)'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: '#4CAF50', width: 40, height: 40 }}>
                    <CheckCircle />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#4CAF50' }}>
                      3
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Successful Checks
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Card
                elevation={6}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 3,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(247, 147, 30, 0.1) 0%, rgba(247, 147, 30, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(247, 147, 30, 0.05) 0%, rgba(247, 147, 30, 0.02) 100%)',
                  border: '1px solid rgba(247, 147, 30, 0.2)'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: '#F7931E', width: 40, height: 40 }}>
                    <Warning />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#F7931E' }}>
                      2
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Warnings
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Card
                elevation={6}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 3,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                  border: '1px solid rgba(255, 107, 53, 0.2)'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: '#FF6B35', width: 40, height: 40 }}>
                    <DirectionsCar />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#FF6B35' }}>
                      84%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Confidence
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}