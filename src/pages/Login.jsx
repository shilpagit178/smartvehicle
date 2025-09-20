import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
  Alert,
  Fade,
  keyframes
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  DirectionsCar,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { ColorModeContext } from '../themeContext';
import axios from 'axios';

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

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    try {
      // Check for demo credentials first
      if (formData.email === 'admin@vahanai.com' && formData.password === 'password') {
        // Demo login - create mock user data
        const demoUser = {
          username: 'Demo User',
          email: 'admin@vahanai.com',
          vehicleNumber: 'DEMO-2024',
          isDemo: true
        };
        
        // Store demo token
        localStorage.setItem('token', 'demo-token-12345');
        
        onLogin(demoUser);
        navigate('/dashboard');
        setLoading(false);
        return;
      }

      // Try actual API login for real users
      const response = await axios.post('http://localhost:5000/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        onLogin(response.data.user);
        navigate('/dashboard');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      
      // If API fails, still allow demo login
      if (formData.email === 'admin@vahanai.com' && formData.password === 'password') {
        const demoUser = {
          username: 'Demo User',
          email: 'admin@vahanai.com',
          vehicleNumber: 'DEMO-2024',
          isDemo: true
        };
        
        localStorage.setItem('token', 'demo-token-12345');
        onLogin(demoUser);
        navigate('/dashboard');
      } else {
        setError(err.response?.data?.error || 'Invalid email or password. Try demo: admin@vahanai.com / password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      {/* Theme Toggle */}
      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 107, 53, 0.1)',
          color: '#FF6B35',
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 53, 0.2)',
          }
        }}
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Card
            elevation={12}
            sx={{
              borderRadius: 4,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(145deg, rgba(30, 30, 30, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 107, 53, 0.2)'}`,
              animation: `${fadeInUp} 1s ease-out`,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 20px 40px rgba(255, 107, 53, 0.15)'
                : '0 20px 40px rgba(255, 107, 53, 0.1)'
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              {/* Header */}
              <Box textAlign="center" sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  mb: 2,
                  animation: `${float} 3s ease-in-out infinite`
                }}>
                  <DirectionsCar sx={{ 
                    fontSize: { xs: 40, sm: 48 },
                    color: '#FF6B35',
                    mr: 1
                  }} />
                </Box>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontSize: { xs: '1.8rem', sm: '2.2rem' },
                    fontWeight: 700,
                    mb: 1,
                    background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Welcome Back
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 2
                  }}
                >
                  Sign in to access VahanAI Dashboard
                </Typography>
                
                <Box sx={{
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 107, 53, 0.1)'
                    : 'rgba(255, 107, 53, 0.05)',
                  borderRadius: 2,
                  p: 2,
                  border: '1px solid rgba(255, 107, 53, 0.2)'
                }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#FF6B35',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      mb: 0.5
                    }}
                  >
                    🚀 Demo Access Available
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: '0.85rem'
                    }}
                  >
                    Email: admin@vahanai.com<br />
                    Password: password
                  </Typography>
                </Box>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    fontSize: '0.95rem'
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      '&:hover fieldset': {
                        borderColor: '#FF6B35',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B35',
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6B35',
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#FF6B35' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ 
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      '&:hover fieldset': {
                        borderColor: '#FF6B35',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B35',
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6B35',
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#FF6B35' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: { xs: 1.5, sm: 2 },
                    mb: 4,
                    borderRadius: 3,
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    fontWeight: 600,
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                    boxShadow: '0 6px 20px rgba(255, 107, 53, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8A50, #FB9D2B)',
                      boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                      opacity: 0.7
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Footer Links */}
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    style={{ 
                      color: '#FF6B35', 
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                  >
                    Sign up here
                  </Link>
                </Typography>
                
                <Link 
                  to="/" 
                  style={{ 
                    color: theme.palette.text.secondary, 
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  ← Back to Home
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}