
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './Dashboard';
import Logs from './pages/Logs';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/dashboard');
  };
  const handleSignup = (userData) => {
    setUser(userData);
    navigate('/dashboard');
  };
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      </Routes>
    </div>
  );
}

export default App;
