import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../ThemeContext';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ user, onLogout }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Logs', to: '/logs' },
    { label: 'About', to: '/about' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(120deg, #232526 0%, #353a40 100%)'
            : 'linear-gradient(120deg, #f6f8fc 0%, #e9eef6 100%)',
          color: theme.palette.mode === 'dark' ? '#fff' : '#232526',
          borderBottom: 'none',
          boxShadow: 'none',
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
                color: theme.palette.mode === 'dark' ? '#fff' : '#232526',
                fontFamily: 'Inter, Roboto, Arial',
                userSelect: 'none',
                fontSize: { xs: 20, sm: 22 },
              }}
            >
              Smart Vehicles
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 2, justifyContent: 'flex-start', ml: { xs: 4, sm: 12 } }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                color="inherit"
                disableElevation
                sx={{
                  px: 1.5,
                  py: 0.5,
                  fontWeight: 500,
                  fontSize: 15,
                  borderRadius: 0,
                  minWidth: 0,
                  background: 'none',
                  color: location.pathname === link.to
                    ? theme.palette.primary.main
                    : (theme.palette.mode === 'dark' ? '#fff' : '#232526'),
                  borderBottom: location.pathname === link.to
                    ? `2px solid ${theme.palette.primary.main}`
                    : '2px solid transparent',
                  boxShadow: 'none',
                  transition: 'color 0.2s, border-bottom 0.2s',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    background: 'none',
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', right: 32 }}>
              <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {!user ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 500, borderRadius: 2, textTransform: 'none' }}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    color="primary"
                    variant="contained"
                    sx={{ fontWeight: 500, borderRadius: 2, textTransform: 'none', boxShadow: 0 }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Typography sx={{ fontWeight: 500, fontSize: 15, mx: 1 }}>
                    {user.email}
                  </Typography>
                  <Button
                    onClick={onLogout}
                    color="inherit"
                    variant="text"
                    sx={{ fontWeight: 500, borderRadius: 2, textTransform: 'none' }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

