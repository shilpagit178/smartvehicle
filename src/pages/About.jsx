import { Container, Typography, Card, CardContent, Box, Stack, useTheme } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CodeIcon from '@mui/icons-material/Code';

export default function About() {
  const theme = useTheme();
  return (
    <Box
      sx={{
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
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(124,77,255,0.08) 100%)',
      }} />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h3" fontWeight={900} align="center" gutterBottom sx={{ color: theme.palette.primary.main, mb: 4, letterSpacing: 1 }}>
          About Project
        </Typography>
        <Stack spacing={4}>
          <Card elevation={8} sx={{
            borderRadius: 5,
            p: 3,
            border: `2px solid ${theme.palette.primary.light}`,
            boxShadow: '0 8px 32px 0 rgba(124,77,255,0.10)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: '0 16px 48px 0 rgba(124,77,255,0.18)',
            },
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <DirectionsCarIcon sx={{ fontSize: 36, color: theme.palette.primary.main }} />
                <Typography variant="h5" fontWeight={800} sx={{ color: theme.palette.primary.main, letterSpacing: 0.5 }}>Problem Statement</Typography>
              </Box>
              <Typography gutterBottom sx={{ fontSize: 17, color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#232526' }}>
                Build a smart vehicle dashboard web application that provides real-time insights into driver behavior and vehicle maintenance using machine learning. The goal is to help users monitor driving patterns, predict maintenance needs, and visualize key metrics in a modern, user-friendly interface.
              </Typography>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2, color: theme.palette.primary.main }}>Problem Statement ID:</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>25136</Typography>
            </CardContent>
          </Card>
          <Card elevation={8} sx={{
            borderRadius: 5,
            p: 3,
            border: `2px solid #7C4DFF`,
            boxShadow: '0 8px 32px 0 rgba(124,77,255,0.10)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: '0 16px 48px 0 rgba(124,77,255,0.18)',
            },
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <CodeIcon sx={{ fontSize: 32, color: '#7C4DFF' }} />
                <Typography variant="h5" fontWeight={800} sx={{ color: '#7C4DFF', letterSpacing: 0.5 }}>Tech Stack</Typography>
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, color: '#FFD600' }}><EmojiObjectsIcon sx={{ fontSize: 20, color: '#FFD600', mr: 1, verticalAlign: 'middle' }} />Frontend</Typography>
                  <ul style={{ margin: 0, paddingLeft: 18, textAlign: 'left', fontSize: 15, color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#232526' }}>
                    <li>React (Vite) - SPA framework</li>
                    <li>Material-UI (MUI) - UI components, theming, icons</li>
                    <li>Recharts - Data visualization</li>
                    <li>Axios - API calls</li>
                    <li>React Router - Navigation</li>
                    <li>Custom Theming - Light/dark mode, gradients</li>
                  </ul>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, color: '#00BFAE' }}><EngineeringIcon sx={{ fontSize: 20, color: '#00BFAE', mr: 1, verticalAlign: 'middle' }} />Backend</Typography>
                  <ul style={{ margin: 0, paddingLeft: 18, textAlign: 'left', fontSize: 15, color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#232526' }}>
                    <li>Flask (Python) - REST API server</li>
                    <li>Flask-CORS - CORS support</li>
                    <li>Endpoints:</li>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      <li>/predict_trip_behavior (POST): Predicts driver behavior</li>
                      <li>/predict_maintenance_status (POST): Predicts maintenance needs</li>
                    </ul>
                  </ul>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, color: theme.palette.primary.main }}><DirectionsCarIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mr: 1, verticalAlign: 'middle' }} />AI/ML Model</Typography>
                  <ul style={{ margin: 0, paddingLeft: 18, textAlign: 'left', fontSize: 15, color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#232526' }}>
                    <li>scikit-learn - Model training and inference</li>
                    <li>Driver behavior classifier</li>
                    <li>Maintenance status predictor</li>
                    <li>Features:</li>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      <li>Harsh brake/accel count</li>
                      <li>Sharp turns</li>
                      <li>Overspeeding seconds</li>
                      <li>Battery voltage</li>
                      <li>Brake pad thickness</li>
                      <li>Engine temp</li>
                    </ul>
                  </ul>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}


