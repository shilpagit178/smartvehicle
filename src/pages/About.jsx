import React from 'react';
import { Typography, Box, Paper, Divider } from '@mui/material';

const About = () => (
  <Box sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        About the Project
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      
      <Typography variant="body1" paragraph>
        <strong>Problem Statement ID:</strong> 25136
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Title:</strong> Student Innovation — Creating intelligent devices to improve the commutation sector.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Organization:</strong> AICTE
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Department:</strong> AICTE, MIC-Student Innovation
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Category:</strong> Software
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Theme:</strong> Smart Vehicles
      </Typography>
      <Typography variant="body1" paragraph>
        This project focuses on driver behavioral monitoring and predictive maintenance to enhance safety and efficiency in vehicles.
      </Typography>
    </Paper>
  </Box>
);

export default About;

