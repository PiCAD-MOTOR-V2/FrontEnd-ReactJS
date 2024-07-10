// src/components/Admin/Home.jsx
import React from 'react';
import DateRangePickerComponent from '../Common/DateRangePicker';
import StatisticsGrid from '../Common/StatisticsGrid';
import ChartContainer from '../Common/ChartContainer';
// import UsersRoleChart from '../Common/UserRoleBarChart';
// import CustomizedLinearProgress from '../Common/LinearProgress';
// import ApplicationTypeChart from '../Common/ApplicationTypeDonut';
// import { Container, Grid } from '@mui/material';
// import PieChart from '../Common/PieChart';
// import LineChart from '../Common/LineChart';

const Home = () => {
  return (
    <div>
      <DateRangePickerComponent />
      <br />
      <StatisticsGrid />
      {/* <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PieChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineChart />
          </Grid>
        </Grid>
    </Container> */}
    <ChartContainer />
    </div>
  );
};

export default Home;
