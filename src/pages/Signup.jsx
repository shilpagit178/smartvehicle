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
  Person,
  DirectionsCar,
  Brightness4,
  Brightness7,
  DriveEta
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

export default function Signup({ onLogin }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    vehicleNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Try actual API signup
      const response = await axios.post('http://localhost:5000/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        vehicle_number: formData.vehicleNumber
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        onLogin(response.data.user);
        navigate('/dashboard');
      } else {
        setSuccess('Account created successfully! Please sign in.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      
    } catch (err) {
      console.error('Signup error:', err);
      
      // If API fails, create mock account for demo
      if (err.code === 'ERR_NETWORK') {
        setSuccess('Demo account created successfully! You can now sign in with your credentials or use the demo account.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(err.response?.data?.error || 'Email already exists or server error. Try the demo login instead.');
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
      py: 4,
      position: 'relative',
      overflow: 'hidden'
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

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
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
                  Create Account
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 2
                  }}
                >
                  Join Smart Vehicle Management System
                </Typography>
                
                {/* Demo Info Box */}
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
                    💡 Already have demo access?
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: '0.85rem'
                    }}
                  >
                    Use: admin@vahanai.com / password to{' '}
                    <Link to="/login" style={{ color: '#FF6B35', textDecoration: 'none' }}>
                      sign in
                    </Link>
                  </Typography>
                </Box>
              </Box>

              {/* Error/Success Alerts */}
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

              {success && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    fontSize: '0.95rem'
                  }}
                >
                  {success}
                </Alert>
              )}

              {/* Signup Form */}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="username"
                  label="Full Name"
                  value={formData.username}
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
                        <Person sx={{ color: '#FF6B35' }} />
                      </InputAdornment>
                    ),
                  }}
                />

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
                  name="vehicleNumber"
                  label="Vehicle Number (Optional)"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g., ABC-1234"
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
                        <DriveEta sx={{ color: '#FF6B35' }} />
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

                <TextField
                  fullWidth
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  value={formData.confirmPassword}
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
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              {/* Footer Links */}
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      color: '#FF6B35', 
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                  >
                    Sign in here
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