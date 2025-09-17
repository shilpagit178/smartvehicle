import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const logs = [
  { id: 1, time: "2025-09-12 10:00", event: "Driver marked as Safe" },
  { id: 2, time: "2025-09-12 10:05", event: "Low Battery Detected" },
  { id: 3, time: "2025-09-12 10:10", event: "Brakes require service" },
];

export default function Logs() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Event Logs</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Event</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.time}</TableCell>
                <TableCell>{log.event}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

