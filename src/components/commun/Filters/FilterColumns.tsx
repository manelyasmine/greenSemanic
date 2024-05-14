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

import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import { boxFilterDropDown, Filter, outlinedInput,filterCalander } from '@/styles/theme/Filter';

import { Button } from '../Button';
import { CustomersFilters } from './customers-filters';
import FilterData from './FilterData';
import FilterDropdown from './FilterDropdown';

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

const FilterColumns = () => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(columns[0].field);
  const [operator, setOperator] = useState<Operator>('equals');
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const calendarRef = useRef<HTMLDivElement>(null);

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
  };

  return (
    <Card sx={Filter}>
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
      <Box ref={calendarRef}>
        <Button
          btnType="secondaryGray"
          sx={{ p: MuiButton.styleOverrides['sizeSmall'], justifyContent: 'left' }}
          startIcon={<CalanderIcon />}
          onClick={toggleCalendar}
        >
          Select Date
        </Button>
        {isCalendarOpen && (
          <Box sx={filterCalander}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Box>
        )}
        <Button
          btnType="secondaryGray"
          sx={{ p: MuiButton.styleOverrides['sizeSmall'], justifyContent: 'left' }}
          startIcon={<FilterIcon />}
          onClick={toggleFilterDropdown}
        >
          Filters
        </Button>
      </Box>

      {isFilterDropdownOpen && (
        <Box sx={boxFilterDropDown}>
          <FilterDropdown
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
        </Box>
      )}
    </Card>
  );
};

export default FilterColumns;
