import React from 'react';
import Dashboard from './Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
