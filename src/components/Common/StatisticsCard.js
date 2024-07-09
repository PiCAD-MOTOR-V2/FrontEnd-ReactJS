// src/components/StatisticsCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatisticsCard = ({ title, value, Icon }) => {
  return (
    <Card sx={{ minWidth: 200, minHeight: 140, backgroundColor: '#007AD921', borderRadius: 2 }}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{ height: '52px', width: '206px', fontSize: '14px', color: '#000000', fontFamily: 'Poppins', fontWeight: 500, lineHeight: '20px' }}>
          Total Number of <br /> {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="h4" color="textPrimary" sx={{ flexGrow: 1, fontSize: '28px', fontWeight: 600, fontFamily: 'Poppins', lineHeight: '40px', color: '#009400' }}>
            {value}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '41px', height: '41px', borderRadius: '50%', backgroundColor: '#0094002E' }}>
            <img alt='icons' src={Icon} />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
