import { Container, Typography, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>About Project</Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Problem Statement ID: 25136</Typography>
          <Typography>Theme: Smart Vehicles — Build a system for driver behavior monitoring and predictive maintenance.</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Team</Typography>
          <Typography>- You: Frontend (React + UI/UX)</Typography>
          <Typography>- Teammate: AI Model Development (Flask + ML)</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}


