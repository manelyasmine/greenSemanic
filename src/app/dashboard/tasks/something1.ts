import React, { useEffect, useRef, useState } from 'react';

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
import { CalanderIcon, FilterIcon } from '@/icons';
import { Button } from '../Button';
import { CustomersFilters } from './customers-filters';
import FilterData from './FilterData';
import Filters from './Filters';
import dayjs from 'dayjs';
import DatePickerTwoDate from "../Date/DatePickerTwoDate"
import DatePickerYear from "../Date/DatePickerYear";

interface DataItem {
  id: number;
  name: string;
  age: number;
  city: string;
}

type Operator = 'equals' | 'greaterThan' | 'lessThan'; // Add more operators as needed

interface Column {
  field: string;
  headerName: string;
  width: number;
  filterable: boolean;
  type?: 'string' | 'number'; // Optional type for data type handling
}

const data: DataItem[] = [
  { id: 1, name: 'Alice', age: 30, city: 'New York' },
  { id: 2, name: 'Bob', age: 25, city: 'Los Angeles' },
  // ... more data
];

const columns: Column[] = [
  { field: 'Tasks', headerName: 'Tasks', width: 150, filterable: true, type: 'string' },
  { field: 'Due Date', headerName: 'Due Date', width: 110, filterable: true, type: 'Date' },
  { field: 'Assigned Users', headerName: 'Assigned Users', width: 160, filterable: true, type: 'string' },

  { field: 'Target Name', headerName: 'Target Name', width: 150, filterable: true, type: 'string' },
];
const FilterBox = ({ children, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box
      ref={ref}
      sx={{ border: '1px solid green', borderRadius: '8px', backgroundColor: 'white', padding: '8px' }}
    >
      {children}
    </Box>
  );
};

interface FilterColumnsProps {
  onFilterByDate: (date: any) => void;
  onFilterBySearch:(search:any)=>void;
  isYear:boolean;
  isDate:boolean;
  
}

const FilterColumns = ({ onFilterByDate,onFilterBySearch,isYear , isDate }: FilterColumnsProps) => {

  const calendarRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);/* 
  const [selectedDate, setSelectedDate] = useState<any>(null); */
  const [selectedDate, setSelectedDate] = useState<Date[] | null>([]); // For date range

  const [search, setSearch] = useState('');

  const toggleCalendar = () => { setIsCalendarOpen(!isCalendarOpen); };
  const [formattedSelectedDate, setFormattedSelectedDate] = useState(''); // Display string for selected date
 


  const handleDateChange = (date) => {
    console.log("handleDateChange", date);
    setSelectedDate(date);
    onFilterByDate(date); // Pass the year range to the parent component
    setIsCalendarOpen(false);

    const formattedDate = date.length === 1
      ? date[0] ? dayjs(date[0]).format('YYYY') : '' // Format single year
      : date.map((d) => (d ? dayjs(d).format('YYYY') : '')) // Format year range
        .join(' - '); // Combine formatted dates for range selection
    setFormattedSelectedDate(formattedDate);
  };
 const handleSearchChange = (event) => { 
    onFilterBySearch(event.target.value)
    setSearch(event.target.value);
  }; 

 /*  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(columns[0].field);
  const [operator, setOperator] = useState<Operator>('equals');
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedColumn(event.target.value);
  const handleOperatorChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setOperator(event.target.value as Operator);
  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => setFilterValue(event.target.value);

  const applyFilter = () => {
    setFilteredData(filterData(data.slice(), selectedColumn, operator, filterValue));
    setIsFilterDropdownOpen(false); // Close dropdown after applying filter
  };
  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setIsCalendarOpen(false);
    }
  };
  useEffect(() => {
    // Add event listener for outside clicks when calendar is open
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isCalendarOpen]);

  const toggleFilterDropdown = () => setIsFilterDropdownOpen(!isFilterDropdownOpen);

  const toggleCalendar = () => {
    console.log('toggle calendar');
    setIsCalendarOpen(!isCalendarOpen);
    setSelectedDate(date);
    onFilterByDate(date);
  };
  const closeFilterDropdown = () => {
    setIsFilterDropdownOpen(false);
  }; */

  


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
      <Box ref={calendarRef} sx={{  display: 'flex',
          padding: 'var(--12, 12px) 16px',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          zIndex:20,
          gap: '8px',}}>
        <Button
          btnType="secondaryGray"
          sx={{ ...MuiButton.styleOverrides.sizeSmall,  }}
          startIcon={<CalanderIcon />}
          id="filter-date"
          selected={selectedDate}
          onClick={toggleCalendar}
        >
             {formattedSelectedDate?.split(' - ')[1] || 'Select Date'}
        </Button>
        {isCalendarOpen && (
            <Box sx={filterCalander}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/*   <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  views={['year', 'month', 'day']} // Show all three views
                /> */}

                  {isDate && (
                    <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    views={['year', 'month', 'day']} // Show all three views
                  />
                  )}
                  <Box ref={calendarRef} sx={{ display: 'flex', padding: 'var(--12, 12px) 16px', 
                    justifyContent: 'space-between',flexDirection:"column",
                     alignItems: 'center', alignSelf: 'stretch', zIndex: 20, gap: '8px' }}>
        
                    {isYear && (
                      <>
                          <Button
                            btnType="secondaryGray"
                            sx={{ ...MuiButton.styleOverrides.sizeSmall }}
                            startIcon={<CalanderIcon />}
                            id="filter-date-start"
                            selected={selectedDate?.length >= 1}
                            onClick={() => handleDateChange([selectedDate?.[1]])} // Set end year to null for start selection
                          >
                            Start Year
                          </Button>
                          <Button
                            btnType="secondaryGray"
                            sx={{ ...MuiButton.styleOverrides.sizeSmall }}
                            startIcon={<CalanderIcon />}
                            id="filter-date-end"
                            selected={selectedDate?.length > 0}
                            onClick={() => handleDateChange([selectedDate?.[0]])} // Set start year to null for end selection
                          >
                            End Year
                          </Button>
                        </>
                  )}  
                  </Box>
              </LocalizationProvider>
            </Box>
          )}
          
        <Button
          btnType="secondaryGray"
          sx={{ p: MuiButton.styleOverrides['sizeSmall'], justifyContent: 'left' }}
          startIcon={<FilterIcon />}
          //onClick={toggleFilterDropdown}
        >
          Filters
        </Button>
      </Box>
    </Box>
  
{/*     {isFilterDropdownOpen && (
      <Box sx={{ position: 'absolute', top: '40px', right: '16px', zIndex: 1000 }}>
        <Box sx={{ border: '1px solid green', borderRadius: '8px', backgroundColor: 'white', padding: '8px' }}>
        <FilterBox onClose={closeFilterDropdown}>
          <Filters
            columns={columns}
            selectedColumn={selectedColumn}
            operator={operator}
            filterValue={filterValue}
            handleColumnChange={handleColumnChange}
            handleOperatorChange={handleOperatorChange}
            handleFilterValueChange={handleFilterValueChange}
            applyFilter={applyFilter}
            isOpen={isFilterDropdownOpen} // Pass the isOpen state
          />
          </FilterBox>
        </Box>
      </Box>
    )} */  }  
   </Box>   
  
  
  
  
  );
};

export default FilterColumns;