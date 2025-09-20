import React from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Stack, 
  useTheme,
  Chip,
  Grid,
  Paper,
  Divider
} from "@mui/material";
import {
  DirectionsCar,
  EmojiObjects,
  Engineering,
  Code,
  Science,
  Api,
  Psychology,
  Timeline,
  Security,
  Speed,
  Analytics
} from '@mui/icons-material';

export default function About() {
  const theme = useTheme();

  const TechCard = ({ title, icon, items, color }) => (
    <Card 
      elevation={8} 
      sx={{
        borderRadius: 4,
        p: 1.7,
        height: '100%',
        minHeight: 335,
        border: `2px solid ${color}`,
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.05) 100%)`
          : `linear-gradient(145deg, #ffffff 0%, rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.02) 100%)`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 16px 32px rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.2)`,
        },
      }}
    >
      <CardContent sx={{ p: 2.3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" alignItems="center" gap={1.6} mb={1.6}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: '50%',
              backgroundColor: color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 42,
              height: 42
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 23 } })}
          </Box>
          <Typography variant="h5" fontWeight={700} sx={{ color, fontSize: 18.5 }}>
            {title}
          </Typography>
        </Box>
        <Stack spacing={1.2} sx={{ flex: 1 }}>
          {items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
              <Box
                sx={{
                  width: 4.7,
                  height: 4.7,
                  borderRadius: '50%',
                  backgroundColor: color,
                  flexShrink: 0,
                  mt: 0.85
                }}
              />
              <Typography variant="body2" sx={{ fontSize: 13.2, lineHeight: 1.42, color: theme.palette.text.primary }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
        py: { xs: 3, sm: 4, md: 5 },
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
          : 'linear-gradient(120deg, rgba(255,255,white,0.15) 0%, rgba(255, 107, 53, 0.08) 100%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Card 
          elevation={10} 
          sx={{
            borderRadius: 5,
            mb: { xs: 4, sm: 5 },
            overflow: 'hidden',
            background: theme.palette.background.paper,
            border: `3px solid #FF6B35`,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 20px 40px rgba(255, 107, 53, 0.15)'
              : '0 20px 40px rgba(255, 107, 53, 0.1)',
          }}
        >
          <Box
            sx={{
              p: { xs: 2.5, sm: 3 },
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              color: 'white'
            }}
          >
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <EmojiObjects sx={{ fontSize: { xs: 32, sm: 40 } }} />
              <Box>
                <Typography 
                  variant="h4" 
                  fontWeight={800}
                  sx={{ 
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Problem Statement
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: { xs: '1rem', sm: '1.125rem' }
                  }}
                >
                  ID: 25136
                </Typography>
              </Box>
            </Box>
          </Box>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35', fontWeight: 600, fontSize: 18 }}>
              Objective:
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: 15, sm: 17 }, 
                lineHeight: 1.7, 
                mb: 3 
              }}
            >
              Build a comprehensive smart vehicle dashboard web application that provides real-time insights into driver behavior and vehicle maintenance using advanced machine learning algorithms.
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35', fontWeight: 600, fontSize: 18 }}>
              Key Goals:
            </Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 107, 53, 0.05)',
                  border: '1px solid rgba(255, 107, 53, 0.2)'
                }}>
                  <Timeline sx={{ color: '#FF6B35', mb: 1, fontSize: 24 }} />
                  <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: 15, color: '#FF6B35' }}>Monitor Driving Patterns</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                    Track and analyze real-time driving behavior metrics
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(247, 147, 30, 0.1)' : 'rgba(247, 147, 30, 0.05)',
                  border: '1px solid rgba(247, 147, 30, 0.2)'
                }}>
                  <Engineering sx={{ color: '#F7931E', mb: 1, fontSize: 24 }} />
                  <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: 15, color: '#F7931E' }}>Predict Maintenance</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                    AI-powered predictive maintenance scheduling
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
                  border: '1px solid rgba(76, 175, 80, 0.2)'
                }}>
                  <Analytics sx={{ color: '#4CAF50', mb: 1, fontSize: 24 }} />
                  <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: 15, color: '#4CAF50' }}>Visualize Metrics</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                    Modern, interactive dashboard with key insights
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Typography 
          variant="h3" 
          fontWeight={800} 
          align="center" 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            mb: 4,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #fff 30%, #FF6B35 70%, #F7931E 90%)'
              : 'linear-gradient(45deg, #333 30%, #FF6B35 70%, #F7931E 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <Code sx={{ fontSize: { xs: 28, sm: 36 }, color: '#FF6B35' }} />
          Technology Stack
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ pb: 4 }}>
          <Grid item xs={12} md={4}>
            <TechCard
              title="Frontend"
              icon={<Code />}
              color="#FF6B35"
              items={[
                "React 18 with Vite - Modern SPA framework",
                "Material-UI (MUI) v5 - Complete UI system",
                "Recharts - Interactive data visualization",
                "Axios - HTTP client for API calls",
                "React Router v6 - Client-side routing",
                "Custom theming - Light/dark mode support",
                "Responsive design - Mobile-first approach",
                "CSS-in-JS styling with emotion"
              ]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TechCard
              title="Backend & API"
              icon={<Api />}
              color="#F7931E"
              items={[
                "Flask (Python) - Lightweight web framework",
                "Flask-CORS - Cross-origin resource sharing",
                "RESTful API architecture",
                "JSON data serialization",
                "Error handling & validation",
                "Endpoint: /predict_trip_behavior (POST)",
                "Endpoint: /predict_maintenance_status (POST)",
                "Hot-reload development server"
              ]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TechCard
              title="AI/ML Engine"
              icon={<Science />}
              color="#4CAF50"
              items={[
                "scikit-learn - ML model training & inference",
                "Driver behavior classification model",
                "Predictive maintenance algorithms",
                "Feature engineering & selection",
                "Real-time prediction pipeline",
                "Model performance optimization",
                "Data preprocessing & normalization",
                "Cross-validation & testing"
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}