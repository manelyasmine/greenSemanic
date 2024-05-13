import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'; // Import necessary MUI components

type Operator = 'equals' | 'greaterThan' | 'lessThan'; // Add more operators as needed

interface Column {
  field: string;
  headerName: string;
  width: number;
  filterable: boolean;
  type?: 'string' | 'number'; // Optional type for data type handling
}

interface FilterDropdownProps {
  columns: Column[];
  selectedColumn: string;
  operator: Operator;
  filterValue: string;
  handleColumnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOperatorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilter: () => void;
  isOpen?: boolean; // Optional prop to control the dropdown visibility
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  columns,
  selectedColumn,
  operator,
  filterValue,
  handleColumnChange,
  handleOperatorChange,
  handleFilterValueChange,
  applyFilter,
  isOpen = false,
}) => {
  return (
    <Box sx={{ p: 4 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="column-label">Column</InputLabel>
        <Select labelId="column-label" id="column" value={selectedColumn} onChange={handleColumnChange}>
          {columns
            .filter((col) => col.filterable)
            .map((col) => (
              <MenuItem key={col.field} value={col.field}>
                {col.headerName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="operator-label">Operator</InputLabel>
        <Select labelId="operator-label" id="operator" value={operator} onChange={handleOperatorChange}>
          <MenuItem value="equals">Equals</MenuItem>
          <MenuItem value="greaterThan">Greater Than</MenuItem>
          <MenuItem value="lessThan">Less Than</MenuItem>
          {/* Add more operators as needed */}
        </Select>
      </FormControl>
      <TextField
        type={columns.find((col) => col.field === selectedColumn)?.type || 'text'}
        value={filterValue}
        onChange={handleFilterValueChange}
        sx={{ minWidth: 120 }} // Optional styling for TextField
      />
      <Button variant="contained" onClick={applyFilter}>
        Apply
      </Button>
    </Box>
  );
};

export default FilterDropdown;
