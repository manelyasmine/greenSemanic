
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import { outlinedInput, filterCalander } from '@/styles/theme/Filter';
import { CalanderIcon, FilterIcon } from '@/icons';
import { Button } from '../Button';
import dayjs from 'dayjs';

interface FilterColumnsProps {
  onFilterByDate: (date: any) => void;
  onFilterBySearch: (search: any) => void;
  isYear: boolean;
  isDate: boolean;
  isFullDate:boolean;
}

const FilterColumns = ({ onFilterByDate, onFilterBySearch, isYear, isDate,isFullDate }: FilterColumnsProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSelectingStartYear, setIsSelectingStartYear] = useState(false);
  const [isSelectingEndYear, setIsSelectingEndYear] = useState(false);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [formattedSelectedDate, setFormattedSelectedDate] = useState('');


  const [startFullDate, setStartFullDate] = useState<Date | null>(null);
  const [endFullDate, setEndFullDate] = useState<Date | null>(null);


  const handleStartYearChange = (date) => { 
    if (isYear) {     
    
    console.log("date===>",isYear,isFullDate,date.year())
    setStartYear(date.year());
    setIsSelectingStartYear(false);

  }
  if (isFullDate)  {
  console.log("date===>",isYear,isFullDate,dayjs(date).format('YYYY-MM-DD'))
  setStartFullDate(dayjs(date).format('YYYY-MM-DD')); 
     
   
  setIsSelectingStartYear(false);
}
  };

  const handleEndYearChange = (date) => {
    if (isYear) {    
    setEndYear(date.year());
    console.log("end year",date.year())
    setIsSelectingEndYear(false);
    }
    if(isFullDate){
      console.log("date===>",isYear,isFullDate,dayjs(date).format('YYYY-MM-DD'))
      setEndFullDate(dayjs(date).format('YYYY-MM-DD')); 

    }

  };

  const handleSearchChange = (event) => {
    onFilterBySearch(event.target.value);
    setSearch(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
        setIsSelectingStartYear(false);
        setIsSelectingEndYear(false);

        const dateRange = [startYear, endYear].filter(Boolean);
        if (isYear && startYear && endYear) {
          const dateRange = [startYear, endYear];
          onFilterByDate(dateRange);
          const formattedDate = `${(startYear)} - ${(endYear)}`;
          setFormattedSelectedDate(formattedDate);
        }
        if (isFullDate && startFullDate && endFullDate){
          const dateRange = [startFullDate, endFullDate];
          onFilterByDate(dateRange);
          const formattedDate = `${(startFullDate)} - ${(endFullDate)}`;
          setFormattedSelectedDate(formattedDate);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startYear, endYear, onFilterByDate,startFullDate,endFullDate]);

  return (
    <Box sx={{ backgroundColor: palette.common.white, position: 'relative', p: 2, padding: 'var(--12, 12px) 16px', gap: '12px 12px', borderRadius: '12px' }}>
      <Box sx={{ display: "flex", alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: "row" }}>
        <OutlinedInput
          defaultValue=""
          placeholder="Search for anything..."
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={outlinedInput}
        />
        <Box ref={calendarRef} sx={{
          display: 'flex',
          padding: 'var(--12, 12px) 16px',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          zIndex: 20,
          gap: '8px',
        }}>
          <Button
            btnType="secondaryGray"
            sx={{ ...MuiButton.styleOverrides.sizeSmall }}
            startIcon={<CalanderIcon />}
            id="filter-date"
            selected={startYear || endYear}
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            {formattedSelectedDate || 'Select Date'}
          </Button>
          {isCalendarOpen && (
            <Box sx={filterCalander}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {isDate && (
                  <DateCalendar
                    views={['year', 'month', 'day']}
                    onChange={() => {}}
                  />
                )}
                {isYear && (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Button
                      btnType="secondaryGray"
                      sx={{ ...MuiButton.styleOverrides.sizeSmall }}
                      startIcon={<CalanderIcon />}
                      id="filter-date-start"
                      onClick={() => {
                        setIsSelectingStartYear(true);
                        setIsSelectingEndYear(false);
                      }}
                    >
                     {startYear ? startYear : 'Start Year'}
                    </Button>
                    <Button
                      btnType="secondaryGray"
                      sx={{ ...MuiButton.styleOverrides.sizeSmall }}
                      startIcon={<CalanderIcon />}
                      id="filter-date-end"
                      onClick={() => {
                        setIsSelectingStartYear(false);
                        setIsSelectingEndYear(true);
                      }}
                    >
                       {endYear ? endYear : 'End Year'}
                    </Button>
                    {isSelectingStartYear && (
                      <DateCalendar
                        views={['year']}
                        onChange={handleStartYearChange}
                      />
                    )}
                    {isSelectingEndYear && (
                      <DateCalendar
                        views={['year']}
                        onChange={handleEndYearChange}
                      />
                    )}
                  </Box>
                )}



            {isFullDate && (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Button
                      btnType="secondaryGray"
                      sx={{ ...MuiButton.styleOverrides.sizeSmall }}
                      startIcon={<CalanderIcon />}
                      id="filter-date-start"
                      onClick={() => {
                        setIsSelectingStartYear(true);
                        setIsSelectingEndYear(false);
                      }}
                    >
                     {startFullDate ? dayjs(startFullDate).format('YYYY-MM-DD') : 'Start Date' }
                    </Button>
                    <Button
                      btnType="secondaryGray"
                      sx={{ ...MuiButton.styleOverrides.sizeSmall }}
                      startIcon={<CalanderIcon />}
                      id="filter-date-end"
                      onClick={() => {
                        setIsSelectingStartYear(false);
                        setIsSelectingEndYear(true);
                      }}
                    >
                       {endFullDate ? dayjs(endFullDate).format('YYYY-MM-DD') : 'End Date'}
                    </Button>
                    {isSelectingStartYear && (
                      <DateCalendar
                        views={['year', 'month', 'day']}
                        onChange={handleStartYearChange}
                      />
                    )}
                    {isSelectingEndYear && (
                      <DateCalendar
                        views={['year', 'month', 'day']}
                        onChange={handleEndYearChange}
                      />
                    )}
                  </Box>
                )}
              </LocalizationProvider>
            </Box>
          )}
          <Button
            btnType="secondaryGray"
            sx={{ p: MuiButton.styleOverrides['sizeSmall'], justifyContent: 'left' }}
            startIcon={<FilterIcon />}
          >
            Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterColumns;
