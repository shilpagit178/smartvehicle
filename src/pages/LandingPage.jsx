import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  useScrollTrigger,
  Zoom,
  Stack,
  Chip,
  useTheme,
  keyframes
} from '@mui/material';
import {
  DirectionsCar,
  Speed,
  Security,
  Analytics,
  Engineering,
  Nature,
  ArrowUpward,
  Login as LoginIcon,
  PersonAdd,
  Timeline,
  Brightness4,
  Brightness7,
  Dashboard,
  CloudSync
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ColorModeContext } from '../ThemeContext';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Scroll to top component
function ScrollTop({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // 8 cards for 4×2 layout (4 columns, 2 rows)
  const features = [
    {
      icon: <Speed sx={{ fontSize: 42, color: '#FF6B35' }} />,
      title: "Real-time Monitoring",
      description: "Monitor vehicle speed, location, and driver behavior instantly with live GPS tracking and performance analytics."
    },
    {
      icon: <Analytics sx={{ fontSize: 42, color: '#2196F3' }} />,
      title: "Predictive Analytics",
      description: "AI-powered predictions for maintenance schedules, fuel optimization, and breakdown prevention using machine learning."
    },
    {
      icon: <Security sx={{ fontSize: 42, color: '#4CAF50' }} />,
      title: "Enhanced Safety",
      description: "Advanced safety alerts for harsh braking, rapid acceleration, overspeeding, and collision detection systems."
    },
    {
      icon: <Engineering sx={{ fontSize: 42, color: '#FF9800' }} />,
      title: "Smart Maintenance",
      description: "Intelligent maintenance scheduling based on vehicle usage patterns, mileage, and diagnostic data analysis."
    },
    {
      icon: <Nature sx={{ fontSize: 42, color: '#00BCD4' }} />,
      title: "Eco-Friendly Insights",
      description: "Optimize fuel consumption, reduce emissions, and promote sustainable driving practices with eco-friendly routing."
    },
    {
      icon: <Timeline sx={{ fontSize: 42, color: '#9C27B0' }} />,
      title: "Performance Analytics",
      description: "Comprehensive vehicle performance tracking with detailed reports, trends, and historical data visualization."
    },
    {
      icon: <Dashboard sx={{ fontSize: 42, color: '#E91E63' }} />,
      title: "Interactive Dashboard",
      description: "Customizable dashboard with real-time widgets, charts, and intuitive controls for fleet management."
    },
    {
      icon: <CloudSync sx={{ fontSize: 42, color: '#607D8B' }} />,
      title: "Cloud Integration",
      description: "Secure cloud storage with automatic data backup, multi-device synchronization, and remote access capabilities."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      backgroundColor: theme.palette.background.default,
      // Smooth gradient background
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
    }}>
      {/* Navigation - Updated with custom logo */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          color: theme.palette.text.primary,
          boxShadow: 'none',
          border: 'none',
          borderBottom: 'none',
          '&::before': {
            display: 'none'
          },
          '&::after': {
            display: 'none'
          }
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          {/* Custom Logo - Replaces DirectionsCar */}
          <Box
            component="img"
            src="/vahanai-logo.svg"
            alt="VahanAI Logo"
            sx={{
              width: 38,
              height: 38,
              mr: 3,
              cursor: 'pointer',
              filter: 'drop-shadow(0 2px 4px rgba(255, 107, 53, 0.3))',
              animation: `${float} 3s ease-in-out infinite`,
              '&:hover': {
                filter: 'drop-shadow(0 4px 8px rgba(255, 107, 53, 0.5))',
                transform: 'rotate(10deg) scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/')}
          />
          
          <Typography 
            variant="h4" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              fontSize: '1.75rem',
              background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            VahanAI
          </Typography>
          
          <IconButton 
            onClick={colorMode?.toggleColorMode}
            sx={{ 
              mr: 3,
              fontSize: '1.4rem'
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 fontSize="medium" /> : <Brightness4 fontSize="medium" />}
          </IconButton>
          
          <Button 
            startIcon={<LoginIcon fontSize="medium" />}
            onClick={() => navigate('/login')}
            sx={{ 
              mr: 2,
              fontSize: '1.15rem',
              py: 1.4,
              px: 2.8,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                color: '#FF6B35'
              }
            }}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            startIcon={<PersonAdd fontSize="medium" />}
            onClick={() => navigate('/signup')}
            sx={{ 
              borderRadius: 3,
              px: 3.5,
              py: 1.4,
              fontSize: '1.15rem',
              background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
                boxShadow: '0 6px 25px rgba(255, 107, 53, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* ...existing code... */}
      {/* Hero Section - Slightly reduced text */}
      <Box
        sx={{
          pt: 16,
          pb: 12,
          px: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '3rem', md: '4.2rem' },
              fontWeight: 700,
              mb: 4,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, #fff 30%, #FF6B35 70%, #F7931E 90%)'
                : 'linear-gradient(45deg, #333 30%, #FF6B35 70%, #F7931E 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: `${fadeInUp} 1s ease-out`
            }}
          >
            VahanAI
            <br />
            Smart Vehicle Monitoring
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 6, 
              color: theme.palette.text.secondary,
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.5,
              fontWeight: 400,
              fontSize: { xs: '1.45rem', md: '1.55rem' },
              animation: `${fadeInUp} 1s ease-out 0.2s both`
            }}
          >
            Transform your driving experience with AI-powered vehicle monitoring, 
            predictive maintenance, and real-time behavior analysis.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={4} 
            justifyContent="center"
            sx={{ 
              mb: 8,
              animation: `${fadeInUp} 1s ease-out 0.4s both`
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                py: 2.8,
                px: 5.5,
                fontSize: '1.35rem',
                fontWeight: 600,
                borderRadius: 4,
                textTransform: 'none',
                background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 8px 25px rgba(255, 107, 53, 0.4)'
                  : '0 8px 25px rgba(255, 107, 53, 0.3)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 12px 35px rgba(255, 107, 53, 0.6)'
                    : '0 12px 35px rgba(255, 107, 53, 0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started Free
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                py: 2.8,
                px: 5.5,
                fontSize: '1.35rem',
                fontWeight: 600,
                borderRadius: 4,
                textTransform: 'none',
                borderWidth: 2,
                borderColor: '#FF6B35',
                color: '#FF6B35',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#FF8A50',
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(255, 107, 53, 0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              View Demo
            </Button>
          </Stack>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center" 
            flexWrap="wrap"
            sx={{ 
              gap: 3,
              animation: `${fadeInUp} 1s ease-out 0.6s both`
            }}
          >
            <Chip 
              icon={<Speed fontSize="medium" />} 
              label="Real-time Analytics" 
              variant="outlined"
              sx={{ 
                py: 1, 
                px: 2.5,
                borderRadius: 4,
                fontSize: '1.15rem',
                borderColor: '#FF6B35',
                color: '#FF6B35',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  boxShadow: '0 6px 20px rgba(255, 107, 53, 0.3)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }} 
            />
            <Chip 
              icon={<Security fontSize="medium" />} 
              label="Advanced Safety" 
              variant="outlined"
              sx={{ 
                py: 1, 
                px: 2.5,
                borderRadius: 4,
                fontSize: '1.15rem',
                borderColor: '#FF6B35',
                color: '#FF6B35',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  boxShadow: '0 6px 20px rgba(255, 107, 53, 0.3)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }} 
            />
            <Chip 
              icon={<Analytics fontSize="medium" />} 
              label="AI Predictions" 
              variant="outlined"
              sx={{ 
                py: 1, 
                px: 2.5,
                borderRadius: 4,
                fontSize: '1.15rem',
                borderColor: '#FF6B35',
                color: '#FF6B35',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  boxShadow: '0 6px 20px rgba(255, 107, 53, 0.3)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }} 
            />
          </Stack>
        </Container>
      </Box>

      {/* Features Section - Fixed size cards with smaller text */}
      <Box sx={{ 
        py: 12, 
        px: 3,
        backgroundColor: 'transparent'
      }}>
        <Container maxWidth="xl">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2.7rem', md: '3.3rem' },
                fontWeight: 600,
                mb: 3,
                color: theme.palette.text.primary,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, #fff 60%, #FF6B35 100%)'
                  : 'linear-gradient(45deg, #333 60%, #FF6B35 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: `${fadeInUp} 1s ease-out`
              }}
            >
              Why Choose VahanAI?
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                color: theme.palette.text.secondary,
                fontWeight: 400,
                lineHeight: 1.6,
                fontSize: '1.35rem',
                animation: `${fadeInUp} 1s ease-out 0.2s both`
              }}
            >
              Our comprehensive platform combines cutting-edge AI with intuitive design 
              to revolutionize how you monitor and maintain your vehicles.
            </Typography>
          </Box>

          {/* 4×2 Grid Layout - Fixed size cards */}
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {features.map((feature, index) => (
              <Grid 
                item 
                xs={12}    
                sm={6}     
                md={3}     
                key={index}
              >
                <Card 
                  elevation={theme.palette.mode === 'dark' ? 3 : 2}
                  sx={{
                    width: 280, // Fixed width
                    height: 300, // Fixed height - reduced from 350
                    mx: 'auto', // Center the card
                    borderRadius: 4,
                    transition: 'all 0.4s ease',
                    backgroundColor: theme.palette.background.paper,
                    border: '2px solid #FF6B35',
                    animation: `${fadeInUp} 1s ease-out ${0.1 * index}s both`,
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      borderColor: '#FF8A50',
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 20px 40px rgba(255, 107, 53, 0.5)'
                        : '0 20px 40px rgba(255, 107, 53, 0.3)',
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: 3, // Reduced padding
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box>
                      <Box sx={{ 
                        mb: 2,
                        animation: `${float} 3s ease-in-out infinite ${0.1 * index}s`
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        fontWeight={600} 
                        sx={{ 
                          mb: 2,
                          color: theme.palette.text.primary,
                          fontSize: '1.15rem' // Reduced from 1.3rem
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        lineHeight: 1.4,
                        fontSize: '0.9rem', // Reduced from 1.05rem
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section - Slightly reduced text */}
      <Box 
        sx={{ 
          py: 12, 
          px: 3,
          backgroundColor: 'transparent',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            fontWeight={600} 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.1rem' },
              color: theme.palette.text.primary,
              mb: 3,
              animation: `${fadeInUp} 1s ease-out`
            }}
          >
            Ready to Transform Your Fleet?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 6, 
              color: theme.palette.text.secondary,
              fontWeight: 400,
              fontSize: '1.35rem',
              animation: `${fadeInUp} 1s ease-out 0.2s both`
            }}
          >
            Join thousands of fleet managers who trust VahanAI for their monitoring needs.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{
              py: 3.2,
              px: 7.5,
              fontSize: '1.35rem',
              fontWeight: 600,
              borderRadius: 4,
              textTransform: 'none',
              background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 8px 25px rgba(255, 107, 53, 0.4)'
                : '0 8px 25px rgba(255, 107, 53, 0.3)',
              animation: `${fadeInUp} 1s ease-out 0.4s both`,
              '&:hover': {
                transform: 'translateY(-4px) scale(1.05)',
                background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 15px 45px rgba(255, 107, 53, 0.6)'
                  : '0 15px 45px rgba(255, 107, 53, 0.4)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Start Your Free Trial
          </Button>
        </Container>
      </Box>

      {/* Footer - Updated with custom logo */}
      <Box sx={{ 
        py: 6, 
        px: 3,
        backgroundColor: 'transparent',
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                component="img"
                src="/vahanai-logo.svg"
                alt="VahanAI Logo"
                sx={{
                  width: 38,
                  height: 38,
                  mr: 3,
                  filter: 'drop-shadow(0 2px 4px rgba(255, 107, 53, 0.3))',
                  animation: `${float} 3s ease-in-out infinite`,
                }}
              />
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ 
                  color: theme.palette.text.primary,
                  fontSize: '1.55rem',
                  background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                VahanAI © Team Maverick SIH25136
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Scroll to top */}
      <ScrollTop>
        <Fab 
          size="large" 
          aria-label="scroll back to top"
          sx={{
            background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
            color: 'white',
            boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
              boxShadow: '0 8px 25px rgba(255, 107, 53, 0.6)',
              transform: 'scale(1.15) rotate(10deg)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowUpward fontSize="large" />
        </Fab>
      </ScrollTop>
    </Box>
  );
}