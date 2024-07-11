import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';

const BorderLinearProgress = styled(LinearProgress)({
  height: '3px',
  width: '300px',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#c9c9c9',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#009400',
  },
});

function CustomizedLinearProgress({ value }) {
  return (
    <Tooltip title={`${value}%`} arrow>
      <Box>
        <BorderLinearProgress variant="determinate" value={value} />
      </Box>
    </Tooltip>
  );
}

export default function ProgressBarList() {
  const data = [
    { type: 'Student', value: 46 },
    { type: 'Professional', value: 17 },
    { type: 'Faculty', value: 19 },
    { type: 'Trainer', value: 17 },
    { type: 'Technician', value: 17 },
    { type: 'Manufacturer', value: 19 },
    { type: 'Others', value: 17 },
  ];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', fontFamily: 'Poppins', fontWeight: '500', color: '#0069BD', width: '30%' }}>Type</th>
          <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', fontFamily: 'Poppins', fontWeight: '500', color: '#0069BD' }}>Popularity</th>
          <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', fontFamily: 'Poppins', fontWeight: '500', color: '#0069BD' }}>Percentage</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'left', padding: '2px', fontSize: '12px', fontFamily: 'Poppins', fontWeight: '500', color: '#222222' }}>{item.type}</td>
            <td style={{ padding: '2px' }}>
              <CustomizedLinearProgress value={item.value} />
            </td>
            <td style={{ padding: '2px', textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                width: '50px',
                backgroundColor: '#0094001F',
                border: '0.5px solid #009400',
                borderRadius: '5px',
                padding: '5px',
                fontSize: '10px',
                fontFamily: 'Poppins',
              }}>{`${item.value}%`}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
