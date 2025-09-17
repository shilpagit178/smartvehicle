import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#536DFE",
    },
    background: {
      default: "#f5f7ff",
      paper: "#ffffff",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8b9cff",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});
