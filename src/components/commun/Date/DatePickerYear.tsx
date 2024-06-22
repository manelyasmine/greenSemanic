import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';

export default function DatePickerYear({value,onChange} ) {
  
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DateRangePicker
        value={value}
        onChange={onChange}
        views={['year']}
        inputFormat="YYYY" 
        showYearPicker
       
      />  
    </LocalizationProvider>
  );
}
