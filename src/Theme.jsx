import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' }, // MUI blue
    secondary: { main: '#ff9800' }, // orange
    background: { default: '#f0f2f5', paper: '#fff' },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#ffb74d' },
    background: { default: '#121212', paper: '#1d1d1d' },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});
