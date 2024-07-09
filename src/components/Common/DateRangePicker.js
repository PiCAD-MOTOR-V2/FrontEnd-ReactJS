import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateRangePickerComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, color: '#007ad9'}}>
        <Typography variant="h6" sx={{fontSize: '14px'}} >Timeframe</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <DatePicker sx={{ width: '200px' }}
            label="From"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <DatePicker sx={{ width: '200px' }}
            label="To"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small" onClick={() => { setStartDate(null); setEndDate(null); }}>Cancel</Button>
          <Button variant="contained" size="small" onClick={() => console.log({ startDate, endDate })}>Apply</Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;
