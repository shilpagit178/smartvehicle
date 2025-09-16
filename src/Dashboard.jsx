import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

const sampleDrowsinessData = [
  { time: '14:00', confidence: 0.2 },
  { time: '14:05', confidence: 0.35 },
  { time: '14:10', confidence: 0.6 },
  { time: '14:12', confidence: 0.87 },
  { time: '14:15', confidence: 0.3 },
];

const maintenancePieData = [
  { name: 'Healthy', value: 1 },
  { name: 'Service Soon', value: 1 },
  { name: 'Low Battery', value: 1 },
];

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // In real project, fetch AI model data here
    fetch('/data.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data)
    return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;

  // Map maintenance values to categories for pie chart
  // Simplified example: count how many are Healthy, Service Soon, Low Battery
  const maintenanceStatusCount = {
    Healthy: 0,
    'Service Soon': 0,
    'Low Battery': 0,
  };

  Object.values(data.maintenance).forEach((status) => {
    if (status.toLowerCase().includes('healthy')) maintenanceStatusCount.Healthy++;
    else if (status.toLowerCase().includes('service')) maintenanceStatusCount['Service Soon']++;
    else if (status.toLowerCase().includes('low')) maintenanceStatusCount['Low Battery']++;
  });

  const pieData = Object.entries(maintenanceStatusCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Driver Behavioral Monitoring
      </Typography>
      <Card sx={{ mb: 4, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Status: <strong>{data.driver_status.toUpperCase()}</strong>
          </Typography>
          <Typography gutterBottom>
            Confidence: {(data.confidence * 100).toFixed(1)}%
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Driver Drowsiness Over Time
          </Typography>

          <LineChart
            width={600}
            height={250}
            data={sampleDrowsinessData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
            <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </CardContent>
      </Card>

      <Typography variant="h4" gutterBottom>
        Predictive Maintenance
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(data.maintenance).map(([key, value]) => (
          <Grid item xs={12} sm={4} key={key}>
            <Card sx={{ backgroundColor: '#e0f7fa' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ textTransform: 'capitalize' }}
                  gutterBottom
                >
                  {key.replace('_', ' ')}
                </Typography>
                <Typography>{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#f9fbe7' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Maintenance Status Distribution
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
