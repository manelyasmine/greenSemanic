import React,{useState,useEffect,useRef} from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { clearFile, setFile } from '@/lib/store/reducer/useFile';
import { Button } from '@/components/commun/Button';
import { MuiButton } from '@/styles/theme/components/button';
import { CarbonEmissionsCategory } from '../overview/CarbonEmissionsCategory';
import { MonthlyCarbonEmissions } from '../overview/MonthlyCarbonEmissions';
import { CarbonEmissionsScope } from '../overview/CarbonEmissionsScopeReport';
 
import { TotalScopes } from '../overview/TotalScopes';
import { TotalEmissions } from '../overview/TotalEmissions';
import { CarbonPerMonth } from '../overview/CarbonPerMonth';
import Scopes from '../overview/Scopes';
import { ShareIcon } from '@/icons';
import { CalanderIcon } from '@/icons';

import { filterCalander } from '@/styles/theme/Filter';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import FilterDateComponent from '@/components/commun/Date/CustomDate';
import {getCarbonEmissionScopesChartCustomized,getEmissionPerFilterCard,calculateAllScopes, getCarbonPerFilterCard,getCarbonEmissionScopesChart,CalculateScopes, getCarbonEmission, getCarbonEmissionByCategory,getEmissionsByLocation, getCarbonEmissionFromTarget,getFootPrint } from '@/lib/helper';
import { setOpenToast } from '@/lib/store/reducer/useGlobalActions';

type ExportStep1Props = {
  handleSaveFile: () => void;
};
export default function ExportStep1({onExport  }) {
  console.log("handle export step2")
  const dispatch = useDispatch(); 

  const {  dataDB } = useSelector((state: any) => state.file);

  const { report} = useSelector((state: any) => state.report);

  const [CarbonPerMonthCard,setCarbonPerMonthCard]=React.useState(0);

  const [emissionPerMonthCard,setEmissionPerMonthCard]=React.useState(0);

  const [dataEmissionByCat , setDataEmissionByCat] = React.useState([]);

  const [carbonEmissionsScopesChart, setCarbonEmissionsScopesChart] = React.useState([]); 
  console.log("report step 2===>",report)
  const [updatedTarget, setupdatedTarget] = useState<Target>();
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    dispatch(setFile(selectedFile));
  };
  const [isActiveShare,setIsActiveShare]=useState(false); 
 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [myScope, setMyScope] = React.useState<Scopes>({});
  const [dataEmission , setDataEmission] = React.useState([]);
  const [dataEmissionTarget, setDataEmissionTarget] = React.useState([]);
  const [totalScopes,setTotalScopes]=React.useState(0)
  const calendarRef = useRef<HTMLDivElement>(null);
   const [error, setError] = useState(false);

   useEffect(() => { 
    

      setCarbonPerMonthCard(getCarbonPerFilterCard(dataDB,"custom",report.startDate,report.endDate));
     
      setEmissionPerMonthCard(getEmissionPerFilterCard(dataDB,"custom",report.startDate,report.endDate));
      setMyScope(CalculateScopes(dataDB,"custom",report.startDate,report.endDate));
      
      const allScopes=  calculateAllScopes(CalculateScopes(dataDB,"custom",report.startDate,report.endDate));

      setTotalScopes(allScopes);
      setDataEmission(getCarbonEmission(dataDB,"custom",report.startDate,report.endDate)) 
      setDataEmissionByCat(getCarbonEmissionByCategory(dataDB,"all","custom",report.startDate,report.endDate))  
  
  setCarbonEmissionsScopesChart(getCarbonEmissionScopesChartCustomized(dataDB,report.displayPer,
    report.typeReporting,report.startDate,report.endDate)) 
  }, [ ]);










 
   const handleShare=()=>{
     setIsActiveShare(!isActiveShare);
   }
   
   const handleApply=()=>{

   }
   const handleCancel=()=>{

   }
   const handleClear=()=>{

   }


   

  

   const handleChange = (name: string, event: any) => {
     const regex = /^\d{4}-\d{4}$/;
     if (name == 'baseToTargetYear') {
       console.log('see year to ' + event);
       if (!regex.test(event)) {
         setError(true);
         setupdatedTarget({ ...updatedTarget, [name]: event });
       } else {
         const newString = event?.split('-');
         console.log('Update new string '+ newString[0])
         setupdatedTarget({ ...updatedTarget, baseYear: newString[0], targetYear: newString[1] , [name]: event });
         setError(false);
       }
     }else{
       setupdatedTarget({ ...updatedTarget, [name]: event });
     }
   };
  return (
   
    <Grid
      container
      xs={12}
      sx={{
        display: 'flex',
        flex: '1 0 0',
        padding: '24px 0px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      id="export-content"
    >
  <Grid container xs={12} sx={{padding:"24px 32px",justifyContent:"center",alignItems:"center"}}>
        <Grid item xs={10}>
        <Typography variant="h3" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
        Preview
        </Typography>
        <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)" >
        you can see a preview of uploaded file to confirm that the data are correct
        </Typography> 
      </Grid>
     
      <Grid item xs={2} container justifyContent="flex-end" sx={{gap:"4px" }}>
       
        <Grid item>
          <Button
            btnType="Primary"
            sx={{ 
              borderRadius: "6px",
              background: "var(--Green-green-500, #16B364)",
              marginTop:"8px"
            }}  
            startIcon={<ShareIcon/>}
            onClick={handleShare}
          >
            <Typography variant="h7" sx={{ color: "var(--Colors-Base-00, #FFF)" }}>
            Share Report
            </Typography>
          </Button>
        </Grid>
        <Grid xs={12} container justifyContent="flex-end" ref={calendarRef}>
           
           <Button
               btnType="secondaryGray"
               sx={{ ...MuiButton.styleOverrides.sizeSmall }}
               startIcon={<CalanderIcon />}
               id="filter-date"
               //selected={startYear || endYear}
               onClick={() => setIsCalendarOpen(!isCalendarOpen)}
             >
               {report.startDate+'-'+report.endDate || 'Select Date'}
             </Button>
             {isCalendarOpen && (
             <Box sx={filterCalander}>
               
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <FilterDateComponent
       
                  handleApply={handleApply}
                  handleCancel={handleCancel}
                  handleClear={handleClear}
                />
              
              </LocalizationProvider>
               </Box>)}
               </Grid>
               </Grid>
             
     
 

    <Grid container spacing={3} mt={3}  sx={{gap:"20px",paddingBottom:"32px"}} id="export-content" >
        <Grid lg={3.5} sm={6} xs={12}  sx={{paddingLeft:"32px"}}> 

          <CarbonPerMonth diff={12} trend="up" sx={{ height: '100%' }} value={CarbonPerMonthCard} />
        </Grid>
        <Grid lg={3.5} sm={6} xs={12}>
          
        <TotalEmissions diff={0.9} trend="down" sx={{ height: '100%' }} value={emissionPerMonthCard} />
        </Grid>
        <Grid lg={3.5} sm={6} xs={12}>
          <TotalScopes diff={1.4} trend="up" sx={{ height: '100%'  }} value={totalScopes} />
        </Grid>  
       </Grid> 
     
    <Grid container spacing={3} mt={3}  sx={{gap:"20px ",paddingBottom:"32px"}} >
        <Grid lg={7} xs={12}   sx={{paddingLeft:"32px"}}>
        <CarbonEmissionsScope
          sx={{ height: '100%' }} 
          displayPer={report.displayPer}
          typeReporting={report.typeReporting}
          startDate={report.startDate}
          endDate={report.endDate}
          data={dataDB}
        />
        </Grid>
        <Grid lg={4} xs={12}>
      
     
<Scopes   scope1={myScope.scope1} scope2={myScope.scope2} scope3={myScope.scope3} />
    </Grid>
    </Grid>

    <Grid container spacing={3} mt={3}  sx={{gap:"20px ",paddingBottom:"32px"}} >

        <Grid lg={6} sm={6} xs={12}  sx={{paddingLeft:"32px"}}>
        <MonthlyCarbonEmissions 
          dataEmission={dataEmission} 
          dataEmissionTarget={dataEmissionTarget}
          sx={{ height: '100%' }} 
          /> 
        </Grid>
        <Grid lg={5} md={6} xs={12}>
        <CarbonEmissionsCategory id="carbonEmissionsCategory"
            data={dataEmissionByCat}
            sx={{ height: '100%' }}
            showScopesTabs={false}
             
          />
        </Grid>
        </Grid>
        </Grid>
     
    {/*     <Button variant="contained" color="primary" onClick={handleExportToPDF}>
     Export to PDF
   </Button> */}
    </Grid>
   
   
  );
}
