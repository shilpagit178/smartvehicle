import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { CustomThemeProvider } from './ThemeContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </BrowserRouter>
);
