'use client';

import  React,{useEffect,useState,useRef} from 'react';
import type { Metadata } from 'next';
import { Box, Typography,Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';  

import { useDispatch, useSelector } from 'react-redux';
import { CalanderIcon, ExportIcon, FilterIcon, ImportIcon } from '@/icons';
import { MuiButton } from '@/styles/theme/components/button';
import { config } from '@/config';
import CustomTabs from '@/components/commun/Tabs/tabs';
import { CarbonEmissionsCategory } from '@/components/dashboard/overview/CarbonEmissionsCategory';
import { CarbonEmissionsScope } from '@/components/dashboard/overview/CarbonEmissionsScopeReport';
import { CarbonPerMonth } from '@/components/dashboard/overview/CarbonPerMonth';
import { EmissionByType } from '@/components/dashboard/overview/EmissionByType';
import { EmissionLocation } from '@/components/dashboard/overview/EmissionLocation';
import { Footprints } from '@/components/dashboard/overview/Footprint';
//import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { MonthlyCarbonEmissions } from '@/components/dashboard/overview/MonthlyCarbonEmissions';
import { Reduction } from '@/components/dashboard/overview/Reduction';
import { FirstTarget } from '@/components/dashboard/overview/FirstTarget';
import { Tasks } from '@/components/dashboard/overview/Tasks';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { TotalCO2 } from '@/components/dashboard/overview/TotalCO2';
import { TotalEmissions } from '@/components/dashboard/overview/TotalEmissions';
import Scopes from "@/components/dashboard/overview/Scopes"
// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;
import { dataApis } from '@/lib/data/dataApis';
import {getEmissionPerFilterCard,calculateReduction,calculateFirstTarget, getCarbonPerFilterCard,getCarbonEmissionScopesChart,CalculateScopes, getCarbonEmission, getCarbonEmissionByCategory,getEmissionsByLocation, getCarbonEmissionFromTarget,getFootPrint } from '@/lib/helper';
import { setDataDB } from '@/lib/store/reducer/useFile';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import jsPDF from 'jspdf';
import FilterDateComponent from '@/components/commun/Date/CustomDate';
import carbonEmissionsData from '@/components/dashboard/data/ carbon-emissions-data';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { Target } from '@/types/target';
import { targetApis } from '@/lib/target/targetApis';
import CardCarousel from './CardCarousel';
export default function Page(): React.JSX.Element {
  const calendarRef = useRef<HTMLDivElement>(null);
 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSelectingStartYear, setIsSelectingStartYear] = useState(false);
  const [isSelectingEndYear, setIsSelectingEndYear] = useState(false);
 

  const [startFullDate, setStartFullDate] = useState<Date | null>(null);
  const [endFullDate, setEndFullDate] = useState<Date | null>(null);
  
  
  const {  dataDB } = useSelector((state: any) => state.file);
  const [formattedSelectedDate, setFormattedSelectedDate] = useState('');

  const [selectedTab, setSelectedTab] = React.useState<string>('12months');
  const [myScope, setMyScope] = React.useState<Scopes>({});
  const dispatch = useDispatch();
  const [dataEmissionByCat , setDataEmissionByCat] = React.useState([]);
  const [dataEmission , setDataEmission] = React.useState([]);
  const [dataEmissionTarget, setDataEmissionTarget] = React.useState([]);

  const [footPrint, setFootPrint] = React.useState([]);
  
  const [target, setTarget] = React.useState<Target>({});
  const [locationsData,setLocationData] = React.useState([]);
  const [CarbonPerMonthCard,setCarbonPerMonthCard]=React.useState(0);
  const [emissionPerMonthCard,setEmissionPerMonthCard]=React.useState(0);

  const [reduction,setReduction]=React.useState(0);
  const [firstTarget,setFirstTarget]=React.useState(0);

  const [carbonEmissionsScopesChart, setCarbonEmissionsScopesChart] = React.useState([]); 

  const [carbonScopesData1,setCarbonScopesData1]= React.useState([]); 
  const [carbonScopesData2,setCarbonScopesData2]= React.useState([]); 
  const [carbonScopesData3,setCarbonScopesData3]= React.useState([]); 
 
  const handleApply=(firstDate,endDate)=>{
    console.log("handleApply",firstDate,endDate)
    setIsCalendarOpen(!isCalendarOpen)
    setEndFullDate(endDate)
    setStartFullDate(firstDate)
    const formattedDate = `${(firstDate)} - ${(endDate)}`;
    setFormattedSelectedDate(formattedDate);
    setSelectedTab('')
  
  }
  const handleCancel=()=>{
    console.log("handleCancel")
    setIsCalendarOpen(!isCalendarOpen)
    setEndFullDate('')
    setStartFullDate('')
  }
  const handleClear=()=>{
    console.log("handleClear")
    setFormattedSelectedDate('select Date')
    setEndFullDate('')
    setStartFullDate('')
     
  }
  

  const getData = React.useCallback(async (): Promise<void> => {
    const { error, res } = await dataApis.getData();
    if (error) {
      return;
    }
 
    dispatch(setDataDB(res));
    if(startFullDate && endFullDate && selectedTab==''){ 
      console.log("if")
       setCarbonPerMonthCard(getCarbonPerFilterCard(res,"custom",startFullDate,endFullDate));
      setEmissionPerMonthCard(getEmissionPerFilterCard(res,"custom",startFullDate,endFullDate));
      setMyScope(CalculateScopes(res,"custom",startFullDate,endFullDate));
      setFootPrint(getFootPrint(res,"custom",startFullDate,endFullDate))
      setDataEmission(getCarbonEmission(res,"custom",startFullDate,endFullDate)) 
      setLocationData(getEmissionsByLocation(res,"custom",startFullDate,endFullDate)); 
      setDataEmissionByCat(getCarbonEmissionByCategory(res,"all","custom",startFullDate,endFullDate)) 
  //    setDataEmissionByCat(getCarbonEmissionByCategory(res,"all",,"custom",startFullDate,endFullDate))
   
  
  setCarbonEmissionsScopesChart(getCarbonEmissionScopesChart(res,"custom",startFullDate,endFullDate)) 
  console.log("reeeeeeeeee",calculateReduction(CarbonPerMonthCard,target))
  setReduction(calculateReduction(CarbonPerMonthCard,target));
  setFirstTarget(calculateFirstTarget(CarbonPerMonthCard,target[0]))
    }else if(selectedTab){ 
      console.log("elese")
      setStartFullDate('')
      setEndFullDate('')
     
      
       setCarbonPerMonthCard(getCarbonPerFilterCard(res,selectedTab))
      setEmissionPerMonthCard(getEmissionPerFilterCard(res,selectedTab))
      setMyScope(CalculateScopes(res,selectedTab));
      setFootPrint(getFootPrint(res,selectedTab));
      setDataEmission(getCarbonEmission(res,selectedTab)) 
      setLocationData(getEmissionsByLocation(res,selectedTab)); 
      setDataEmissionByCat(getCarbonEmissionByCategory(res,"all",selectedTab,startFullDate,endFullDate))  
         
      
      setCarbonEmissionsScopesChart(getCarbonEmissionScopesChart(res,selectedTab,startFullDate,endFullDate))  
      console.log("reeeeeeeeee",calculateReduction(CarbonPerMonthCard,target))

      setReduction(calculateReduction(CarbonPerMonthCard,target));

      setFirstTarget(calculateFirstTarget(CarbonPerMonthCard,target[0]))
    }
 
     
  }, [selectedTab,startFullDate,endFullDate]);

  const getTargets = React.useCallback(async (): Promise<void> => {
    const { error, res } = await targetApis.getTargets();
    if (error) {
      return;
    } 
    dispatch(setTargets(res));
    setTarget(res);  
    setDataEmissionTarget(getCarbonEmissionFromTarget(res))
  }, []);

  useEffect(() => {
    getTargets();
    getData();
  }, [getData   ]);
  // Function to handle tab changes
  const handleTabChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setSelectedTab(newValue);
  };
  console.log("carbonScopesData1",carbonScopesData1)
  return (
   
    <Box>
      <Typography
        sx={{
          fontSize: '32px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '125%',
        }}
        gutterBottom
      >
        Dashboard
      </Typography> 
      
      <Grid container justifyContent="space-between" spacing={2} sx={{ paddingTop: '1rem' }}>
        <Grid item xs={8}>
          <CustomTabs value={selectedTab} handleChange={handleTabChange} />
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <Grid item>
            <Button
              btnType="secondaryGray"
              sx={{
                ...MuiButton.styleOverrides.sizeSmall,
                borderRadius: '6px',
                border: '1px solid var(--Grey-grey-200, #B3B8C2)',
                background: 'var(--Colors-Base-00, #FFF)',
              }}
              startIcon={<CalanderIcon />}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              <Typography variant="h7" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
                Select Date
              </Typography>
            </Button>
            {isCalendarOpen &&
            <FilterDateComponent
       
       handleApply={handleApply}
       handleCancel={handleCancel}
       handleClear={handleClear}
     />}
          </Grid>
          
        </Grid>
      </Grid>
      <div>
        {/* Content for each tab based on the selectedTab value */}
        {/* {selectedTab === '7 Days' && <div>Content for 7 Days</div>}
        {selectedTab === '30 Days' && <div>Content for 30 Days</div>}
        {selectedTab === 'Quarter' && <div>Content for Quarter</div>}
        {selectedTab === '12 Months' && <div>Content for 12 Months</div>} */}
      </div>
      <Grid container spacing={3} mt={3}>
       {/*  <CardCarousel CarbonPerMonthCard={CarbonPerMonthCard} emissionPerMonthCard={emissionPerMonthCard}
        firstTarget={firstTarget} reduction={reduction}
        /> */}
        <Grid lg={3} sm={6} xs={12}>
          <CarbonPerMonth diff={12} trend="up" sx={{ height: '100%' }} value={CarbonPerMonthCard} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalEmissions diff={0.9} trend="down" sx={{ height: '100%' }} value={emissionPerMonthCard} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <Reduction diff={1.4} trend="up" sx={{ height: '100%' }} value={reduction} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <Reduction diff={1.4} trend="up" sx={{ height: '100%' }} value={firstTarget} />
        </Grid>  
       
        <Grid lg={8} xs={12}>
         {/*  <CarbonEmissionsScope
               chartSeries={[
              { name: 'Scope 1', data:carbonEmissionsScopesChart['scope1Arr'] },
              { name: 'Scope 2', data:  carbonEmissionsScopesChart['scope2Arr'] },
              { name: 'Scope 3', data:  carbonEmissionsScopesChart['scope3Arr'] },
            ]}   
            sx={{ height: '100%' }} 
            taille={carbonEmissionsScopesChart['scope1Length']}
          /> */}

          <CarbonEmissionsScope
          sx={{ height: '100%' }} 
          displayPer={"month"}
          typeReporting="custom"
          startDate={startFullDate}
          endDate={endFullDate}
          data={dataDB}
        />
        </Grid>
        <Grid lg={4} md={6} xs={12}>
          <Tasks sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
       <MonthlyCarbonEmissions 
          dataEmission={dataEmission} 
          dataEmissionTarget={dataEmissionTarget}
          sx={{ height: '100%' }} 
          /> 
        </Grid>
        <Grid lg={4} md={12} xs={12}>
         
<Scopes   scope1={myScope.scope1} scope2={myScope.scope2} scope3={myScope.scope3} />
        </Grid>
        <Grid lg={8} md={12} xs={12}>
          <EmissionLocation data={locationsData} sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={4} md={12} xs={12}>
          <EmissionByType sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={7.5} md={6} xs={12}>
          <Footprints 
          data={footPrint}
          sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={4.5} md={6} xs={12}>
          <TotalCO2 sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={12} md={12} xs={12}> 
          <CarbonEmissionsCategory
            data={dataEmissionByCat}
            sx={{ height: '100%' }}
            showScopesTabs={false}
             
          />

        </Grid>
      </Grid>
    </Box>
  );
}
