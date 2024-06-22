import React, { useEffect, useRef, useState } from 'react';
import { CalanderIcon, FilterIcon } from '@/icons';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import Stack from '@mui/material/Stack';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput,filterCalander } from '@/styles/theme/Filter';

import { Button } from '../Button';
import { CustomersFilters } from './customers-filters';
import FilterData from './FilterData';
import Filters from './Filters';

interface FilterColumnsProps {
  onFilterByDate: (date: any) => void;
}

const FilterColumns = ({ onFilterByDate }: FilterColumnsProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const toggleCalendar = () => { setIsCalendarOpen(!isCalendarOpen); };
  const handleDateChange = (date: any) => {
    console.log("handleDateChange", date);
    setSelectedDate(date);
    onFilterByDate(date);  // Pass the date to the prop function
    setIsCalendarOpen(false);
    console.log("onfilterbydate",date)
  };

  return (
    <Box sx={{ backgroundColor: palette.common.white, position: 'relative', p: 2, padding: 'var(--12, 12px) 16px', gap: '12px 12px', borderRadius: '12px' }}>
      <Box sx={{ display: "flex", alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: "row" }}>
        <OutlinedInput
          defaultValue=""
          placeholder="Search for anything..."
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={outlinedInput}
        />
        <Box ref={calendarRef} 
        
        sx={{ display: 'flex', padding: 'var(--12, 12px) 16px', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', gap: '8px', }}>
          <Button
            btnType="secondaryGray"
            sx={{ ...MuiButton.styleOverrides.sizeSmall, }}
            
            startIcon={<CalanderIcon />}
            id="filter-date"
            onClick={toggleCalendar}
          >
            Select Date
          </Button>
          {isCalendarOpen && (
            <Box sx={filterCalander}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  views={['year', 'month', 'day']} // Show all three views
                />
              </LocalizationProvider>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FilterColumns;
