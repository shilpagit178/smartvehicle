import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CustomThemeProvider } from './ThemeContext';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './Dashboard';
import Logs from './pages/Logs';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You can add token verification here
      setUser({ username: 'User', token });
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <CustomThemeProvider>
      <Router>
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/home" /> : <LandingPage />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/home" /> : <Signup onLogin={handleLogin} />} 
          />
          
          {/* Protected routes */}
          <Route 
            path="/home" 
            element={user ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/logs" 
            element={user ? <Logs /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/about" 
            element={user ? <About /> : <Navigate to="/login" />} 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;