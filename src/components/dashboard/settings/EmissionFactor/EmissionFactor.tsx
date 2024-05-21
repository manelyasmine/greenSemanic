"use client";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MuiButton } from '@/styles/theme/components/button';
import { TextField } from '@mui/material';
import { palette } from '@/styles/theme/colors';
import Stack from '@mui/material/Stack';
import {GreneIcon,CameraIcon} from '@/icons';
import Divider from '@mui/material/Divider'; 
import dayjs from 'dayjs';
import {
  
  Grid,Button
  
} from '@mui/material';
import {Input} from '../../../commun/Inputs/Input';
import { InputSelect } from '../../../commun/Inputs/InputSelect';
import {CompanyLogo} from '../../../commun/Inputs/CompanyLogo'; 
import {EmissionFactorTable} from "./EmissionFactorTable";

interface EmissionFactorProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const customers = [
   
  {
    id: 'USR-006',
    name: 'Natural gas - SCV',
    catgory: 'Energy',
    unit: 'kgCO2e/kWh SCV',
    source: 'Base Carbone - ADEME',
     year: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    name: 'Burning oil - domestic purpose',
    catgory: 'Energy',
    unit: 'kgCO2e/litre',
    source: 'Maps & travel',
     year: dayjs().subtract(2, 'hours').toDate(),
  },

  {
    id: 'USR-004',
    name: 'Burning oil - domestic purpose',
    catgory: 'Energy',
    unit: 'kgCO2e/litre',
    source: 'Conversion factors 2020, BEIS',
     year: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Refrigerants - R227ea',
    catgory: 'Fugitive Emissions',
    unit: 'kgCO2e/litre',
    source: 'Maps & travel',
     year: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Goods & Services',
    catgory: 'Goods & Services',
    unit: 'kgCO2e/litre',
    source: 'Maps & travel',
     year: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Natural gas - SCV',
    catgory: 'Goods & Services',
    unit: 'kgCO2e/litre',
    source: 'Maps & travel',
     year: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Customer[];


 

export   function EmissionFactor() { 
   
  const page = 0;
  const rowsPerPage = 5; 
  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}   >
     <Grid container alignItems="center" >
      
      <EmissionFactorTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
     </Grid>
    <Divider />
    </Stack>
   
   

 
      
   
  );
}
function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}