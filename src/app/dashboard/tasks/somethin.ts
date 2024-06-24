import React,{useState,us    <Box ref={calendarRef} sx={{
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
                
              </LocalizationProvider>
            </Box>
          )}eRef} from 'react';
import { CalanderIcon } from '@/icons';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';

import { CalculateEmission, CalculateScopes, extractScops, getCarbonEmissionByCategory } from '@/lib/helper';
import { Button } from '@/components/commun/Button';
import CustomTabs from '@/components/commun/Tabs/tabs';
import { MuiButton } from '@/styles/theme/components/button';

import { CarbonEmissionsCategory } from '../../overview/CarbonEmissionsCategory';
import { CarbonEmissionsScope } from '../../overview/CarbonEmissionsScope';
import { CarbonPerMonth } from '../../overview/CarbonPerMonth';
import { CardBoard } from '../../overview/CardBoard';
import { MonthlyCarbonEmissions } from '../../overview/MonthlyCarbonEmissions';
import { Reduction } from '../../overview/Reduction';
import Scopes from '../../overview/Scopes';
import { TotalEmissions } from '../../overview/TotalEmissions';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { palette } from '@/styles/theme/colors'; 
import { outlinedInput, filterCalander } from '@/styles/theme/Filter';
 import dayjs from 'dayjs';



export default function ExportStepFour() {
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
    
  setStartFullDate(dayjs(date).format('YYYY-MM-DD')); 
     
   
  setIsSelectingStartYear(false);
 
  };

  const handleEndYearChange = (date) => {
     
      setEndFullDate(dayjs(date).format('YYYY-MM-DD')); 

    

  };


  const handleTabChange = () => {};
  return (
    <Grid
      container
      xs={12}
      sx={{
        display: 'flex',
        flex: '1 0 0',
        padding: '24px 0px',
        //flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center',
        width: '100%',
      }}
    >
      {/* <Box> */}
      <Grid container xs={8} spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h3" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
            Preview
          </Typography>
          <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)">
            you can see a preview of uploaded file to confirm that the data are correct
          </Typography>
        </Grid>

        <Grid xs={12} container justifyContent="flex-end">
          <Grid item>
      
         
        </Box>
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid lg={4} sm={6} xs={12}>
            <CarbonPerMonth diff={12} trend="up" sx={{ height: '100%' }} value="548752" />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <CardBoard diff={1.4} trend="up" value={emissionFactor} color={'primaryLight'} title={'Total Emission'} />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <CardBoard diff={1.4} trend="up" value={sum} color={'gray'} title={'Total Scopes'} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container xs={8} spacing={3} mt={3}>
        <Grid lg={7} md={6} xs={12}>
          <CarbonEmissionsScope
            chartSeries={[
              { name: 'Scope 1', data: scope1Arr.slice(0, 12) },
              { name: 'Scope 2', data: scope2Arr.slice(0, 12) },
              { name: 'Scope 3', data: scope3Arr.slice(0, 12) },
            ]}
          />
        </Grid>
        <Grid lg={5} md={12} xs={12}>
          <Scopes scope1={scope1} scope2={scope2} scope3={scope3} />
        </Grid>
        <Grid lg={7} md={6} xs={12}>
          <MonthlyCarbonEmissions sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={5} md={12} xs={12}>
          <CarbonEmissionsCategory
            data={dataEmissionByCat}
            sx={{ height: '100%' }}
            showScopesTabs={false}
            value={selectedTab}
            handleChange={handleTabChange}
          />
        </Grid>
      </Grid>
      {/* </Box> */}
    </Grid>
  );
}
