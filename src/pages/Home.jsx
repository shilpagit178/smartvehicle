import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Smart Vehicle Monitoring 🚗
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Monitor driver behavior & predict vehicle health with AI — real-time insights for safer roads.
      </Typography>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" size="large" component={Link} to="/dashboard">
          Go to Dashboard
        </Button>
        <Button variant="outlined" size="large" component={Link} to="/about">
          About Project
        </Button>
      </Box>
    </Container>
  );
}

