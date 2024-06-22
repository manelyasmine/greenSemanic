import React, { useEffect, useRef, useState } from 'react';
import {   FilterIcon } from '@/icons';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { MuiButton } from '@/styles/theme/components/button';
import {  Filter, outlinedInput } from '@/styles/theme/Filter';
import { Button } from '@/components/commun/Button'; 

interface FilterColumnsProps { 
  onFilterBySearch:(search:any)=>void;
  
}

const HeaderSearchFilter = ({ onFilterBySearch }: FilterColumnsProps) => {
 
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
 
 const [search, setSearch] = useState('');
 
  const toggleFilterDropdown = () => setIsFilterDropdownOpen(!isFilterDropdownOpen);

  

  const handleSearchChange = (event) => { 
    onFilterBySearch(event.target.value)
    setSearch(event.target.value);
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
        onChange={handleSearchChange}
      />
      <Box  >
      
        <Button
          btnType="secondaryGray"
          sx={{ p: MuiButton.styleOverrides['sizeSmall'], justifyContent: 'left' }}
          startIcon={<FilterIcon />}
          onClick={toggleFilterDropdown}
        >
          Filters
        </Button>
      </Box>

      
    </Card>
  );
};

export default HeaderSearchFilter;
