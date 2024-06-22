import React,{useState,useRef,useEffect} from 'react';
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

import { outlinedInput, filterCalander } from '@/styles/theme/Filter';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
export default function ExportStepFour() {
  const [selectedTab, setSelectedTab] = React.useState<string>('7 Days');
  const { dataDB , data } = useSelector((state: any) => state.file);
  console.log("data from export step four==>",data)
  const { scope1, scope2, scope3, sum } = CalculateScopes(data);
  const { scope1Arr, scope2Arr, scope3Arr } = extractScops(data);
  const emissionFactor = CalculateEmission(data);
  const dataEmissionByCat = getCarbonEmissionByCategory(data)
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


  const [scope01,setScope01]=useState(scope1);


  const handleStartYearChange = (date) => { 
    setStartFullDate(dayjs(date).format('YYYY-MM-DD')); 
     
   
  };
  const filteredData = React.useMemo(() => {
    if (!startFullDate && !endFullDate) {
      return data; // No filter applied, return all data
    }

   const filtersData= data.filter((row) => {
      const rowDate = new Date(row.date); // Assuming 'date' property in each row object is a string in YYYY-MM-DD format

      if (isNaN(rowDate.getTime())) {
        console.warn("Invalid date format in row:", row);
        return false; // Or handle invalid dates differently (e.g., skip the row)
      }

      return (
        (!startFullDate || rowDate >= startFullDate) &&
        (!endFullDate || rowDate <= endFullDate)
      );
    });
    console.log("ffffffffffff",filtersData)
  }, [data, startFullDate, endFullDate]);

  useEffect(() => {
    // Recalculate values based on filtered data
    /* const { scope1, scope2, scope3, sum } = CalculateScopes(filteredData);
    const { scope1Arr, scope2Arr, scope3Arr } = extractScops(filteredData);
    const emissionFactor = CalculateEmission(filteredData);
    const dataEmissionByCat = getCarbonEmissionByCategory(filteredData); */

    // Update state or perform further calculations using recalculated values
    
    setScope01(scope1); 
  /*   setScope2(scope2);
    setScope3(scope3);
    setSum(sum);
    setScope1Arr(scope1Arr);
    setScope2Arr(scope2Arr);
    setScope3Arr(scope3Arr);
    setDataEmissionByCat(dataEmissionByCat);
    setEmissionFactor(emissionFactor); */
  }, [/* filteredData */]);



  const handleEndYearChange = (date) => {
      setEndFullDate(dayjs(date).format('YYYY-MM-DD')); 
  };
  const handleTabChange = () => {};
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
        setIsSelectingStartYear(false);
        setIsSelectingEndYear(false);

        const dateRange = [startYear, endYear].filter(Boolean);
       
        if ( startFullDate && endFullDate){
          const dateRange = [startFullDate, endFullDate];
          //onFilterByDate(dateRange);
          const formattedDate = `${(startFullDate)} - ${(endFullDate)}`;
          setFormattedSelectedDate(formattedDate);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startYear, endYear, /* onFilterByDate */startFullDate,endFullDate]);

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

        <Grid xs={12} container justifyContent="flex-end" ref={calendarRef}>
           
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
          )}
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
