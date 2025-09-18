import { Container, Typography, Box, Button, Paper, Stack, useTheme, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import EngineeringIcon from '@mui/icons-material/Engineering';

export default function Home() {
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
      {/* Gradient overlay for depth */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(124,77,255,0.08) 100%)',
      }} />
      <Paper elevation={6} sx={{
        maxWidth: 650,
        mx: 'auto',
        p: { xs: 3, sm: 6 },
        borderRadius: 5,
        textAlign: 'center',
        background: 'rgba(255,255,255,0.92)',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 8px 32px 0 rgba(124,77,255,0.10)',
      }}>
        <Stack spacing={3} alignItems="center">

          <DirectionsCarIcon sx={{ fontSize: 70, color: theme.palette.primary.main, mb: 1 }} />
          <Typography variant="h2" fontWeight={900} sx={{ letterSpacing: 1, color: theme.palette.primary.main }}>
            Smart Vehicle Monitoring
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            <EmojiObjectsIcon sx={{ fontSize: 28, color: '#FFD600', verticalAlign: 'middle', mr: 1 }} />
            AI-powered insights for safer, smarter roads.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 400, mb: 2 }}>
            Monitor driver behavior and predict vehicle health in real time.<br/>
            Experience the future of smart mobility with a single dashboard.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" size="large" component={Link} to="/dashboard" sx={{ px: 4, fontWeight: 600, boxShadow: 2 }}>
              Go to Dashboard
            </Button>
            <Button variant="outlined" size="large" component={Link} to="/about" sx={{ px: 4, fontWeight: 600 }}>
              About Project
            </Button>
          </Stack>
          <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <EngineeringIcon sx={{ fontSize: 36, color: '#00BFAE' }} />
              <Typography variant="subtitle2" color="text.secondary">Predictive Maintenance</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <DirectionsCarIcon sx={{ fontSize: 36, color: theme.palette.primary.main }} />
              <Typography variant="subtitle2" color="text.secondary">Driver Behavior</Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

