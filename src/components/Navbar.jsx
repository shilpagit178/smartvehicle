import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useTheme
} from '@mui/material';
import { 
  DirectionsCar, 
  AccountCircle, 
  Brightness4, 
  Brightness7,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Assignment as LogsIcon,
  Info as AboutIcon
} from '@mui/icons-material';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../ThemeContext';

export default function Navbar({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navButtonStyle = (path) => ({
    fontWeight: isActive(path) ? 'bold' : 'normal',
    borderBottom: isActive(path) ? '2px solid white' : '2px solid transparent',
    borderRadius: '8px 8px 0 0',
    px: 2,
    py: 1,
    mx: 0.5,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderBottom: '2px solid white',
      transform: 'translateY(-2px)'
    }
  });

  return (
    <AppBar 
      position="static"
      elevation={4}
      sx={{ 
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
          : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(255, 107, 53, 0.3)'
          : '0 4px 20px rgba(255, 107, 53, 0.2)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
        {/* Custom Logo - Replaces the old DirectionsCar icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2,
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.3s ease'
          }}
          onClick={() => navigate('/home')}
        >
          <Box
            component="img"
            src="/vahanai-logo.svg"
            alt="VahanAI Logo"
            sx={{
              width: 40,
              height: 40,
              mr: 2,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              '&:hover': {
                filter: 'drop-shadow(0 4px 8px rgba(255,255,255,0.3))',
                transform: 'rotate(10deg)'
              },
              transition: 'all 0.3s ease'
            }}
          />
        </Box>
        
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 800,
            color: 'white !important',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            userSelect: 'none',
            display: 'block'
          }}
          onClick={() => navigate('/home')}
        >
          VahanAI
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Home Button */}
          <Button 
            color="inherit" 
            startIcon={<HomeIcon />}
            onClick={() => navigate('/home')}
            sx={{
              ...navButtonStyle('/home'),
              color: 'white',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Home
          </Button>

          {/* Dashboard Button */}
          <Button 
            color="inherit" 
            startIcon={<DashboardIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{
              ...navButtonStyle('/dashboard'),
              color: 'white',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Dashboard
          </Button>

          {/* Logs Button */}
          <Button 
            color="inherit" 
            startIcon={<LogsIcon />}
            onClick={() => navigate('/logs')}
            sx={{
              ...navButtonStyle('/logs'),
              color: 'white',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Logs
          </Button>

          {/* About Button */}
          <Button 
            color="inherit" 
            startIcon={<AboutIcon />}
            onClick={() => navigate('/about')}
            sx={{
              ...navButtonStyle('/about'),
              color: 'white',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            About
          </Button>

          {/* Theme Toggle */}
          <IconButton 
            color="inherit" 
            onClick={colorMode.toggleColorMode}
            sx={{
              mx: 1,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* User Menu */}
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {user?.isDemo ? (
              <AccountCircle sx={{ fontSize: 32 }} />
            ) : (
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  color: 'white'
                }}
              >
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                bgcolor: theme.palette.background.paper,
                boxShadow: '0 8px 32px rgba(255, 107, 53, 0.15)',
                borderRadius: 2,
                minWidth: 180,
                mt: 1,
                border: '1px solid rgba(255, 107, 53, 0.1)'
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem disabled sx={{ opacity: 0.7 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="body2" fontWeight="bold" sx={{ color: '#FF6B35' }}>
                  {user?.isDemo ? 'Demo User' : user?.username}
                </Typography>
                {!user?.isDemo && user?.email && (
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                )}
              </Box>
            </MenuItem>
            
            {!user?.isDemo && (
              <MenuItem onClick={handleClose}>
                <Typography variant="body2">Profile Settings</Typography>
              </MenuItem>
            )}
            
            <MenuItem onClick={handleLogout}>
              <Typography variant="body2" sx={{ color: '#f44336' }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}