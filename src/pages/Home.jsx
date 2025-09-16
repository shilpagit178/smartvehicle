import { Typography, Box } from '@mui/material';

const Home = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h3" gutterBottom>
      Welcome to Smart Vehicle Monitoring System
    </Typography>
    <Typography variant="body1">
      This project monitors driver behavior to improve safety and performs predictive maintenance to reduce vehicle downtime.
    </Typography>
  </Box>
);

export default Home;
