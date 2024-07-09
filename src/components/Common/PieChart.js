// src/components/PieChart.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Active Users', 'Total Users'],
    datasets: [
      {
        label: '# of Users',
        data: [150, 560],
        backgroundColor: ['#4caf50', '#bbdefb'],
        borderColor: ['#4caf50', '#bbdefb'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h6">Users</Typography>
      <Pie data={data} />
    </Box>
  );
};

export default PieChart;
