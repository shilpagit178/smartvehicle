import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const logData = [
  { time: '2025-09-16 14:12', event: 'Driver Drowsy Detected' },
  { time: '2025-09-16 13:45', event: 'Brake Service Suggested' },
  { time: '2025-09-15 16:30', event: 'Battery Health Low' },
];

const Logs = () => (
  <Box sx={{ padding: 3, maxWidth: 700, margin: 'auto' }}>
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Event Logs
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      
      <List>
        {logData.map(({ time, event }, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={event}
                secondary={time}
              />
            </ListItem>
            {index < logData.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  </Box>
);

export default Logs;
