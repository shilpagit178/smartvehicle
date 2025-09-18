import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: Accept any non-empty credentials
    if (email && password) {
      onSignup({ email });
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
  <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: 'none' }}>
        <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, fontWeight: 600 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
