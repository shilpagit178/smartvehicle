import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './Dashboard';
import Logs from './pages/Logs';
import About from './pages/About';

function App() {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
