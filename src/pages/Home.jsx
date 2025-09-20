import { Container, Typography, Box, Button, Paper, Stack, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';

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
          ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
        py: 4,
        px: 2,
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
      
      <Paper elevation={12} sx={{
        maxWidth: 650,
        mx: 'auto',
        p: { xs: 3, sm: 6 },
        borderRadius: 5,
        textAlign: 'center',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(145deg, rgba(30, 30, 30, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)',
        position: 'relative',
        zIndex: 2,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 20px 40px rgba(255, 107, 53, 0.15)'
          : '0 20px 40px rgba(255, 107, 53, 0.1)',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 107, 53, 0.2)'}`,
      }}>
        <Stack spacing={4} alignItems="center">
          <DirectionsCarIcon 
            sx={{ 
              fontSize: 80, 
              color: '#FF6B35', 
              mb: 1,
              filter: 'drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3))'
            }} 
          />
          
          <Typography 
            variant="h2" 
            fontWeight={900} 
            sx={{ 
              letterSpacing: 1,
              fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.1rem' },
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, #fff 30%, #FF6B35 70%, #F7931E 90%)'
                : 'linear-gradient(45deg, #333 30%, #FF6B35 70%, #F7931E 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Smart Vehicle Monitoring
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              fontWeight: 500, 
              mb: 1,
              fontSize: { xs: '1.15rem', sm: '1.35rem' }
            }}
          >
            <EmojiObjectsIcon sx={{ fontSize: 34, color: '#F7931E', verticalAlign: 'middle', mr: 1 }} />
            AI-powered insights for safer, smarter roads.
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontWeight: 400, 
              mb: 2, 
              lineHeight: 1.7,
              fontSize: { xs: '1.05rem', sm: '1.15rem' }
            }}
          >
            Monitor driver behavior and predict vehicle health in real time.<br/>
            Experience the future of smart mobility with a comprehensive dashboard.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ width: '100%' }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/dashboard"
              startIcon={<DashboardIcon />}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontWeight: 600, 
                borderRadius: 3,
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                boxShadow: '0 6px 20px rgba(255, 107, 53, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Go to Dashboard
            </Button>
            
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/about"
              startIcon={<InfoIcon />}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontWeight: 600,
                borderWidth: 2,
                borderColor: '#FF6B35',
                color: '#FF6B35',
                borderRadius: 3,
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#F7931E',
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              About Project
            </Button>
          </Stack>
          
          <Stack direction="row" spacing={6} justifyContent="center" sx={{ mt: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(247, 147, 30, 0.2)' : 'rgba(247, 147, 30, 0.1)',
                  mb: 1
                }}
              >
                <EngineeringIcon sx={{ fontSize: 40, color: '#F7931E' }} />
              </Box>
              <Typography 
                variant="subtitle2" 
                color="text.secondary" 
                fontWeight={600}
                sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
              >
                Predictive Maintenance
              </Typography>
            </Box>
            
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 107, 53, 0.1)',
                  mb: 1
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: 40, color: '#FF6B35' }} />
              </Box>
              <Typography 
                variant="subtitle2" 
                color="text.secondary" 
                fontWeight={600}
                sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
              >
                Driver Behavior Analysis
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}