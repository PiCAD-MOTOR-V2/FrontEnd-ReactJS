// src/components/StatisticsGrid.js
import React from 'react';
import { Grid } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import CarIcon from '../../assets/images/icons/carIcon.svg';
import MotorIcon from '../../assets/images/icons/motorIcon.svg';
import ProcessIcon from '../../assets/images/icons/processIcon.svg';
import IncompleteIcon from '../../assets/images/icons/incompleteIcon.svg';

const data = [
  { title: 'Vehicles Created', value: '1,250', Icon: CarIcon },
  { title: 'Motors Created', value: '3,000', Icon: MotorIcon },
  { title: 'Simulations', value: '8,000', Icon: ProcessIcon },
  { title: 'Incomplete Simulations', value: '1,250', Icon: IncompleteIcon },
];

const StatisticsGrid = () => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatisticsCard title={item.title} value={item.value} Icon={item.Icon} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsGrid;
