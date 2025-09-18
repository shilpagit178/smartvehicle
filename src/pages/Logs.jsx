import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box, useTheme } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';

const logs = [
  { id: 1, time: "2025-09-12 10:00", event: "Driver marked as Safe" },
  { id: 2, time: "2025-09-12 10:05", event: "Low Battery Detected" },
  { id: 3, time: "2025-09-12 10:10", event: "Brakes require service" },
];

export default function Logs() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(120deg, #232526 0%, #353a40 100%)'
          : 'linear-gradient(120deg, #f6f8fc 0%, #e9eef6 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(124,77,255,0.08) 100%)',
      }} />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper elevation={8} sx={{
          borderRadius: 5,
          p: { xs: 2, sm: 4 },
          border: `2px solid ${theme.palette.primary.light}`,
          boxShadow: '0 8px 32px 0 rgba(124,77,255,0.10)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          willChange: 'transform',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow: '0 16px 48px 0 rgba(124,77,255,0.18)',
          },
        }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <ListAltIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Typography variant="h4" fontWeight={800} sx={{ color: theme.palette.primary.main, letterSpacing: 0.5 }}>Event Logs</Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell sx={{ fontWeight: 500, fontSize: 15 }}>{log.time}</TableCell>
                  <TableCell sx={{ fontWeight: 500, fontSize: 15 }}>{log.event}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
}

