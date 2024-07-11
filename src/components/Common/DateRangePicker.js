import React from 'react';
// import { useState } from 'react';
import { Box, Typography } from '@mui/material';
// import { Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import styles from './DateRangePicker.module.css';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/DateRangePicker/styles/index.css';

const DateRangePickerComponent = () => {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  return (
<LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0069bd' }}>
        <Typography variant="h6" sx={{ fontSize: '14px', fontFamily: 'Poppins' }}>Timeframe:</Typography>
        <DateRangePicker size="xs" placeholder="Select Date Range" />


        {/* <DatePicker
          className={styles.dateRangePicker}
          sx={{ width: '100px', '& .MuiSvgIcon-root': { fontSize: '16px' } }}
          label="From"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          textField={(props) => <TextField {...props} size="small" />}
        />
        <DatePicker
          className={styles.dateRangePicker}
          sx={{ width: '100px', '& .MuiSvgIcon-root': { fontSize: '16px' } }}
          label="To"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          textField={(props) => <TextField {...props} size="small" />}
        />
        <Button
          className={styles.dateRangePickerButton}
          variant="contained"
          size="small"
          onClick={() => console.log({ startDate, endDate })}
        >
          Apply
        </Button>
        <Button
          className={styles.dateRangePickerButton}
          variant="outlined"
          size="small"
          onClick={() => { setStartDate(null); setEndDate(null); }}
        >
          Reset
        </Button> */}
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;