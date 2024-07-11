// src/components/Admin/Home.jsx
import React from 'react';
import DateRangePickerComponent from '../Common/DateRangePicker';
import StatisticsGrid from '../Common/StatisticsGrid';
import ChartContainer from '../Common/ChartContainer';

const Home = () => {
  return (
    <div>
      <DateRangePickerComponent />
      <br />
      <StatisticsGrid />
      <ChartContainer />
    </div>
  );
};

export default Home;
