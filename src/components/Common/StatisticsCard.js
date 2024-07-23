// src/components/StatisticsCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatisticsCard = ({ title, value, Icon }) => {
  return (
    <Card sx={{ minWidth: 200, minHeight: 80, backgroundColor: '#0069BD21', borderRadius: 2, boxShadow: 0 }}>
      <CardContent sx={{ padding: '10px !important'}}>
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px', color: '#000000', fontFamily: 'Poppins', fontWeight: 500, lineHeight: '20px' }}>
          Total Number of {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="h4" color="textPrimary" sx={{ flexGrow: 1, fontSize: '20px', fontWeight: 600, fontFamily: 'Poppins', lineHeight: '40px', color: '#009400' }}>
            {value}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0094002E', marginRight: '5px' }}>
            <img alt='icons' src={Icon} />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
